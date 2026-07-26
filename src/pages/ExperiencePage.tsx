import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { experience, education } from '../data'

type Tab = 'experience' | 'education'

export default function ExperiencePage() {
  const [tab, setTab] = useState<Tab>('experience')

  return (
    <main>
      <PageHeader title="EXPERIENCE & EDUCATION" subtitle="My professional journey and academic background" />

      <section className="container-x py-10">
        {/* Tab switcher */}
        <div className="flex gap-1 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-full w-fit mb-14">
          {(['experience', 'education'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-8 py-2.5 rounded-full text-sm font-semibold capitalize transition-colors ${
                tab === t ? 'text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab === t && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-brand rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'experience' ? (
            <motion.div
              key="exp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative pl-8 border-l-2 border-brand/30 space-y-12">
                {experience.map((e, i) => (
                  <motion.div
                    key={e.company + i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[2.6rem] top-1 w-4 h-4 rounded-full bg-brand ring-4 ring-white dark:ring-slate-950" />
                    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-brand/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white">{e.company}</h3>
                        <span className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full w-fit">{e.period}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">{e.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="edu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative pl-8 border-l-2 border-brand/30 space-y-12">
                {education.map((ed, i) => (
                  <motion.div
                    key={ed.institution + i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[2.6rem] top-1 w-4 h-4 rounded-full bg-brand ring-4 ring-white dark:ring-slate-950" />
                    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-brand/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white">{ed.institution}</h3>
                        <span className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full w-fit">{ed.period}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">{ed.degree}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  )
}
