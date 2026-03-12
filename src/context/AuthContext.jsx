import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'cfm-auth-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = async ({ email, name = 'Site Engineer', role = 'Field Manager' }) => {
    const nextUser = {
      id: 'site-engineer-01',
      name,
      email,
      role,
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return nextUser
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
