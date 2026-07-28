import { motion } from 'framer-motion'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/works' },
  { label: 'Skills', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { icon: <FaFacebookF />, href: 'https://www.facebook.com/bhashitha.kavishan', label: 'Facebook' },
  { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/bhashithadharmarathna/', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/_kavish_b_/', label: 'Instagram' },
  { icon: <FaGithub />, href: 'https://github.com/bhashithakavishan/', label: 'GitHub' },
  { icon: <FaWhatsapp />, href: 'https://wa.me/94761864224', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors"
    >
      <div className="container-x pt-16 pb-8">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 mb-16">
          {/* Left */}
          <div>
            <Link to="/" className="font-bold text-2xl mb-4 inline-block">
              BHASHITHA<span className="text-brand">.</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed mt-2">
              Designing digital experiences that combine creativity, strategy, and usability.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-brand hover:text-white hover:border-brand transition-colors text-xs"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-5">Navigation</p>
            <nav className="grid grid-cols-2 gap-x-10 gap-y-2">
              {footerLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-slate-100 dark:border-slate-800"
        >
          <p className="text-brand text-sm tracking-widest mb-3 font-medium">GET IN TOUCH</p>
          <a
            href="mailto:bhashithakavishan8@gmail.com"
            className="font-bold text-3xl md:text-5xl underline underline-offset-8 hover:text-brand transition-colors break-all"
          >
            CONTACT@BHASHITHA.ME
          </a>
        </motion.div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span>© 2026 Bhashitha Dharmarathna. All rights reserved.</span>
          <span>Designed & Built with ♥</span>
        </div>
      </div>
    </footer>
  )
}
