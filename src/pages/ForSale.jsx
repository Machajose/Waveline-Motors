import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getVehiclesForSale } from "../lib/queries/vehicles"
import Reveal from "../components/ui/Reveal"

const inputClass = "rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"

function optionsFor(vehicles, field) {
  return [...new Set(vehicles.map((vehicle) => vehicle[field]).filter((value) => value !== null && value !== undefined && value !== ""))]
    .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
}

export default function ForSale() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [search, setSearch] = useState("")
  const [listingStatus, setListingStatus] = useState("available")
  const [bodyType, setBodyType] = useState("")
  const [year, setYear] = useState("")
  const [origin, setOrigin] = useState("")
  const [interiorColor, setInteriorColor] = useState("")
  const [exteriorColor, setExteriorColor] = useState("")
  const [engineCapacity, setEngineCapacity] = useState("")
  const [horsepower, setHorsepower] = useState("")

  useEffect(() => {
    getVehiclesForSale()
      .then(setVehicles)
      .catch((error) => {
        console.error("Could not load sale listings:", error)
        setLoadError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  const statusVehicles = useMemo(() => vehicles.filter((vehicle) => {
    if (listingStatus === "available") return !vehicle.is_sold
    if (listingStatus === "sold") return vehicle.is_sold
    return true
  }), [vehicles, listingStatus])

  const filteredVehicles = useMemo(() => {
    const term = search.trim().toLowerCase()
    return statusVehicles.filter((vehicle) => {
      const searchable = [
        vehicle.manufacturers?.name,
        vehicle.model_name,
        vehicle.generation,
        vehicle.manufacture_year,
        vehicle.year_range,
        vehicle.body_type,
        vehicle.engine_capacity_cc,
        vehicle.horsepower,
        vehicle.mileage,
        vehicle.interior_color,
        vehicle.exterior_color,
        vehicle.vehicle_origin,
        vehicle.location,
      ].filter(Boolean).join(" ").toLowerCase()

      return (!term || searchable.includes(term)) &&
        (!bodyType || vehicle.body_type === bodyType) &&
        (!year || String(vehicle.manufacture_year) === year) &&
        (!origin || vehicle.vehicle_origin === origin) &&
        (!interiorColor || vehicle.interior_color === interiorColor) &&
        (!exteriorColor || vehicle.exterior_color === exteriorColor) &&
        (!engineCapacity || String(vehicle.engine_capacity_cc) === engineCapacity) &&
        (!horsepower || vehicle.horsepower === horsepower)
    })
  }, [statusVehicles, search, bodyType, year, origin, interiorColor, exteriorColor, engineCapacity, horsepower])

  function clearFilters() {
    setSearch("")
    setBodyType("")
    setYear("")
    setOrigin("")
    setInteriorColor("")
    setExteriorColor("")
    setEngineCapacity("")
    setHorsepower("")
  }

  if (loading) return <div className="mx-auto max-w-7xl px-5 py-24 text-center text-white/50">Loading…</div>

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold">Vehicles For Sale</h1>
      <p className="mt-2 text-white/50">Browse vehicles currently available through Waveline Motors.</p>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Listing status">
        {[
          { value: "available", label: "Available" },
          { value: "sold", label: "Sold" },
          { value: "all", label: "All listings" },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={listingStatus === tab.value}
            onClick={() => setListingStatus(tab.value)}
            className={`rounded-full border px-4 py-2 text-sm ${listingStatus === tab.value ? "border-accent text-accent" : "border-white/15 text-white/60 hover:bg-white/5"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search make, model, year, specs…"
          aria-label="Search vehicle listings"
          className={`${inputClass} sm:col-span-2 lg:col-span-3`}
        />
        <select value={bodyType} onChange={(event) => setBodyType(event.target.value)} className={inputClass} aria-label="Filter by car type">
          <option value="">All car types</option>
          {optionsFor(vehicles, "body_type").map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select value={year} onChange={(event) => setYear(event.target.value)} className={inputClass} aria-label="Filter by year of manufacture">
          <option value="">All manufacture years</option>
          {optionsFor(vehicles, "manufacture_year").map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select value={origin} onChange={(event) => setOrigin(event.target.value)} className={inputClass} aria-label="Filter by vehicle origin">
          <option value="">Local or imported</option>
          <option value="local">Local</option>
          <option value="imported">Imported</option>
        </select>
        <select value={exteriorColor} onChange={(event) => setExteriorColor(event.target.value)} className={inputClass} aria-label="Filter by exterior colour">
          <option value="">Any exterior colour</option>
          {optionsFor(vehicles, "exterior_color").map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select value={interiorColor} onChange={(event) => setInteriorColor(event.target.value)} className={inputClass} aria-label="Filter by interior colour">
          <option value="">Any interior colour</option>
          {optionsFor(vehicles, "interior_color").map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select value={engineCapacity} onChange={(event) => setEngineCapacity(event.target.value)} className={inputClass} aria-label="Filter by engine capacity">
          <option value="">Any engine capacity</option>
          {optionsFor(vehicles, "engine_capacity_cc").map((value) => <option key={value} value={value}>{Number(value).toLocaleString()} cc</option>)}
        </select>
        <select value={horsepower} onChange={(event) => setHorsepower(event.target.value)} className={inputClass} aria-label="Filter by horsepower">
          <option value="">Any horsepower</option>
          {optionsFor(vehicles, "horsepower").map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <button type="button" onClick={clearFilters} className="text-left text-sm text-white/50 hover:text-white">
          Clear search and filters
        </button>
      </div>

      <p className="mt-5 text-sm text-white/40">{filteredVehicles.length} listing{filteredVehicles.length === 1 ? "" : "s"} found</p>

      {loadError ? (
        <p className="mt-8 text-center text-white/50">Listings could not be loaded. Please try again later.</p>
      ) : filteredVehicles.length === 0 ? (
        <p className="mt-8 text-center text-white/50">
          {listingStatus === "sold" ? "No sold vehicles to show yet." : "No listings match those search filters."}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle, index) => (
            <Reveal key={vehicle.id} delay={index * 0.06}>
              <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={vehicle.image_url} alt={vehicle.model_name} className="h-full w-full object-cover" />
                  {vehicle.is_sold && <span className="absolute left-3 top-3 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold uppercase text-white">Sold</span>}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      {vehicle.manufacturers?.name} · {vehicle.manufacture_year || vehicle.year_range}
                    </p>
                    {vehicle.featured_by && <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase text-white gradient-signature">Sponsored</span>}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold">{vehicle.model_name}</h2>
                  {vehicle.featured_by && <p className="mt-0.5 text-xs text-white/40">Listed by {vehicle.featured_by}</p>}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                    {vehicle.body_type && <span>{vehicle.body_type}</span>}
                    {vehicle.engine_capacity_cc && <span>{vehicle.engine_capacity_cc.toLocaleString()} cc</span>}
                    {vehicle.horsepower && <span>{vehicle.horsepower}</span>}
                    {vehicle.mileage && <span>Odometer: {vehicle.mileage}</span>}
                    {vehicle.exterior_color && <span>Exterior: {vehicle.exterior_color}</span>}
                    {vehicle.interior_color && <span>Interior: {vehicle.interior_color}</span>}
                    {vehicle.vehicle_origin && <span>{vehicle.vehicle_origin === "local" ? "Local" : "Imported"}</span>}
                    {vehicle.location && <span>{vehicle.location}</span>}
                    {vehicle.fuel && <span>{vehicle.fuel}</span>}
                    {vehicle.transmission && <span>{vehicle.transmission}</span>}
                  </div>
                  <div className="mt-3 font-semibold gradient-signature-text">{vehicle.price}</div>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/vehicles/${vehicle.slug}`} className="flex-1 rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold hover:bg-white/10">
                      View Details
                    </Link>
                    {!vehicle.is_sold && vehicle.whatsapp_number && (
                      <a href={`https://wa.me/${vehicle.whatsapp_number.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-white gradient-signature">
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-12">
        <h2 className="text-xl font-bold sm:text-2xl">Didn’t find what you’re looking for?</h2>
        <p className="mx-auto mt-2 max-w-md text-white/50">Reach out and let us know what vehicle you’re after — we’ll help you find it.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a href="https://wa.me/254115265702" target="_blank" rel="noopener noreferrer" className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 gradient-signature">Chat on WhatsApp</a>
          <Link to="/contact" className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold hover:bg-white/10">Send a Message</Link>
        </div>
      </div>
    </div>
  )
}
