import { Link } from "react-router-dom"
import { brands } from "../lib/mock/brands"

export default function Brands() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold">Automotive Brands</h1>
      <p className="mt-2 text-white/50">Manufacturer directory — history, milestones, and vehicle timelines.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {brands.map((b) => (
          <Link key={b.id} to={`/brands/${b.slug}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center hover:border-white/25">
            <img src={b.logo} alt={b.name} className="mx-auto h-10 w-auto opacity-80 invert" />
            <p className="mt-3 font-semibold">{b.name}</p>
            <p className="text-xs text-white/40">{b.country} · {b.founded}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
