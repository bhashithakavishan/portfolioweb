import { Link } from 'react-router-dom'
import { Home, ArrowLeft, SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 rounded-[36px] border border-slate-200 bg-white/80 p-8 shadow-[0_20px_80px_-20px_rgba(15,23,42,0.2)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
              <SearchX size={16} />
              404 • Page not found
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                The page you’re looking for seems to have wandered off.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                The route might be outdated, mistyped, or removed. You can head back home or return to the last page you visited.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                <Home size={18} />
                Back to home
              </Link>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                <ArrowLeft size={18} />
                Go back
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-brand p-8 text-white shadow-xl dark:border-slate-700">
            <div className="text-7xl font-black tracking-tight">404</div>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <p>Looks like this link needs a fresh start.</p>
              <p>Try one of the main sections above or return home to continue exploring the portfolio.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
