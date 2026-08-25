import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=80')",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/60"
        >
          Kenya · East Africa · Global
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
        >
          THE WORLD OF MOTORS,<br />IN MOTION.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-white/60"
        >
          Automotive media, vehicle discovery and marketplace — built for people who love vehicles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/vehicles" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90">
            Explore Vehicles
          </Link>
          <Link to="/evolution" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10">
            Discover Automotive History
          </Link>
          <Link to="/for-sale" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10">
            Vehicles For Sale
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
