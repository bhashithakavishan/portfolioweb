import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import ServicesSection from '../components/ServicesSection'
import { stats, socials } from '../data'

export default function AboutMe() {
  return (
    <main>
      <PageHeader title="ABOUT ME" subtitle="Little Brief About Myself" />

      {/* Intro */}
      <section className="container-x grid md:grid-cols-2 gap-12 items-center py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -left-6 top-6 w-16 h-40 border-2 border-brand rounded-full hidden md:block opacity-60" />
          
          <img
            src="/images/myimage2.png"
            alt="Bhashitha Dharmarathna"
            className="w-full h-full object-cover"
    />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          
          <h2 className="font-bold text-3xl md:text-4xl text-slate-900 dark:text-white">
            HI, I AM BHASHITHA.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-5 max-w-md text-sm leading-relaxed">
            Crafting visual stories that inspire and engage. Specializing in Branding, Creative
            Design, Digital Marketing, and Digital Experiences. I turn ideas into compelling
            visuals that connect with your audience.
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label + i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="font-bold text-3xl text-brand">{s.value}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Marquee strip */}
      <div className="overflow-hidden bg-brand text-white my-24 py-4 -rotate-1">
        <motion.div
          className="flex gap-10 whitespace-nowrap text-2xl md:text-4xl font-bold"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              DESIGN ✦ DEVELOPMENT ✦ DISCOVER ✦ DESTINY ✦ DESIGN ✦ DEVELOPMENT ✦ DISCOVER ✦
              DESTINY ✦
            </span>
          ))}
        </motion.div>
      </div>

      <ServicesSection />

      {/* Socials */}
      <section className="container-x py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bold text-3xl md:text-5xl mb-14 text-slate-900 dark:text-white"
        >
          FOLLOW ME ON
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8 max-w-xl mx-auto">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 4 }}
              className="flex items-center justify-center gap-2 font-semibold text-xl md:text-2xl text-slate-900 dark:text-white hover:text-brand transition-colors"
            >
              {s.label} <FiArrowUpRight className="text-brand" />
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  )
}
