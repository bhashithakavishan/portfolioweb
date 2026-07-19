import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowRight } from 'react-icons/fi'
import type { Project } from '../data'

type Props = {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose, onNext }: Props) {
  return (
    <AnimatePresence>
      {isOpen && project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-slate-950/95 backdrop-blur-sm px-4 py-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-7xl flex-col rounded-[32px] bg-white dark:bg-slate-950 shadow-2xl overflow-y-auto max-h-[calc(100vh-100px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-20 rounded-full border border-slate-200 bg-white/90 p-3 text-slate-700 shadow transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="grid h-full min-h-0 gap-8 lg:grid-cols-[1.4fr_0.9fr] p-6 lg:p-10 xl:p-12 overflow-hidden">
              <div className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col justify-between gap-6 overflow-hidden min-h-0">
                <div className="overflow-auto pr-2 min-h-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand dark:text-blue-400">{project.tag}</p>
                  <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
                  <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    onClick={onNext}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-blue-600"
                  >
                    Next project
                    <FiArrowRight />
                  </button>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
