import { useEffect, useState } from "react"
import { getAllVehicles } from "../lib/queries/vehicles"
import { getAllManufacturers } from "../lib/queries/manufacturers"
import VehicleGrid from "../components/vehicle/VehicleGrid"

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [loading, setLoading] = useState(true)

  const [manufacturerFilter, setManufacturerFilter] = useState("")
  const [bodyTypeFilter, setBodyTypeFilter] = useState("")
  const [conditionFilter, setConditionFilter] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const [v, m] = await Promise.all([getAllVehicles(), getAllManufacturers()])
        setVehicles(v)
        setManufacturers(m)
      } catch (err) {
        console.error("Error loading vehicles:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const bodyTypes = [...new Set(vehicles.map((v) => v.body_type).filter(Boolean))]
  const conditions = [...new Set(vehicles.map((v) => v.condition).filter(Boolean))]

  const filtered = vehicles.filter((v) => {
    if (manufacturerFilter && v.manufacturers?.slug !== manufacturerFilter) return false
    if (bodyTypeFilter && v.body_type !== bodyTypeFilter) return false
    if (conditionFilter && v.condition !== conditionFilter) return false
    return true
  })

  const mappedVehicles = filtered.map((v) => ({
    id: v.id, slug: v.slug, make: v.manufacturers?.name, model: v.model_name,
    generation: v.generation, year: v.year_range, image: v.image_url,
    price: v.price, horsepower: v.horsepower, condition: v.condition,
  }))

  function clearFilters() {
    setManufacturerFilter("")
    setBodyTypeFilter("")
    setConditionFilter("")
  }

  const hasActiveFilters = manufacturerFilter || bodyTypeFilter || conditionFilter

  if (loading) {
    return <div className="mx-auto max-w-7xl px-5 py-24 text-center text-white/50">Loading…</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold">Vehicle Explorer</h1>
      <p className="mt-2 text-white/50">Search and filter by make, body type and condition.</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <select
          value={manufacturerFilter}
          onChange={(e) => setManufacturerFilter(e.target.value)}
          className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="">All Manufacturers</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.slug}>{m.name}</option>
          ))}
        </select>

        {bodyTypes.length > 0 && (
          <select
            value={bodyTypeFilter}
            onChange={(e) => setBodyTypeFilter(e.target.value)}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="">All Body Types</option>
            {bodyTypes.map((bt) => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        )}

        {conditions.length > 0 && (
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="">New / Used</option>
            {conditions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-white/40 hover:text-white/70">
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-white/40">
        {mappedVehicles.length} vehicle{mappedVehicles.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-6">
        {mappedVehicles.length === 0 ? (
          <p className="py-12 text-center text-white/50">No vehicles match these filters.</p>
        ) : (
          <VehicleGrid vehicles={mappedVehicles} />
        )}
      </div>
    </div>
  )
}