import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-dark/10 bg-light-bg/85 backdrop-blur dark:border-white/10 dark:bg-dark/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="display-font text-2xl uppercase tracking-[0.1em] text-dark dark:text-gray-100"
        >
          ⚙ FIELDOPS
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            className="touch-target inline-flex items-center gap-2 rounded-full bg-dark px-4 py-2 text-sm font-semibold text-light-bg transition hover:bg-primary hover:text-dark dark:bg-primary"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
