import { motion, useScroll } from "framer-motion"
import { useRef } from "react"
import { landCruiserEvolution } from "../lib/mock/evolution"
import Reveal from "../components/ui/Reveal"

export default function Evolution() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  })

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold">Vehicle Evolution</h1>
      <p className="mt-2 text-white/50">Toyota Land Cruiser — 1951 → present</p>

      <div ref={containerRef} className="relative mt-12 space-y-10 pl-8">
        {/* Static track */}
        <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
        {/* Animated draw-in line, grows with scroll progress */}
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-accent"
          style={{ scaleY: scrollYProgress, height: "100%" }}
        />

        {landCruiserEvolution.map((g, i) => (
          <Reveal key={g.gen} delay={i * 0.05} y={30}>
            <div className="relative">
              <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-accent" />
              <div className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[200px_1fr]">
                <img src={g.image} alt={g.gen} className="h-32 w-full rounded-lg object-cover sm:h-full" />
                <div>
                  <h3 className="text-xl font-bold">{g.gen}</h3>
                  <p className="text-sm text-white/40">{g.years}</p>
                  <p className="mt-2 text-white/70">{g.summary}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
