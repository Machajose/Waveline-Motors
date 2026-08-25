import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
      navigate("/admin")
    } catch (err) {
      setError("Invalid email or password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-xl font-bold">Waveline Admin</h1>
        <p className="mt-1 text-sm text-white/50">Sign in to manage vehicles and content.</p>

        {error && <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/60">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-accent px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  )
}