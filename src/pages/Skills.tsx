import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { skillCategories, additionalExpertise } from '../data'

function SkillBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(pct) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-700 dark:text-slate-300 font-medium">{name}</span>
        <span className="text-brand font-semibold">{pct}%</span>
      </div>
      <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

const categoryIcons: Record<string, JSX.Element> = {
  'Design Tools': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  'Web Design': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Branding: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Creative: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
}

export default function Skills() {
  return (
    <main>
      <PageHeader title="SKILLS & EXPERTISE" subtitle="A comprehensive toolkit honed through years of practice and continuous learning" />

      <section className="container-x py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-brand/10 dark:bg-brand/20 text-brand flex items-center justify-center">
                  {categoryIcons[cat.title]}
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white">{cat.title}</h3>
              </div>
              {cat.skills.map((sk, si) => (
                <SkillBar key={sk.name} name={sk.name} pct={sk.pct} delay={ci * 0.1 + si * 0.12} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Additional Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-8">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalExpertise.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: '#0066FF', color: '#0066FF' }}
                className="px-5 py-2 border border-slate-300 dark:border-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 cursor-default transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}
