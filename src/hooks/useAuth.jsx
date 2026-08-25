import { createContext, useContext, useEffect, useState } from "react"
import { getSession, onAuthChange, signIn, signOut } from "../lib/queries/auth"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      setLoading(false)
    })
    const subscription = onAuthChange((s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const value = {
    session,
    loading,
    isAuthenticated: !!session,
    login: signIn,
    logout: signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}