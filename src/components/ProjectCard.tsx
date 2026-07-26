import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import type { Project } from '../data'

export default function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl overflow-hidden h-72 md:h-80 bg-gradient-to-br ${project.bg} flex flex-col justify-end group`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
      </div>
      <Link to={`/project/${project.id}`} className="absolute inset-0 z-10" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-6 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">{project.tag}</p>
            <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">
              {project.title}
            </h3>
          </div>
          <FiArrowUpRight className="text-white text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand to-blue-400 opacity-90" />
      </div>
    </motion.div>
  )
}
