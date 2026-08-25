import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { getVehicleBySlug } from "../lib/queries/vehicles"
import Reveal from "../components/ui/Reveal"

export default function VehicleDetail() {
  const { slug } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    getVehicleBySlug(slug)
      .then(setVehicle)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="mx-auto max-w-3xl px-5 py-24 text-center text-white/50">Loading…</div>
  }

  if (error || !vehicle) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-bold">Vehicle Not Found</h1>
        <p className="mt-3 text-white/50">This vehicle may have been removed or the link is incorrect.</p>
        <Link to="/vehicles" className="mt-6 inline-block text-accent hover:underline">← Back to Vehicle Explorer</Link>
      </div>
    )
  }

  const specs = [
    { label: "Price", value: vehicle.price },
    { label: "Horsepower", value: vehicle.horsepower },
    { label: "Body Type", value: vehicle.body_type },
    { label: "Fuel", value: vehicle.fuel },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Condition", value: vehicle.condition },
  ].filter((s) => s.value)

  return (
    <div>
      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        <motion.img
          src={vehicle.image_url}
          alt={vehicle.model_name}
          className="h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-5 pb-8">
          <div className="mx-auto max-w-5xl">
            {vehicle.manufacturers?.slug && (
              <Link
                to={`/brands/${vehicle.manufacturers.slug}`}
                className="text-sm font-medium uppercase tracking-wide text-accent hover:underline"
              >
                {vehicle.manufacturers.name}
              </Link>
            )}
            <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">{vehicle.model_name}</h1>
            <p className="mt-1 text-white/50">{vehicle.generation} · {vehicle.year_range}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-12">
        {vehicle.tagline && (
          <Reveal>
            <p className="text-lg text-white/70">{vehicle.tagline}</p>
          </Reveal>
        )}

        {specs.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-wide text-white/40">{s.label}</p>
                  <p className="mt-1 font-semibold gradient-signature-text">{s.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {vehicle.story_text && (
          <Reveal delay={0.15}>
            <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h2 className="text-xl font-semibold">The Story</h2>
              <p className="mt-3 leading-relaxed text-white/70">{vehicle.story_text}</p>
            </div>
          </Reveal>
        )}

        {vehicle.fact_text && (
          <Reveal delay={0.2}>
            <p className="mt-6 rounded-lg bg-white/5 p-4 text-sm text-white/60">💡 {vehicle.fact_text}</p>
          </Reveal>
        )}

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-4">
            {vehicle.manufacturers?.slug && (
              <Link
                to={`/brands/${vehicle.manufacturers.slug}`}
                className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                More {vehicle.manufacturers.name} Vehicles
              </Link>
            )}
            <Link
              to="/vehicles"
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 gradient-signature"
            >
              Browse All Vehicles
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}