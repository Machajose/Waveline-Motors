import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-white/50">Loading…</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}