import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { services } from '../data'

export default function ServicesSection() {
  const navigate = useNavigate()
  const mapServiceTab = (tab: string) => (tab === 'UI' || tab === 'UX' ? 'UI/UX' : tab)

  return (
    <section className="container-x py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-bold text-3xl md:text-5xl mb-4 text-slate-900 dark:text-white"
      >
        SERVICES I OFFER
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-500 dark:text-slate-400 text-sm mb-12"
      >
        Click any service to explore related projects →
      </motion.p>

      <div>
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ x: 8, backgroundColor: 'rgba(0,102,255,0.04)' }}
            onClick={() => navigate(`/works?tab=${encodeURIComponent(mapServiceTab(s.tab))}`)}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-center border-b border-slate-200 dark:border-slate-800 py-7 group cursor-pointer rounded-xl px-4 -mx-4 transition-colors"
          >
            <h3 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white group-hover:text-brand transition-colors">
              {s.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">{s.desc}</p>
            <div className="flex items-center gap-2 text-brand text-sm font-medium justify-self-end">
              <span className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity">View projects</span>
              <FiArrowUpRight className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
