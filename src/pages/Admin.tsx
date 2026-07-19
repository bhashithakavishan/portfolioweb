import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../context/ProjectsContext'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/projectData'
import { type Project, type Testimonial, getTestimonials, saveTestimonials } from '../data'
import PageHeader from '../components/PageHeader'
import { createTestimonialRecord, deleteTestimonialRecord, fetchTestimonials, saveTestimonialsLocally, updateTestimonialRecord } from '../lib/testimonials'

const categories = ['UI/UX', 'Branding', 'Graphic Design', 'Logo', 'Web Dev'] as const

type Category = (typeof categories)[number]

const normalizeAdminTag = (tag: Project['tag']): Category => (tag === 'UI' || tag === 'UX' ? 'UI/UX' : tag)

export default function Admin() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { projects, addProject, updateProject, deleteProject, reorderProject } = useProjects()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info')
  const [statusText, setStatusText] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    tag: 'UI/UX' as Category,
    image: '',
    images: '',
    tags: '',
    highlight: false,
    order_index: projects.length,
  })

  const [testimonialItems, setTestimonialItems] = useState<Testimonial[]>(() => getTestimonials())
  const [testimonialEditingIndex, setTestimonialEditingIndex] = useState<number | null>(null)
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    avatar: '',
    text: '',
    stars: 5,
  })

  type FormValue = string | boolean | number

  const handleChange = (field: keyof typeof form, value: string | FormValue) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setEditingId(null)
    setForm({ title: '', description: '', tag: 'UI/UX', image: '', images: '', tags: '', highlight: false, order_index: projects.length })
  }

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials'>('projects')

  const handleTestimonialChange = (field: keyof typeof testimonialForm, value: string | number) => {
    setTestimonialForm((prev) => ({ ...prev, [field]: value }))
  }

  const resetTestimonialForm = () => {
    setTestimonialEditingIndex(null)
    setTestimonialForm({ name: '', role: '', avatar: '', text: '', stars: 5 })
  }

  const handleTestimonialSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!testimonialForm.name.trim() || !testimonialForm.text.trim()) {
      setMessage('Please provide a name and testimonial text.')
      setMessageType('error')
      return
    }

    const payload: Testimonial = {
      name: testimonialForm.name.trim(),
      role: testimonialForm.role.trim(),
      avatar: testimonialForm.avatar.trim(),
      text: testimonialForm.text.trim(),
      stars: Number(testimonialForm.stars) || 5,
    }

    if (isSupabaseConfigured) {
      setLoading(true)
      const existingId = testimonialEditingIndex !== null ? testimonialItems[testimonialEditingIndex]?.id : undefined
      if (testimonialEditingIndex !== null && existingId !== undefined) {
        const result = await updateTestimonialRecord(existingId, payload)
        if (result.testimonial) {
          const refreshed = await fetchTestimonials()
          setTestimonialItems(refreshed)
          setMessage('Testimonial updated successfully.')
          setMessageType('success')
        } else {
          setMessage(result.error ?? 'Failed to update testimonial.')
          setMessageType('error')
        }
      } else {
        const result = await createTestimonialRecord(payload)
        if (result.testimonial) {
          const refreshed = await fetchTestimonials()
          setTestimonialItems(refreshed)
          setMessage('Testimonial added successfully.')
          setMessageType('success')
        } else {
          setMessage(result.error ?? 'Failed to add testimonial.')
          setMessageType('error')
        }
      }
      setLoading(false)
      resetTestimonialForm()
      return
    }

    const nextTestimonials = [...testimonialItems]
    if (testimonialEditingIndex !== null) {
      nextTestimonials[testimonialEditingIndex] = payload
    } else {
      nextTestimonials.unshift(payload)
    }

    saveTestimonials(nextTestimonials)
    saveTestimonialsLocally(nextTestimonials)
    setTestimonialItems(nextTestimonials)
    setMessage(testimonialEditingIndex === null ? 'Testimonial added successfully.' : 'Testimonial updated successfully.')
    setMessageType('success')
    resetTestimonialForm()
  }

  const startTestimonialEdit = (index: number) => {
    const item = testimonialItems[index]
    if (!item) return

    setTestimonialEditingIndex(index)
    setTestimonialForm({
      name: item.name,
      role: item.role,
      avatar: item.avatar,
      text: item.text,
      stars: item.stars,
    })
    setMessage('Editing testimonial')
    setMessageType('info')
  }

  const deleteTestimonial = async (index: number) => {
    const item = testimonialItems[index]
    if (!item) return

    if (isSupabaseConfigured) {
      setLoading(true)
      const itemId = item.id
      const result = itemId !== undefined ? await deleteTestimonialRecord(itemId) : { success: false, error: 'No testimonial id available.' }
      setLoading(false)
      if (result.success) {
        const refreshed = await fetchTestimonials()
        setTestimonialItems(refreshed)
        if (testimonialEditingIndex === index) resetTestimonialForm()
        setMessage('Testimonial removed.')
        setMessageType('success')
      } else {
        setMessage(result.error ?? 'Failed to remove testimonial.')
        setMessageType('error')
      }
      return
    }

    const nextTestimonials = testimonialItems.filter((_, itemIndex) => itemIndex !== index)
    saveTestimonials(nextTestimonials)
    saveTestimonialsLocally(nextTestimonials)
    setTestimonialItems(nextTestimonials)
    if (testimonialEditingIndex === index) resetTestimonialForm()
    setMessage('Testimonial removed.')
    setMessageType('success')
  }

  useEffect(() => {
    setStatusText(
      isSupabaseConfigured
        ? 'Supabase is configured: projects and testimonials are stored in your database.'
        : 'Supabase is not configured: changes are stored locally in browser storage.'
    )
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadTestimonials = async () => {
      const remoteTestimonials = await fetchTestimonials()
      if (isMounted) {
        setTestimonialItems(remoteTestimonials)
      }
    }

    loadTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage('')
    setMessageType('info')
    setLoading(true)

    const payload = {
      title: form.title,
      description: form.description,
      tag: form.tag,
      image: form.image,
      images: form.images.split(',').map((url) => url.trim()).filter(Boolean),
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      highlight: form.highlight,
      order_index: form.order_index,
    }

    const result = editingId
      ? await updateProject(editingId, payload)
      : await addProject(payload)

    if (result.success) {
      setMessage(editingId ? 'Project updated successfully.' : 'Project added successfully.')
      setMessageType('success')
    } else {
      setMessage(result.error ?? 'An error occurred while saving the project.')
      setMessageType('error')
    }

    resetForm()
    setLoading(false)
  }

  const startEdit = (id: string) => {
    const project = projects.find((item) => item.id === id)
    if (!project) return

    setEditingId(id)
    setForm({
      title: project.title,
      description: project.description,
      tag: normalizeAdminTag(project.tag),
      image: project.image,
      images: project.images?.join(', ') ?? '',
      tags: project.tags?.join(', ') ?? '',
      highlight: Boolean(project.highlight),
      order_index: project.order_index ?? projects.length,
    })
    setMessage('Editing project details')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return
    const result = await deleteProject(id)
    if (editingId === id) resetForm()
    if (result.success) {
      setMessage('Project deleted successfully.')
      setMessageType('success')
    } else {
      setMessage(result.error ?? 'An error occurred while deleting the project.')
      setMessageType('error')
    }
  }

  const moveProject = async (id: string, direction: 'up' | 'down') => {
    setLoading(true)
    const result = await reorderProject(id, direction)
    setLoading(false)
    if (result.success) {
      setMessage('Order updated')
      setMessageType('success')
    } else {
      setMessage(result.error ?? 'Failed to update order')
      setMessageType('error')
    }
  }

  const imageGrid = useMemo(
    () =>
      projects.map((project) => (
        <div key={project.id} className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/70 p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{project.tag}</p>
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">{project.description}</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Main image: {project.image}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => startEdit(project.id)}
              className="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-sm text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(project.id)}
              className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-sm text-rose-700 hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => moveProject(project.id, 'up')}
              disabled={projects.findIndex((p) => p.id === project.id) === 0}
              className="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-sm text-slate-900 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => moveProject(project.id, 'down')}
              disabled={projects.findIndex((p) => p.id === project.id) === projects.length - 1}
              className="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-sm text-slate-900 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
            >
              ↓
            </button>
          </div>
        </div>
      )),
    [projects]
  )

  return (
    <main>
      <PageHeader title="Admin" subtitle="Add, edit, and delete local portfolio projects" />

      <section className="container-x py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <PageHeader title="Admin" subtitle="Add, edit, and delete local portfolio projects" />
          </div>
          <button
            type="button"
            onClick={async () => {
              await signOut()
              navigate('/login')
            }}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
          >
            Sign out
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Add new project</h2>
            <div className="mb-6 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300">
              {statusText}
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Project Name
                <input
                  value={form.title}
                  onChange={(event) => handleChange('title', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Short description
                <textarea
                  value={form.description}
                  onChange={(event) => handleChange('description', event.target.value)}
                  rows={4}
                  placeholder="A one-line summary for the project"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <div className="grid gap-5 lg:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                  <select
                    value={form.tag}
                    onChange={(event) => handleChange('tag', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Highlight
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.highlight}
                      onChange={(event) => handleChange('highlight', event.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-brand accent-brand"
                    />
                    <span className="text-sm text-slate-500 dark:text-slate-400">Mark as featured</span>
                  </div>
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Main image URL
                <input
                  value={form.image}
                  onChange={(event) => handleChange('image', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Tags (comma separated)
                <input
                  value={form.tags}
                  onChange={(event) => handleChange('tags', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <button type="button" onClick={() => setShowAdvanced((s) => !s)} className="text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300">
                {showAdvanced ? 'Hide advanced options' : 'Show advanced options'}
              </button>

              {showAdvanced && (
                <div className="space-y-4 rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Optional image URLs (comma separated)
                    <input
                      value={form.images}
                      onChange={(event) => handleChange('images', event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Position (order index)
                      <input
                      type="number"
                      value={form.order_index}
                      onChange={(event) => handleChange('order_index', Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Saving...' : editingId ? 'Update project' : 'Add project'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    Cancel edit
                  </button>
                )}
              </div>
            </form>

            {message && (
              <p className={`mt-4 text-sm ${messageType === 'success' ? 'text-emerald-600 dark:text-emerald-400' : messageType === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'}`}>
                {message}
              </p>
            )}
          </div>
          <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeTab === 'projects' ? 'Recent projects' : 'Manage testimonials'}</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className={`rounded-full px-3 py-2 text-sm font-semibold ${activeTab === 'projects' ? 'bg-brand text-white' : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white'}`}
                >
                  Projects
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('testimonials')}
                  className={`rounded-full px-3 py-2 text-sm font-semibold ${activeTab === 'testimonials' ? 'bg-brand text-white' : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white'}`}
                >
                  Testimonials
                </button>
              </div>
            </div>

            {activeTab === 'projects' ? (
              loading ? (
                <p className="text-slate-500 dark:text-slate-400">Loading...</p>
              ) : (
                <div className="grid gap-4">{projects.length > 0 ? imageGrid : <p className="text-slate-500 dark:text-slate-400">No projects yet.</p>}</div>
              )
            ) : (
              <div>
                <form className="space-y-4" onSubmit={handleTestimonialSubmit}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Client name
                    <input
                      value={testimonialForm.name}
                      onChange={(event) => handleTestimonialChange('name', event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Role / company
                    <input
                      value={testimonialForm.role}
                      onChange={(event) => handleTestimonialChange('role', event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Avatar image URL
                    <input
                      value={testimonialForm.avatar}
                      onChange={(event) => handleTestimonialChange('avatar', event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Testimonial
                    <textarea
                      value={testimonialForm.text}
                      onChange={(event) => handleTestimonialChange('text', event.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Stars
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={testimonialForm.stars}
                      onChange={(event) => handleTestimonialChange('stars', Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      {testimonialEditingIndex === null ? 'Add testimonial' : 'Update testimonial'}
                    </button>
                    {testimonialEditingIndex !== null && (
                      <button
                        type="button"
                        onClick={resetTestimonialForm}
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                </form>

                <div className="mt-8 grid gap-3">
                  {testimonialItems.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startTestimonialEdit(index)}
                            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTestimonial(index)}
                            className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-sm text-rose-700 hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
