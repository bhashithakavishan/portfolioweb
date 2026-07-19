import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { useProjects } from '../context/ProjectsContext'

const TABS = ['All', 'UI/UX', 'Branding', 'Graphic Design', 'Logo', 'Web Dev'] as const
type Tab = (typeof TABS)[number]

export default function Works() {
  const [searchParams] = useSearchParams()
  const [active, setActive] = useState<Tab>('All')
  const [count, setCount] = useState(6)
  const { projects } = useProjects()

  // Read tab from URL query (set by Services section)
  useEffect(() => {
    const t = searchParams.get('tab')
    const resolvedTab = t === 'UI' || t === 'UX' ? 'UI/UX' : t
    if (resolvedTab && TABS.includes(resolvedTab as Tab)) {
      setActive(resolvedTab as Tab)
    }
  }, [searchParams])

  const filtered =
    active === 'All'
      ? projects
      : active === 'UI/UX'
      ? projects.filter((p) => p.tag === 'UI' || p.tag === 'UX' || p.tag === 'UI/UX')
      : projects.filter((p) => p.tag === active)
  const visible = filtered.slice(0, count)

  const handleTab = (t: Tab) => {
    setActive(t)
    setCount(6)
  }

  return (
    <main>
      <PageHeader title="MY WORKS" subtitle="A showcase of selected projects across disciplines" />

      <section className="container-x py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TABS.map((t) => (
            <motion.button
              key={t}
              onClick={() => handleTab(t)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                active === t
                  ? 'bg-brand text-white shadow-md shadow-brand/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand'
              }`}
            >
              {t}
              {active === t && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-0 rounded-full border-2 border-brand"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {visible.length > 0 ? (
              visible.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))
            ) : (
              <p className="col-span-2 text-center text-slate-400 dark:text-slate-500 py-20">
                No projects in this category yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {count < filtered.length && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCount((c) => c + 6)}
              className="border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-brand hover:text-white hover:border-brand transition-colors"
            >
              LOAD MORE
            </motion.button>
          </div>
        )}
      </section>
    </main>
  )
}
