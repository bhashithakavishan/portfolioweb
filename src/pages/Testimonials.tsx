import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import { type Testimonial } from '../data'
import { fetchTestimonials } from '../lib/testimonials'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadTestimonials = async () => {
      const items = await fetchTestimonials()
      if (isMounted) {
        setTestimonials(items)
        setCurrent(0)
      }
    }

    loadTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  const next = useCallback(() => {
    if (!testimonials.length) return
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = () => {
    if (!testimonials.length) return
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }

  const goTo = (i: number) => {
    if (!testimonials.length) return
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
    setAuto(false)
    setTimeout(() => setAuto(true), 6000)
  }

  useEffect(() => {
    if (!auto) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [auto, next])

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  }

  const t = testimonials[current]

  if (!testimonials.length) {
    return (
      <main>
        <PageHeader title="TESTIMONIALS" subtitle="What my clients say about working with me" />
        <section className="container-x py-16 text-center text-slate-500 dark:text-slate-400">
          No testimonials available yet.
        </section>
      </main>
    )
  }

  return (
    <main>
      <PageHeader title="TESTIMONIALS" subtitle="What my clients say about working with me" />

      <section className="container-x py-16">
        {/* Main carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 min-h-[360px] flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="p-10 md:p-16 flex flex-col items-center text-center gap-6"
              >
                {/* Avatar */}
                <motion.img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-brand/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                />
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <FaStar key={i} className="text-brand w-4 h-4" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-xl">
                  "{t.text}"
                </p>
                {/* Name */}
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</p>
                  <p className="text-brand text-sm font-medium mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={() => { prev(); setAuto(false); setTimeout(() => setAuto(true), 6000) }}
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-brand hover:text-white hover:border-brand transition-colors"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => { next(); setAuto(false); setTimeout(() => setAuto(true), 6000) }}
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-brand hover:text-white hover:border-brand transition-colors"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 h-3 bg-brand'
                  : 'w-3 h-3 bg-slate-300 dark:bg-slate-700 hover:bg-brand/50'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail row */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {testimonials.map((tm, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ y: -3 }}
              className={`flex flex-col items-center gap-2 transition-opacity ${
                i === current ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img
                src={tm.avatar}
                alt={tm.name}
                className={`w-14 h-14 rounded-full object-cover ring-2 transition-all ${
                  i === current ? 'ring-brand' : 'ring-transparent'
                }`}
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {tm.name.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </main>
  )
}
