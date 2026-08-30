import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, useScroll } from "framer-motion"
import { useRef } from "react"
import { getVehiclesByEvolutionGroup } from "../lib/queries/vehicles"
import Reveal from "../components/ui/Reveal"

function formatGroupName(group) {
  return group.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function EvolutionTimeline() {
  const { group } = useParams()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.8", "end 0.6"] })

  useEffect(() => {
    setLoading(true)
    getVehiclesByEvolutionGroup(group).then(setVehicles).finally(() => setLoading(false))
  }, [group])

  if (loading) return <div className="mx-auto max-w-6xl px-5 py-24 text-center text-white/50">Loading…</div>

  if (vehicles.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-bold">No Timeline Found</h1>
        <Link to="/evolution" className="mt-4 inline-block text-accent hover:underline">← Back to Evolution</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs uppercase tracking-wide text-accent">{vehicles[0].manufacturers?.name}</p>
      <h1 className="mt-1 text-3xl font-bold">{formatGroupName(group)}</h1>
      <p className="mt-2 text-white/50">
        {vehicles[0].year_range?.split("–")[0] || vehicles[0].year_range} → present
      </p>

      <div ref={containerRef} className="relative mt-12 space-y-10 pl-8">
        <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-accent"
          style={{ scaleY: scrollYProgress, height: "100%" }}
        />

        {vehicles.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.05} y={30}>
            <div className="relative">
              <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-accent" />
              <div className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[200px_1fr]">
                <img src={v.image_url} alt={v.model_name} className="h-32 w-full rounded-lg object-cover sm:h-full" />
                <div>
                  <h3 className="text-xl font-bold">{v.generation || v.model_name}</h3>
                  <p className="text-sm text-white/40">{v.year_range}</p>
                  <p className="mt-2 text-white/70">{v.tagline || v.story_text}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}