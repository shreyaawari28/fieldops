import { Moon, SunMedium } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="touch-target inline-flex items-center gap-2 rounded-full border border-accent bg-white px-4 py-2 text-sm font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#444444] dark:bg-[#2C2C2C] dark:text-gray-100"
      aria-label="Toggle theme"
    >
      {isDark ? <SunMedium size={16} /> : <Moon size={16} />}
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}

export default ThemeToggle
