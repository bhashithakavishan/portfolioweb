import { supabase } from './supabase'
import { getTestimonials as getLocalTestimonials, saveTestimonials as saveLocalTestimonials, type Testimonial } from '../data'

export const isTestimonialsConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

type SupabaseTestimonialRecord = {
  id?: string | number
  name?: string | null
  role?: string | null
  avatar?: string | null
  text?: string | null
  stars?: number | null
  created_at?: string | null
}

function normalizeTestimonial(record: Partial<SupabaseTestimonialRecord>): Testimonial {
  return {
    id: record.id,
    name: record.name?.toString().trim() || 'Client',
    role: record.role?.toString().trim() || '',
    avatar: record.avatar?.toString().trim() || '',
    text: record.text?.toString().trim() || '',
    stars: typeof record.stars === 'number' ? record.stars : 5,
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!isTestimonialsConfigured) {
    return getLocalTestimonials()
  }

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.warn('Supabase testimonials fetch error:', error)
    return getLocalTestimonials()
  }

  const normalized = data.map((item) => normalizeTestimonial(item))
  return normalized.length > 0 ? normalized : getLocalTestimonials()
}

export async function createTestimonialRecord(testimonial: Testimonial): Promise<{ testimonial: Testimonial | null; error?: string }> {
  if (!isTestimonialsConfigured) {
    return { testimonial: null, error: 'Supabase is not configured' }
  }

  const record = {
    name: testimonial.name,
    role: testimonial.role,
    avatar: testimonial.avatar,
    text: testimonial.text,
    stars: Number(testimonial.stars) || 5,
  }

  const { data, error } = await supabase.from('testimonials').insert(record).select().single()

  if (error || !data) {
    console.error('Supabase create testimonial error:', error)
    return { testimonial: null, error: error?.message ?? 'Unknown Supabase create error' }
  }

  return { testimonial: normalizeTestimonial(data) }
}

export async function updateTestimonialRecord(id: string | number, testimonial: Partial<Testimonial>): Promise<{ testimonial: Testimonial | null; error?: string }> {
  if (!isTestimonialsConfigured) {
    return { testimonial: null, error: 'Supabase is not configured' }
  }

  const updateData = {
    ...(testimonial.name ? { name: testimonial.name } : {}),
    ...(testimonial.role !== undefined ? { role: testimonial.role } : {}),
    ...(testimonial.avatar !== undefined ? { avatar: testimonial.avatar } : {}),
    ...(testimonial.text !== undefined ? { text: testimonial.text } : {}),
    ...(testimonial.stars !== undefined ? { stars: Number(testimonial.stars) || 5 } : {}),
  }

  const { data, error } = await supabase.from('testimonials').update(updateData).eq('id', id).select().single()

  if (error || !data) {
    console.error('Supabase update testimonial error:', error)
    return { testimonial: null, error: error?.message ?? 'Unknown Supabase update error' }
  }

  return { testimonial: normalizeTestimonial(data) }
}

export async function deleteTestimonialRecord(id: string | number): Promise<{ success: boolean; error?: string }> {
  if (!isTestimonialsConfigured) {
    return { success: false, error: 'Supabase is not configured' }
  }

  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) {
    console.error('Supabase delete testimonial error:', error)
    return { success: false, error: error?.message ?? 'Unknown Supabase delete error' }
  }

  return { success: true }
}

export function saveTestimonialsLocally(testimonials: Testimonial[]) {
  saveLocalTestimonials(testimonials)
}
