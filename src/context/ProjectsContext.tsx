import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { projects as initialProjects, slugifyProject, type Project } from '../data'
import {
  createProjectRecord,
  deleteProjectRecord,
  fetchProjects,
  isSupabaseConfigured,
  updateProjectRecord,
} from '../lib/projectData'

const LOCAL_STORAGE_KEY = 'portfolio-projects'

const tagStyles: Record<Project['tag'], string> = {
  UI: 'from-zinc-700 to-zinc-900',
  UX: 'from-zinc-600 to-zinc-900',
  'UI/UX': 'from-slate-700 to-slate-900',
  Branding: 'from-amber-900 to-zinc-900',
  'Graphic Design': 'from-zinc-600 to-zinc-900',
  Logo: 'from-violet-900 to-zinc-900',
  'Web Dev': 'from-zinc-800 to-zinc-950',
}

type OperationResult = {
  success: boolean
  error?: string
}

type ProjectsContextValue = {
  projects: Project[]
  addProject: (project: Omit<Project, 'id' | 'bg'> & { images?: string[]; tags?: string[] }) => Promise<OperationResult>
  updateProject: (id: string, project: Partial<Omit<Project, 'id' | 'bg'>>) => Promise<OperationResult>
  deleteProject: (id: string) => Promise<OperationResult>
  reorderProject: (id: string, direction: 'up' | 'down') => Promise<OperationResult>
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined)

function normalizeLocalProject(project: Omit<Project, 'id' | 'bg'> & { id?: string }) {
  const id = project.id ?? slugifyProject(project.title)
  const bg = tagStyles[project.tag] || 'from-slate-800 to-slate-950'

  return {
    ...project,
    id,
    bg,
    images: project.images?.filter(Boolean),
    tags: project.tags?.filter(Boolean),
    order_index: project.order_index ?? 0,
  }
}

function loadLocalProjects(): Project[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed.map((item) => normalizeLocalProject(item as Omit<Project, 'id' | 'bg'> & { id?: string }))
  } catch {
    return null
  }
}

function saveLocalProjects(projects: Project[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects))
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  useEffect(() => {
    async function loadProjects() {
      if (isSupabaseConfigured) {
        const remoteProjects = await fetchProjects()
        setProjects(remoteProjects)
      } else {
        const stored = loadLocalProjects()
        if (stored?.length) {
          setProjects(stored)
        }
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      saveLocalProjects(projects)
    }
  }, [projects])

  const addProject = async (project: Omit<Project, 'id' | 'bg'> & { images?: string[]; tags?: string[] }) => {
    if (isSupabaseConfigured) {
      const result = await createProjectRecord(project)
      if (result.project) {
        const created = result.project
        setProjects((current) => [created, ...current.filter((item) => item.id !== created.id)])
        return { success: true }
      }

      setProjects((current) => {
        const next = normalizeLocalProject(project)
        const existing = current.find((item) => item.id === next.id)
        if (existing) next.id = `${next.id}-${Date.now()}`
        return [next, ...current]
      })
      return { success: false, error: result.error ?? 'Supabase create failed, saved locally instead.' }
    }

    setProjects((current) => {
      const next = normalizeLocalProject(project)
      const existing = current.find((item) => item.id === next.id)
      if (existing) next.id = `${next.id}-${Date.now()}`
      return [next, ...current]
    })
    return { success: true }
  }

  const updateProject = async (id: string, project: Partial<Omit<Project, 'id' | 'bg'>>) => {
    if (isSupabaseConfigured) {
      const result = await updateProjectRecord(id, project)
      if (result.project) {
        setProjects((current) => current.map((item) => (item.id === id ? result.project! : item)))
        return { success: true }
      }

      setProjects((current) =>
        current.map((item) => {
          if (item.id !== id) return item
          return normalizeLocalProject({ ...item, ...project, id })
        }),
      )
      return { success: false, error: result.error ?? 'Supabase update failed, changes saved locally instead.' }
    }

    setProjects((current) =>
      current.map((item) => {
        if (item.id !== id) return item
        return normalizeLocalProject({ ...item, ...project, id })
      }),
    )
    return { success: true }
  }

  const deleteProject = async (id: string) => {
    if (isSupabaseConfigured) {
      const result = await deleteProjectRecord(id)
      setProjects((current) => current.filter((item) => item.id !== id))
      if (result.success) return { success: true }
      return { success: false, error: result.error ?? 'Supabase delete failed, item removed locally instead.' }
    }

    setProjects((current) => current.filter((item) => item.id !== id))
    return { success: true }
  }

  const reorderProject = async (id: string, direction: 'up' | 'down') => {
    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) return { success: false, error: 'Project not found' }
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= projects.length) return { success: false, error: 'Out of bounds' }

    const a = projects[index]
    const b = projects[targetIndex]
    const aOrder = a.order_index ?? index
    const bOrder = b.order_index ?? targetIndex

    // optimistic swap
    setProjects((current) => {
      const copy = [...current]
      copy[index] = { ...b }
      copy[targetIndex] = { ...a }
      return copy
    })

    // persist
    const r1 = await updateProject(a.id, { order_index: bOrder })
    const r2 = await updateProject(b.id, { order_index: aOrder })

    if (r1.success && r2.success) return { success: true }

    // revert on failure
    setProjects((current) => {
      const copy = [...current]
      copy[index] = { ...a }
      copy[targetIndex] = { ...b }
      return copy
    })

    return { success: false, error: r1.error ?? r2.error ?? 'Failed to persist order' }
  }

  const value = useMemo(
    () => ({ projects, addProject, updateProject, deleteProject, reorderProject }),
    [projects],
  )

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

export function useProjects() {
  const ctx = useContext(ProjectsContext)
  if (!ctx) {
    throw new Error('useProjects must be used within ProjectsProvider')
  }
  return ctx
}
