// ── Services ──────────────────────────────────────────────────────────
export const services = [
  { title: 'GRAPHIC DESIGN', tab: 'Graphic Design', desc: 'Creative visuals for social media, advertising, print, presentations, and promotional campaigns.' },
  { title: 'LOGO DESIGN', tab: 'Logo', desc: 'Minimal, timeless logos designed to build recognition and communicate your brands personality.' },
  { title: 'BRANDING', tab: 'Branding', desc: 'Memorable brand identities including logos, visual systems, brand guidelines, and marketing assets.' },
  { title: 'UI/UX DESIGN', tab: 'UI/UX', desc: 'Designing intuitive, user-focused digital experiences that are beautiful, functional, and impactful.' },
  { title: 'WEB DEVELOPMENT', tab: 'Web Dev', desc: 'Fast, responsive, SEO-friendly websites built with modern technologies for businesses and personal brands.' },
]

// ── Stats ─────────────────────────────────────────────────────────────
export const stats = [
  { value: '150+', label: 'Completed Projects' },
  { value: '05+', label: 'Years of Experience' },
  { value: '100+', label: 'Happy Clients' },
]

// ── Projects (categorised) ────────────────────────────────────────────
export type Project = {
  id: string
  title: string
  tag: 'UI' | 'UX' | 'UI/UX' | 'Branding' | 'Graphic Design' | 'Logo' | 'Web Dev'
  bg: string
  highlight?: boolean
  description: string
  image: string
  images?: string[]
  tags: string[]
  order_index?: number
}

export const projects: Project[] = [
  { id: 'devninja-lms', title: 'DEVNINJA LMS', tag: 'UI', bg: 'from-zinc-700 to-zinc-900', highlight: true, description: 'A modern learning management system designed to simplify course delivery, student tracking, and instructor workflows with a polished UI.', image: '/images/img.webp', tags: ['UI', 'Web App', 'Education'] },
  { id: 'nft-glimpse-website', title: 'NFT GLIMPSE WEBSITE', tag: 'UX', bg: 'from-zinc-600 to-zinc-900', description: 'A marketplace landing experience for NFTs, focused on intuitive browsing, responsive interactions, and immersive storytelling.', image: '/images/img.webp', tags: ['UX', 'Marketplace', 'Crypto'] },
  { id: 'paypulse-bank-app', title: 'PAYPULSE BANK APP', tag: 'UI', bg: 'from-slate-700 to-slate-900', description: 'A sleek digital banking interface built to make mobile finance easy, secure, and visually trustworthy for everyday users.', image: '/images/img.webp', tags: ['UI', 'Finance', 'Mobile'] },
  { id: 'snapjava-marketing', title: 'SNAPJAVA MARKETING', tag: 'Branding', bg: 'from-zinc-800 to-black', highlight: true, description: 'A bold brand design system for a digital marketing agency, pairing sharp typography with memorable visual assets.', image: '/images/img.webp', tags: ['Branding', 'Marketing', 'Identity'] },
  { id: 'iravit-sass-platform', title: 'IRAVIT SASS PLATFORM', tag: 'UX', bg: 'from-zinc-700 to-zinc-900', description: 'A SaaS experience optimized for onboarding and retention, featuring clear user journeys and contextual product flows.', image: '/images/img.webp', tags: ['UX', 'Product', 'SaaS'] },
  { id: 'boltzshift-agency', title: 'BOLTZSHIFT AGENCY', tag: 'Web Dev', bg: 'from-zinc-800 to-zinc-950', description: 'A launch-ready agency website with smooth navigation, responsive layouts, and fast interaction patterns.', image: '/images/img.webp', tags: ['Web Dev', 'Agency', 'Performance'] },
  { id: 'ryn-portfolio-site', title: 'RYN PORTFOLIO SITE', tag: 'Web Dev', bg: 'from-slate-800 to-slate-950', description: 'A personal portfolio built to showcase creative work in a clean, modern format with strong visual hierarchy.', image: '/images/img.webp', tags: ['Web Dev', 'Portfolio', 'Design'] },
  { id: 'apex-coffee-brand', title: 'APEX COFFEE BRAND', tag: 'Branding', bg: 'from-amber-900 to-zinc-900', description: 'A complete coffee brand identity including packaging, logo, and promotional artwork with an energetic tone.', image: '/images/img.webp', tags: ['Branding', 'Packaging', 'Food'] },
  { id: 'truenorth-logo', title: 'TRUENORTH LOGO', tag: 'Logo', bg: 'from-zinc-700 to-zinc-900', description: 'A distinctive logo system built for a growth consultancy, emphasizing clarity and trust in every mark.', image: '/images/img.webp', tags: ['Logo', 'Identity', 'Symbol'] },
  { id: 'vibe-music-logo', title: 'VIBE MUSIC LOGO', tag: 'Logo', bg: 'from-violet-900 to-zinc-900', highlight: true, description: 'A striking music brand logo with motion-friendly shape and strong visual energy for artist promotion.', image: '/images/img.webp', tags: ['Logo', 'Music', 'Entertainment'] },
  { id: 'pulse-poster-series', title: 'PULSE POSTER SERIES', tag: 'Graphic Design', bg: 'from-zinc-600 to-zinc-900', description: 'A poster campaign that blends bold typography and expressive visuals to amplify event messaging.', image: '/images/img.webp', tags: ['Graphic Design', 'Poster', 'Campaign'] },
  { id: 'harvest-packaging', title: 'HARVEST PACKAGING', tag: 'Graphic Design', bg: 'from-green-900 to-zinc-900', description: 'An eco-inspired packaging concept designed for premium food products with sustainable appeal.', image: '/images/img.webp', tags: ['Graphic Design', 'Packaging', 'Sustainability'] },
]

export const homeProjects: Project[] = [
  { id: 'devninja-lms', title: 'DEVNINJA LMS', tag: 'UI', bg: 'from-zinc-700 to-zinc-900', highlight: true, description: 'A modern learning management system designed to simplify course delivery, student tracking, and instructor workflows with a polished UI.', image: '/images/img.webp', tags: ['UI', 'Web App', 'Education'] },
  { id: 'nft-glimpse-website', title: 'NFT GLIMPSE WEBSITE', tag: 'UX', bg: 'from-zinc-600 to-zinc-900', description: 'A marketplace landing experience for NFTs, focused on intuitive browsing, responsive interactions, and immersive storytelling.', image: '/images/img.webp', tags: ['UX', 'Marketplace', 'Crypto'] },
  { id: 'apex-coffee-brand', title: 'APEX COFFEE BRAND', tag: 'Branding', bg: 'from-amber-900 to-zinc-900', description: 'A complete coffee brand identity including packaging, logo, and promotional artwork with an energetic tone.', image: '/images/img.webp', tags: ['Branding', 'Packaging', 'Food'] },
  { id: 'boltzshift-agency', title: 'BOLTZSHIFT AGENCY', tag: 'Web Dev', bg: 'from-zinc-800 to-zinc-950', description: 'A launch-ready agency website with smooth navigation, responsive layouts, and fast interaction patterns.', image: '/images/img.webp', tags: ['Web Dev', 'Agency', 'Performance'] },
]

export function slugifyProject(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// ── Experience ────────────────────────────────────────────────────────
export const experience = [
  { company: 'CloudWave', role: 'CMO | Co-Founder', period: 'Current', type: 'work' as const },
  { company: 'National Institute of Fundamental Studies', role: 'Technical Officer', period: '2024', type: 'work' as const },
  { company: 'Oshadi Enterprises', role: 'Graphic Designer', period: '2024-2025', type: 'work' as const },
  { company: 'RedLine Creations', role: 'Junior Graphic Designer', period: '2023', type: 'work' as const },
]

export const education = [
  { institution: 'Rajarata University of Sri Lanka', degree: 'Bachelor in Information Communication Technology(Ug)', period: 'Current', type: 'edu' as const },
  { institution: 'Dharmaraja College', degree: 'G.C.E. Advanced Level (ET)', period: '2023', type: 'edu' as const },
  { institution: 'Dharmaraja College', degree: 'G.C.E. Ordinary Level', period: '2020', type: 'edu' as const },
]

// ── Skills ─────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    title: 'Design Tools',
    icon: '🎨',
    skills: [
      { name: 'Adobe Photoshop', pct: 96 },
      { name: 'CoralDraw', pct: 84 },
      { name: 'Affinity', pct: 90 },
      { name: 'Figma', pct: 92 },
    ],
  },
  {
    title: 'Branding',
    icon: '◈',
    skills: [
      { name: 'Logo Design', pct: 95 },
      { name: 'Brand Identity', pct: 93 },
      { name: 'Typography', pct: 96 },
      { name: 'Color Theory', pct: 94 },
    ],
  },
  {
    title: 'Creative',
    icon: '✦',
    skills: [
      { name: 'Illustration', pct: 88 },
      { name: 'Photo Editing', pct: 82 },
      { name: 'Video Editing', pct: 90 },
      { name: 'Animation', pct: 78 },
    ],
  },
    {
    title: 'Web Design',
    icon: '</>',
    skills: [
      { name: 'HTML', pct: 87 },
      { name: 'CSS', pct: 84 },
      { name: 'UI/UX Design', pct: 92 },
      { name: 'Responsive Design', pct: 82 },
    ],
  },
]

export const additionalExpertise = [
  'Print Design', 'Packaging Design', 'Motion Graphics', 'Brand Strategy',
  'Social Media Design', 'Editorial Design', 'Infographics', 'Icon Design',
  'Design Systems', 'Creative Consulting',
]

// ── Testimonials ──────────────────────────────────────────────────────
export type Testimonial = {
  id?: string | number
  name: string
  role: string
  avatar: string
  text: string
  stars: number
}

export const initialTestimonials: Testimonial[] = [
  {
    name: 'Martin Lee',
    role: 'CEO, DevNinja',
    avatar: '/images/Clients/client%20(1).jpg',
    text: 'Bhashitha was fantastic to work with from start to finish. We were looking for a simple, stand-out logo and he delivered. I would recommend him to anyone looking for a design!',
    stars: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, Apex Coffee',
    avatar: '/images/Clients/client%20(2).jpg',
    text: 'Incredible attention to detail and a true understanding of brand identity. Bhashitha turned our vague vision into a stunning, cohesive brand system in record time.',
    stars: 5,
  },
  {
    name: 'Alex Russo',
    role: 'Product Manager, PayPulse',
    avatar: '/images/Clients/client%20(3).jpg',
    text: 'The UI he crafted for our banking app was clean, intuitive and beautiful. User satisfaction scores jumped 40% after launch. Truly exceptional work.',
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Marketing Director, Snapjava',
    avatar: '/images/Clients/client%20(4).jpg',
    text: 'Working with Bhashitha was a pleasure. His creative vision and professionalism made our digital campaign a huge success. We will definitely work together again.',
    stars: 5,
  },
]

const TESTIMONIALS_STORAGE_KEY = 'portfolio-testimonials'

export function getTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return initialTestimonials

  try {
    const raw = window.localStorage.getItem(TESTIMONIALS_STORAGE_KEY)
    if (!raw) return initialTestimonials

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return initialTestimonials

    return parsed.map((item) => ({
      name: item?.name?.toString() || 'Client',
      role: item?.role?.toString() || '',
      avatar: item?.avatar?.toString() || '',
      text: item?.text?.toString() || '',
      stars: typeof item?.stars === 'number' ? item.stars : 5,
    }))
  } catch {
    return initialTestimonials
  }
}

export function saveTestimonials(testimonials: Testimonial[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials))
}

export function getStoredTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return initialTestimonials

  try {
    const raw = window.localStorage.getItem(TESTIMONIALS_STORAGE_KEY)
    if (!raw) return initialTestimonials

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return initialTestimonials

    return parsed.map((item) => ({
      name: item?.name?.toString() || 'Client',
      role: item?.role?.toString() || '',
      avatar: item?.avatar?.toString() || '',
      text: item?.text?.toString() || '',
      stars: typeof item?.stars === 'number' ? item.stars : 5,
    }))
  } catch {
    return initialTestimonials
  }
}

// ── Socials ───────────────────────────────────────────────────────────
export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhashithadharmarathna/' },
  { label: 'Facebook', href: 'https://www.facebook.com/bhashitha.kavishan' },
  { label: 'Instagram', href: 'https://www.instagram.com/_kavish_b_/' },

]

// ── Clients ───────────────────────────────────────────────────────────
export const clients = ['CloudWave_Asia', 'Oshadi_Enterprises', 'UniX_StudioZ', 'RedLine_Creations', 'IK_Photography',]

// ── Articles ──────────────────────────────────────────────────────────
export const articles = [
  { title: 'Prototyping Tools: Streamlining UI/UX Design Workflows', date: 'November 27, 2023', bg: 'from-zinc-800 to-black' },
  { title: 'AR Filters in Social Media: Impact on User Engagement', date: 'November 27, 2023', bg: 'from-zinc-700 to-zinc-900' },
  { title: 'Adaptive Content in Tailoring for User Reach', date: 'November 27, 2023', bg: 'from-zinc-600 to-zinc-900' },
]
