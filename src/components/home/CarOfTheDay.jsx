import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { carOfTheDay } from "../../lib/mock/vehicles"
import Reveal from "../ui/Reveal"

export default function CarOfTheDay() {
  const c = carOfTheDay
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <Reveal>
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent">Car of the Day</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-2">
          <div className="h-64 w-full overflow-hidden md:h-full">
            <motion.img
              src={c.image}
              alt={c.model}
              className="h-full w-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
          <div className="flex flex-col justify-center p-8">
            <h3 className="text-3xl font-bold">{c.make} {c.model}</h3>
            <p className="mt-1 text-white/50">{c.generation} · {c.year}</p>
            <p className="mt-4 text-white/70">{c.description}</p>
            <p className="mt-4 rounded-lg bg-white/5 p-3 text-sm text-white/60">💡 {c.fact}</p>
            <Link to={`/vehicles/${c.slug}`} className="mt-6 inline-block w-fit rounded-full bg-accent px-6 py-2.5 text-sm font-semibold">
              Explore
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
