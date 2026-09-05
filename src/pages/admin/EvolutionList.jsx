import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllVehiclesAdmin } from "../../lib/queries/adminVehicles"

function formatGroupName(group) {
  return group.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function AdminEvolutionList() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const vehicles = await getAllVehiclesAdmin()
    const map = new Map()
    vehicles.forEach((v) => {
      if (!v.evolution_group) return
      if (!map.has(v.evolution_group)) {
        map.set(v.evolution_group, { group: v.evolution_group, brand: v.manufacturers?.name, count: 0 })
      }
      map.get(v.evolution_group).count += 1
    })
    setGroups(Array.from(map.values()))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  if (loading) return <p className="text-white/50">Loading…</p>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Evolution Timelines</h1>
          <p className="mt-1 text-sm text-white/50">Each group below is a live timeline on the public Evolution page.</p>
        </div>
        <Link to="/admin/vehicles/new" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-navy">
          + Add Vehicle
        </Link>
      </div>

      {groups.length === 0 ? (
        <p className="text-white/50">No evolution timelines yet. Add a vehicle and set its Evolution Group field to create one.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <Link
              key={g.group}
              to={`/admin/evolution/${g.group}`}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40"
            >
              <p className="text-xs uppercase tracking-wide text-accent">{g.brand}</p>
              <h3 className="mt-1 text-lg font-semibold">{formatGroupName(g.group)}</h3>
              <p className="mt-2 text-sm text-white/50">{g.count} generation{g.count !== 1 ? "s" : ""}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}