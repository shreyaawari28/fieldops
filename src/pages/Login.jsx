import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  HardHat,
  Moon,
  ShieldCheck,
  SunMedium,
} from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { validateEmail } from '../utils/validators.js'

const MotionSection = motion.section
const TEST_CREDENTIALS = {
  email: 'test@test.com',
  password: '123456',
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setAuthError('')
    setFieldErrors((current) => ({ ...current, [name]: '' }))
  }

  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required'
    } else if (!validateEmail(form.email)) {
      errors.email = 'Enter a valid email address'
    }

    if (!form.password.trim()) {
      errors.password = 'Password is required'
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    return errors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setFieldErrors(nextErrors)
    setAuthError('')

    if (nextErrors.email || nextErrors.password) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => {
      window.setTimeout(resolve, 800)
    })

    const isValidUser =
      form.email === TEST_CREDENTIALS.email &&
      form.password === TEST_CREDENTIALS.password

    if (!isValidUser) {
      setAuthError('Invalid email or password. Please try again.')
      setIsSubmitting(false)
      return
    }

    await login({
      email: form.email,
      name: 'Test User',
      role: 'Construction Manager',
    })

    navigate(location.state?.from?.pathname || '/projects', { replace: true })
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-8">
        <div className="absolute right-8 top-8 z-20">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent bg-white/90 text-dark shadow-lg transition hover:border-primary hover:text-primary dark:border-[#444444] dark:bg-[#2C2C2C] dark:text-gray-100"
            aria-label="Toggle dark mode"
          >
            {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <section className="flex min-h-[260px] flex-col justify-between rounded-t-[2rem] bg-primary px-6 py-8 text-dark lg:min-h-full lg:rounded-l-[2rem] lg:rounded-r-none lg:px-10 lg:py-10">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-dark p-3 text-primary">
              <HardHat size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/65">
                FIELDOPS
              </p>
              <p className="text-sm text-dark/70">Operational visibility for every site.</p>
            </div>
          </div>

          <div className="py-8 lg:py-0">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.45em] text-dark/60">
              Project Control
            </p>
            <h1
              className="display-font max-w-md text-6xl uppercase leading-[0.88] tracking-[0.02em] text-dark sm:text-7xl lg:text-8xl"
            >
              Build. Track. Deliver.
            </h1>
            <p className="mt-5 max-w-sm text-base text-dark/72 sm:text-lg">
              Sign in to monitor crews, submit DPRs, and keep field execution aligned.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-dark/15 bg-dark/10 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark/70">
                Test Access
              </p>
              <p className="mt-1 text-sm font-medium">test@test.com / 123456</p>
            </div>
            <div className="rounded-2xl border border-dark/15 bg-dark/10 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck size={16} />
                Protected route demo
              </div>
            </div>
          </div>
        </section>

        <MotionSection
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center rounded-b-[2rem] bg-light-bg px-6 py-8 dark:bg-[#1A1A1A] sm:px-8 lg:rounded-b-none lg:rounded-r-[2rem] lg:px-10 lg:py-10"
        >
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Secure Access
              </p>
              <h2
                className="display-font mt-2 text-4xl uppercase text-dark dark:text-gray-100"
              >
                Site Login
              </h2>
            </div>

            <div className="mb-8 hidden lg:block">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Secure Access
              </p>
              <h2
                className="display-font mt-3 text-5xl uppercase leading-none text-dark dark:text-gray-100"
              >
                Welcome Back
              </h2>
              <p className="mt-3 text-sm text-dark/65 dark:text-gray-300">
                Enter the test credentials to access the project dashboard.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-dark dark:text-light-bg"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="test@test.com"
                  className="field-surface"
                />
                {fieldErrors.email ? (
                  <p className="mt-2 text-sm text-rose-500">{fieldErrors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-dark dark:text-light-bg"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="123456"
                    className="field-surface pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-0 inline-flex min-h-[44px] w-14 items-center justify-center text-dark/55 transition hover:text-primary dark:text-gray-400"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className="mt-2 text-sm text-rose-500">{fieldErrors.password}</p>
                ) : null}
              </div>

              {authError ? (
                <p className="text-sm font-medium text-rose-500">{authError}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="touch-target inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold uppercase tracking-[0.24em] text-dark transition hover:bg-dark hover:text-light-bg disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-dark/35 border-t-dark" />
                    Logging in
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </MotionSection>
      </div>
    </main>
  )
}

export default Login
