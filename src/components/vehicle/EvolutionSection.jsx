import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Link } from "react-router-dom"
import Reveal from "../ui/Reveal"

export default function EvolutionSection({ vehicles }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.8", "end 0.6"] })

  if (!vehicles || vehicles.length === 0) return null

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest gradient-signature-text">Evolution</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">How This Model Has Changed</h2>
      </Reveal>

      <div ref={containerRef} className="relative mt-10 space-y-8 pl-8">
        <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-accent"
          style={{ scaleY: scrollYProgress, height: "100%" }}
        />

        {vehicles.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.05} y={24}>
            <div className="relative">
              <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-accent" />
              <div className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[180px_1fr]">
                <img src={v.image_url} alt={v.model_name} className="h-32 w-full rounded-lg object-cover sm:h-full" />
                <div>
                  <h3 className="text-lg font-bold">{v.generation || v.model_name}</h3>
                  <p className="text-sm text-white/40">{v.year_range}</p>

                  {v.tagline && (
  <p className="mt-2 line-clamp-3 whitespace-pre-line text-white/70">{v.tagline}</p>
)}
                  <Link
                    to={`/vehicles/${v.slug}`}
                    className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}