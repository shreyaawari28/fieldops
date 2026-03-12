import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const THEME_STORAGE_KEY = 'cfm-is-dark'

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const storedValue = localStorage.getItem(THEME_STORAGE_KEY)
    return storedValue ? JSON.parse(storedValue) : true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark))
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((current) => !current)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
