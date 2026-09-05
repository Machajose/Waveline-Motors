import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function DiscoverMore({ vehicle }) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => setExpanded(false), [vehicle?.id])

  if (!vehicle) return null

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="grid gap-6 p-6 sm:grid-cols-[220px_1fr] sm:p-8">
        <img src={vehicle.image} alt={vehicle.name} className="h-40 w-full rounded-lg object-cover sm:h-full" />
        <div>
          <p className="text-xs uppercase tracking-wide text-accent">{vehicle.year}</p>
          <h3 className="mt-1 text-2xl font-bold">{vehicle.name}</h3>
          <p className="mt-2 text-white/60">{vehicle.tagline}</p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="mt-4 whitespace-pre-line leading-relaxed text-white/70">{vehicle.story}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {vehicle.evolution_group && !vehicle.is_for_sale && (
            <Link
              to={`/evolution/${vehicle.evolution_group}`}
              className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-accent/40"
            >
              <span className="text-sm">
                <span className="font-semibold gradient-signature-text">Explore Its Evolution →</span>
                <span className="ml-2 text-white/50">See how the {vehicle.name} has changed over the years.</span>
              </span>
            </Link>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              {expanded ? "Show Less" : "Discover More"}
            </button>
            <Link to={`/vehicles/${vehicle.slug}`} className="text-sm font-medium text-accent hover:underline">
              View Full Vehicle Page →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}