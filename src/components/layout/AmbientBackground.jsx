import { motion } from "framer-motion"

/**
 * Slow-drifting blurred gradient blobs, sits behind all page content.
 * Uses brand colors at low opacity — adds color/depth without competing with text.
 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent opacity-[0.07] blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-[450px] w-[450px] rounded-full bg-magenta opacity-[0.06] blur-[130px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-gold opacity-[0.05] blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}