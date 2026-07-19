import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_45%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.2),_transparent_40%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)]"
    >
      <div className="relative flex flex-col items-center text-center">
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-24 w-24 items-center justify-center"
        >
          <motion.img
            src="/images/logo.svg"
            alt="Bhashitha logo"
            animate={{ scale: [0.96, 1.03, 0.96] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-20 w-20 object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="mt-6 text-2xl font-semibold tracking-[0.35em] text-slate-800 dark:text-slate-100"
        >
          BHASHITHA
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-2 text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400"
        >
          Crafting digital experiences
        </motion.p>

        <div className="mt-7 h-1.5 w-44 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/80">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-brand via-blue-400 to-cyan-300"
          />
        </div>
      </div>
    </motion.div>
  )
}
