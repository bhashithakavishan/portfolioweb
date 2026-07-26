import { supabase } from './supabase'
import { projects as fallbackProjects, Project as StaticProject, slugifyProject } from '../data'

const tagStyles: Record<StaticProject['tag'], string> = {
  UI: 'from-zinc-700 to-zinc-900',
  UX: 'from-zinc-600 to-zinc-900',
  'UI/UX': 'from-slate-700 to-slate-900',
  Branding: 'from-amber-900 to-zinc-900',
  'Graphic Design': 'from-zinc-600 to-zinc-900',
  Logo: 'from-violet-900 to-zinc-900',
  'Web Dev': 'from-zinc-800 to-zinc-950',
}

export type Project = StaticProject

type SupabaseProjectRecord = {
  id: string | number
  title: string
  description: string
  tag: Project['tag']
  image: string
  images?: string | string[] | null
  tags?: string | string[] | null
  highlight?: boolean | null
  bg?: string | null
  order_index?: number | null
  created_at?: string | null
}

export const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

function toArray(value: string[] | string | null | undefined) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string') {
    // try JSON parse first (stored as json string), otherwise treat as comma-separated
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) return parsed.filter(Boolean)
    } catch {}
    return value.split(',').map((s) => s.trim()).filter(Boolean)
  }
  return []
}

function normalizeProject(record: Partial<SupabaseProjectRecord>): Project {
  const tag = (record.tag ?? 'UI') as Project['tag']
  const images = toArray(record.images)
  const tags = toArray(record.tags)
  const bg = record.bg || tagStyles[tag] || 'from-slate-800 to-slate-950'

  return {
    id: record.id ? String(record.id) : slugifyProject(String(record.title ?? 'project')),
    title: record.title || 'Untitled Project',
    tag,
    bg,
    description: record.description || '',
    image: record.image || '/images/img.webp',
    images: images.length > 0 ? images : undefined,
    tags,
    highlight: Boolean(record.highlight),
    order_index: record.order_index ?? undefined,
  }
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) {
    return fallbackProjects
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  if (error || !data) {
    console.warn('Supabase fetch error:', error)
    return fallbackProjects
  }

  const normalized = data.map(normalizeProject)
  return normalized.sort((a, b) => (a.order_index ?? Number.MAX_SAFE_INTEGER) - (b.order_index ?? Number.MAX_SAFE_INTEGER))
}

export async function fetchHomeProjects(limit = 4): Promise<Project[]> {
  const all = await fetchProjects()
  return all.slice(0, limit)
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    return fallbackProjects.find((project) => project.id === id) ?? null
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    console.warn('Supabase project fetch error:', error)
    return fallbackProjects.find((project) => project.id === id) ?? null
  }

  return normalizeProject(data)
}

export async function createProjectRecord(project: Omit<Project, 'id' | 'bg'> & { images?: string[]; tags?: string[] }): Promise<{ project: Project | null; error?: string }> {
  if (!isSupabaseConfigured) {
    return { project: null, error: 'Supabase is not configured' }
  }

  const record = {
    ...project,
    // if DB column is plain text, send comma-separated string; normalize will parse on fetch
    images: project.images && project.images.length ? project.images.join(',') : null,
    tags: project.tags && project.tags.length ? project.tags.join(',') : null,
    order_index: project.order_index ?? 0,
  }

  const { data, error } = await supabase.from('projects').insert(record).select().single()
  if (error || !data) {
    console.error('Supabase create error:', error)
    return { project: null, error: error?.message ?? 'Unknown Supabase create error' }
  }

  return { project: normalizeProject(data) }
}

export async function updateProjectRecord(id: string, project: Partial<Omit<Project, 'id' | 'bg'>>): Promise<{ project: Project | null; error?: string }> {
  if (!isSupabaseConfigured) {
    return { project: null, error: 'Supabase is not configured' }
  }

  const updateData = {
    ...project,
    images: project.images && project.images.length ? project.images.join(',') : null,
    tags: project.tags && project.tags.length ? project.tags.join(',') : null,
    order_index: project.order_index ?? undefined,
  }

  const { data, error } = await supabase.from('projects').update(updateData).eq('id', id).select().single()
  if (error || !data) {
    console.error('Supabase update error:', error)
    return { project: null, error: error?.message ?? 'Unknown Supabase update error' }
  }

  return { project: normalizeProject(data) }
}

export async function deleteProjectRecord(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase is not configured' }
  }

  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) {
    console.error('Supabase delete error:', error)
    return { success: false, error: error?.message ?? 'Unknown Supabase delete error' }
  }

  return { success: true }
}
