import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import { useProjects } from '../context/ProjectsContext'

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { projects } = useProjects()
  const project = useMemo(() => projects.find((item) => item.id === id), [id, projects])

  if (!project) {
    return (
      <main>
        <PageHeader title="Project not found" subtitle="Sorry, this project does not exist." />
        <section className="container-x py-20 text-center">
          <button
            onClick={() => navigate('/works')}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <FiArrowLeft /> Back to works
          </button>
        </section>
      </main>
    )
  }

  return (
    <main>
      <PageHeader title={project.title} subtitle={project.tag} />

      <section className="container-x py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-xl">
            <img src={project.image} alt={project.title} className="w-full object-cover md:h-[520px]" />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand dark:text-blue-400">Project Category</p>
              <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/works')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <FiArrowLeft /> Back to works
              </button>
            </div>

            {project.images && project.images.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">More images</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.map((src) => (
                    <div key={src} className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900">
                      <img src={src} alt={`${project.title} gallery`} className="h-full w-full object-cover" />
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
