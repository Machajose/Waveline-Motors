import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function VehicleCard({ vehicle }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.6)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-xl"
    >
      <Link
        to={`/vehicles/${vehicle.slug}`}
        className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={vehicle.image}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-white/40">{vehicle.year} · {vehicle.condition}</p>
          <h3 className="mt-1 text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
          <p className="text-sm text-white/50">{vehicle.generation}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold text-accent">{vehicle.price}</span>
            <span className="text-xs text-white/40">{vehicle.horsepower}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
