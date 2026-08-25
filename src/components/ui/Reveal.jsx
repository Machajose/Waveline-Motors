import { motion } from "framer-motion"

/**
 * Wraps children and fades/slides them in once when scrolled into view.
 * Usage: <Reveal><VehicleCard .../></Reveal>
 * Or with stagger, wrap a list and pass `delay`.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
