import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/projectData'

export default function Login() {
  const { user, signIn, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from ?? '/admin'

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Please provide both email and password.')
      return
    }

    const result = await signIn(email, password)
    if (!result.success) {
      setError(result.error ?? 'Login failed. Please try again.')
      return
    }

    setSuccess('Login successful. Redirecting...')
    navigate(from, { replace: true })
  }

  return (
    <main>
      <PageHeader title="Admin Login" subtitle="Sign in with your Supabase credentials to access the admin panel" />
      <section className="container-x py-10">
        <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
          {!isSupabaseConfigured ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 dark:border-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
              Supabase authentication is not configured. Set <code className="rounded bg-slate-100 px-1 py-0.5">VITE_SUPABASE_URL</code> and <code className="rounded bg-slate-100 px-1 py-0.5">VITE_SUPABASE_ANON_KEY</code> in your environment.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {(error || success) && (
                <p className={`rounded-2xl px-4 py-3 text-sm ${error ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-200' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200'}`}>
                  {error || success}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            If you do not have credentials, create a Supabase user in your project dashboard.
          </p>

          <div className="mt-4">
            <Link to="/" className="text-sm font-medium text-brand hover:underline">
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
