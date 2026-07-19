import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/works' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/skills' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-white/20 via-white/10 to-white/20 dark:from-slate-950/30 dark:via-slate-950/20 dark:to-slate-950/30 backdrop-blur-2xl border-b border-white/20 dark:border-slate-700/30 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.35)] transition-colors"
    >
      <div className="container-x flex items-center justify-between py-3">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={isDark ? '/images/logowhite.svg' : '/images/logo.svg'}
            alt="Bhashitha logo"
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`hover:text-brand transition-colors duration-200 ${
                location.pathname === l.to ? 'text-brand border-b-2 border-brand pb-0.5' : ''
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            className="text-xl text-slate-900 dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`py-2 text-sm font-medium transition-colors ${
                    location.pathname === l.to
                      ? 'text-brand'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
