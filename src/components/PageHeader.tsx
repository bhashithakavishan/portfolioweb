import { motion } from 'framer-motion'

export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="container-x pt-16 pb-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-bold text-4xl md:text-6xl tracking-tight text-slate-900 dark:text-white"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-slate-500 dark:text-slate-400 text-sm mt-3"
      >
        {subtitle}
      </motion.p>
      <div className="border-t border-slate-200 dark:border-slate-800 mt-8" />
    </div>
  )
}
