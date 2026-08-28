import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getVehiclesForSale } from "../lib/queries/vehicles"
import Reveal from "../components/ui/Reveal"

export default function ForSale() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVehiclesForSale().then(setVehicles).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="mx-auto max-w-7xl px-5 py-24 text-center text-white/50">Loading…</div>

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold">Vehicles For Sale</h1>
      <p className="mt-2 text-white/50">Browse vehicles currently available through Waveline Motors.</p>

      {vehicles.length === 0 ? (
        <p className="mt-12 text-center text-white/50">No vehicles listed for sale right now — check back soon.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.08}>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={v.image_url} alt={v.model_name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-white/40">{v.manufacturers?.name} · {v.year_range}</p>
                  <h3 className="mt-1 text-lg font-semibold">{v.model_name}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                    {v.mileage && <span>{v.mileage}</span>}
                    {v.location && <span>{v.location}</span>}
                    {v.fuel && <span>{v.fuel}</span>}
                    {v.transmission && <span>{v.transmission}</span>}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold gradient-signature-text">{v.price}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/vehicles/${v.slug}`}
                      className="flex-1 rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold hover:bg-white/10"
                    >
                      View Details
                    </Link>
                    {v.whatsapp_number && (
                      
                        <a href={`https://wa.me/${v.whatsapp_number.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-white gradient-signature"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}