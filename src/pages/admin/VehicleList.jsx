import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllVehiclesAdmin, deleteVehicle } from "../../lib/queries/adminVehicles"

export default function AdminVehicleList() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const data = await getAllVehiclesAdmin()
    setVehicles(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!confirm("Delete this vehicle?")) return
    await deleteVehicle(id)
    load()
  }

  if (loading) return <p className="text-white/50">Loading…</p>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vehicles</h1>
        <Link to="/admin/vehicles/new" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold">
          + Add Vehicle
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-white/50">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Model</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Year</th>
              <th className="p-3">Published</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-white/10">
                <td className="p-3">
                  <img src={v.image_url} alt={v.model_name} className="h-12 w-16 rounded object-cover" />
                </td>
                <td className="p-3">{v.model_name}</td>
                <td className="p-3 text-white/60">{v.manufacturers?.name}</td>
                <td className="p-3 text-white/60">{v.year_range}</td>
                <td className="p-3">{v.is_published ? "Yes" : "No"}</td>
                <td className="p-3 text-right">
                  <Link to={`/admin/vehicles/${v.id}`} className="mr-3 text-accent hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(v.id)} className="text-white/40 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}