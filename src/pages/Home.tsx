import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import ServicesSection from '../components/ServicesSection'
import Hero from '../components/Hero'
import ScrollingRibbon from '../components/ScrollingRibbon'
import ProjectCard from '../components/ProjectCard'
import { clients, experience, skillCategories, type Testimonial } from '../data'
import { useProjects } from '../context/ProjectsContext'
import { fetchTestimonials } from '../lib/testimonials'

const TABS = ['All', 'UI/UX', 'Branding', 'Graphic Design', 'Logo', 'Web Dev'] as const
type Tab = (typeof TABS)[number]

// ── Tiny skill bar used in the home preview ────────────────────────────
function MiniBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600 dark:text-slate-400">{name}</span>
        <span className="text-brand font-semibold">{pct}%</span>
      </div>
      <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-blue-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ── Testimonial mini carousel ──────────────────────────────────────────
function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % items.length)
  }, [items.length])
  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + items.length) % items.length)
  }

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next])

  if (!items.length) return null

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  const t = items[current]

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden min-h-[280px] flex flex-col justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="p-8 md:p-10 flex flex-col items-center text-center gap-4"
          >
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-brand/30" />
            <div className="flex gap-1">
              {Array.from({ length: t.stars }).map((_, i) => <FaStar key={i} className="text-brand w-3.5 h-3.5" />)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-lg">"{t.text}"</p>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
              <p className="text-brand text-xs mt-0.5">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button onClick={prev} className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-colors">
        <FiChevronLeft size={18} />
      </button>
      <button onClick={next} className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-colors">
        <FiChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2.5 bg-brand' : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const { projects } = useProjects()
  const [active, setActive] = useState<Tab>('All')
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const featuredProjects = projects.filter((project) => project.highlight)
  const filteredProjects =
    active === 'All'
      ? (featuredProjects.length > 0 ? featuredProjects : projects)
      : active === 'UI/UX'
      ? (featuredProjects.length > 0 ? featuredProjects : projects).filter((p) => p.tag === 'UI' || p.tag === 'UX' || p.tag === 'UI/UX')
      : (featuredProjects.length > 0 ? featuredProjects : projects).filter((p) => p.tag === active)

  const displayProjects = filteredProjects.slice(0, 4)

  const handleTab = (t: Tab) => {
    setActive(t)
  }

  useEffect(() => {
    let isMounted = true

    const loadTestimonials = async () => {
      const items = await fetchTestimonials()
      if (isMounted) setTestimonials(items)
    }

    loadTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main>
      <Hero />

      {/* Clients (scrolling ribbon) */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <ScrollingRibbon items={clients} speed={20} />
      </motion.div>

{/* About teaser */}
<section className="container-x py-12 grid md:grid-cols-2 gap-12 items-center">
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="rounded-3xl overflow-hidden h-80"
  >
    <img
      src="/images/myimage.png"
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
    <h2 className="font-bold text-3xl md:text-4xl leading-tight text-slate-900 dark:text-white">
      LET'S GET<br />KNOW ABOUT<br />ME CLOSER
    </h2>

    <p className="text-slate-500 dark:text-slate-400 mt-6 max-w-md text-sm leading-relaxed">
      I'm Bhashitha Dharmarathna, a UI/UX Designer and Creative Brand Designer passionate about transforming ideas into meaningful digital experiences.
    </p>

    <Link
      to="/about"
      className="inline-block mt-8 bg-brand text-white font-medium rounded-full px-7 py-3 text-sm hover:opacity-90 transition-opacity"
    >
      ABOUT ME
    </Link>
  </motion.div>
</section>

      {/* Projects */}
      <section className="container-x py-10" id="portfolio">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-bold text-3xl md:text-5xl mb-12 text-slate-900 dark:text-white">
          MY PROJECTS
        </motion.h2>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        <div className="grid sm:grid-cols-2 gap-6">
          {displayProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/works" className="border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full px-7 py-3 text-sm inline-flex items-center gap-2 hover:bg-brand hover:text-white hover:border-brand transition-colors font-semibold">
            EXPLORE MORE <FiArrowUpRight />
          </Link>
        </div>
      </section>

      <ServicesSection />

      {/* Skills preview */}
      <section className="container-x py-16">
        <div className="flex items-center justify-between mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-bold text-3xl md:text-5xl text-slate-900 dark:text-white">
            SKILLS & EXPERTISE
          </motion.h2>
          <Link to="/skills" className="text-brand text-xs tracking-widest font-semibold hover:underline flex items-center gap-1">
            VIEW ALL <FiArrowUpRight />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.slice(0, 2).map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-5">{cat.title}</h3>
              {cat.skills.map((sk, si) => (
                <MiniBar key={sk.name} name={sk.name} pct={sk.pct} delay={ci * 0.1 + si * 0.1} />
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="container-x py-10">
        <div className="flex items-center justify-between mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-bold text-3xl md:text-5xl text-slate-900 dark:text-white">
            EXPERIENCE
          </motion.h2>
          <Link to="/experience" className="text-brand text-xs tracking-widest font-semibold hover:underline flex items-center gap-1">
            VIEW ALL <FiArrowUpRight />
          </Link>
        </div>
        <div>
          {experience.slice(0, 4).map((e, i) => (
            <motion.div
              key={e.company + i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-3 items-center border-b border-slate-200 dark:border-slate-800 py-5 text-sm md:text-base"
            >
              <span className="font-semibold text-slate-900 dark:text-white">{e.company}</span>
              <span className="text-slate-500 dark:text-slate-400 text-center">{e.role}</span>
              <span className="text-slate-500 dark:text-slate-400 text-right">{e.period}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x py-24">
        <div className="flex items-center justify-between mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-bold text-3xl md:text-5xl text-slate-900 dark:text-white">
            TESTIMONIALS
          </motion.h2>
          <Link to="/testimonials" className="text-brand text-xs tracking-widest font-semibold hover:underline flex items-center gap-1">
            VIEW ALL <FiArrowUpRight />
          </Link>
        </div>
        <TestimonialCarousel items={testimonials} />
      </section>
    </main>
  )
}
