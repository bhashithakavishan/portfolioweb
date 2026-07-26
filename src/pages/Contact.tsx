import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

const info = [
  { icon: <FiMail />, label: 'Email', value: 'bhashithakavishan8@gmail.com', href: 'mailto:bhashithakavishan8@gmail.com' },
  { icon: <FiPhone />, label: 'Phone', value: '+94 76 186 4224', href: 'tel:+94761864224' },
  { icon: <FiMapPin />, label: 'Location', value: 'Kandy, Sri Lanka', href: '#' },
]

const socials = [

  { icon: <FaFacebookF />, href: 'https://www.facebook.com/bhashitha.kavishan', label: 'Facebook' },
  { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/bhashithadharmarathna/', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/_kavish_b_/', label: 'Instagram' },
  { icon: <FaWhatsapp />, href: 'https://wa.me/94761864224', label: 'WhatsApp' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main>
      <PageHeader title="CONTACT" subtitle="Let's work together on your next project" />

      <section className="container-x py-10 grid lg:grid-cols-[1fr_1.4fr] gap-14">
        {/* Left – contact info */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold text-2xl text-slate-900 dark:text-white mb-4"
          >
            Get in touch
          </motion.h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10">
            Have a project in mind or just want to say hi? Fill in the form or reach out directly.
          </p>

          <div className="space-y-6 mb-12">
            {info.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand/10 dark:bg-brand/20 text-brand flex items-center justify-center text-lg shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{item.label}</p>
                  <p className="text-slate-900 dark:text-white font-medium text-sm">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 tracking-widest uppercase">Follow me</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-brand hover:text-white hover:border-brand transition-colors text-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right – form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {(['name', 'email'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  required
                  placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand dark:focus:border-brand transition-colors"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Subject</label>
            <input
              type="text"
              required
              placeholder="What's this about?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand dark:focus:border-brand transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Message</label>
            <textarea
              required
              rows={6}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand dark:focus:border-brand transition-colors resize-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-colors ${
              sent
                ? 'bg-green-500 text-white'
                : 'bg-brand text-white hover:bg-blue-700'
            }`}
          >
            {sent ? '✓ Message sent!' : <><FiSend /> Send Message</>}
          </motion.button>
        </motion.form>
      </section>
    </main>
  )
}
