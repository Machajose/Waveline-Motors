import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate("/admin/login")
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 flex-none border-r border-white/10 bg-black p-5">
        <p className="mb-8 text-lg font-bold">Waveline Admin</p>
        <nav className="flex flex-col gap-2 text-sm">
          <NavLink to="/admin" end className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-accent" : "text-white/60 hover:bg-white/5"}`}>
            Vehicles
          </NavLink>
          <NavLink to="/admin/vehicles/new" className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-accent" : "text-white/60 hover:bg-white/5"}`}>
            Add Vehicle
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="mt-10 text-sm text-white/40 hover:text-white/70">
          Sign Out
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}