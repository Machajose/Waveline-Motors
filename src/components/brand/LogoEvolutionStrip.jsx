import { motion } from "framer-motion"

/**
 * logos: [{ year, image }]
 * Animates each logo in sequence (filmstrip effect) as the strip scrolls into view.
 */
export default function LogoEvolutionStrip({ logos = [] }) {
  return (
    <div className="scrollbar-none flex gap-6 overflow-x-auto pb-4">
      {logos.map((l, i) => (
        <motion.div
          key={l.year}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-40 flex-none flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-6"
        >
          <img src={l.image} alt={`Logo ${l.year}`} className="h-14 w-auto object-contain opacity-90 invert" />
          <span className="mt-4 text-sm text-white/50">{l.year}</span>
        </motion.div>
      ))}
    </div>
  )
}
