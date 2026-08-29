import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllVehiclesAdmin, deleteVehicle } from "../../lib/queries/adminVehicles"

const FILTERS = [
  { key: "all", label: "All Vehicles" },
  { key: "featured", label: "Featured" },
  { key: "car_of_the_day", label: "Car of the Day" },
  { key: "for_sale", label: "For Sale" },
  { key: "evolution", label: "In Evolution" },
  { key: "no_group", label: "Not in Evolution" },
  { key: "unpublished", label: "Unpublished" },
]

export default function AdminVehicleList() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

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

  const counts = {
    all: vehicles.length,
    featured: vehicles.filter((v) => v.is_featured).length,
    car_of_the_day: vehicles.filter((v) => v.is_car_of_the_day).length,
    for_sale: vehicles.filter((v) => v.is_for_sale).length,
    evolution: vehicles.filter((v) => v.evolution_group).length,
    no_group: vehicles.filter((v) => !v.evolution_group).length,
    unpublished: vehicles.filter((v) => !v.is_published).length,
  }

  const filtered = vehicles.filter((v) => {
    if (filter === "featured") return v.is_featured
    if (filter === "car_of_the_day") return v.is_car_of_the_day
    if (filter === "for_sale") return v.is_for_sale
    if (filter === "evolution") return !!v.evolution_group
    if (filter === "no_group") return !v.evolution_group
    if (filter === "unpublished") return !v.is_published
    return true
  })

  if (loading) return <p className="text-white/50">Loading…</p>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vehicles</h1>
        <Link to="/admin/vehicles/new" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-navy">
          + Add Vehicle
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/15 text-white/50 hover:bg-white/5"
            }`}
          >
            {f.label} <span className="opacity-60">({counts[f.key]})</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-white/50">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Model</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Year</th>
              <th className="p-3">Tags</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-t border-white/10">
                <td className="p-3">
                  <img src={v.image_url} alt={v.model_name} className="h-12 w-16 rounded object-cover" />
                </td>
                <td className="p-3">{v.model_name}</td>
                <td className="p-3 text-white/60">{v.manufacturers?.name}</td>
                <td className="p-3 text-white/60">{v.year_range}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {v.is_featured && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">Featured</span>}
                    {v.is_car_of_the_day && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">COTD</span>}
                    {v.is_for_sale && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">For Sale</span>}
                    {v.evolution_group && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">{v.evolution_group}</span>}
                    {!v.is_published && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] text-red-400">Unpublished</span>}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <Link to={`/admin/vehicles/${v.id}`} className="mr-3 text-accent hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(v.id)} className="text-white/40 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-white/40">No vehicles match this filter.</p>
      )}
    </div>
  )
}