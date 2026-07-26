import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Works from './pages/Works'
import ProjectDetails from './pages/ProjectDetails'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ExperiencePage from './pages/ExperiencePage'
import Skills from './pages/Skills'
import TestimonialsPage from './pages/Testimonials'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import RequireAuth from './components/RequireAuth'
import { ProjectsProvider } from './context/ProjectsContext'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AuthProvider>
      <ProjectsProvider>
        {isLoading && <LoadingScreen />}
        <div className="bg-white dark:bg-slate-950 min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300">
          <Navbar />
          {/* Key on the wrapper div — triggers a fresh CSS fade-in on every navigation */}
          <div key={location.pathname} className="page-fade flex-1 flex flex-col pt-[78px]">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/works" element={<Works />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <Admin />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ProjectsProvider>
    </AuthProvider>
  )
}
