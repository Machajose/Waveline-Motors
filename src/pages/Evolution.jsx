import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getEvolutionGroups } from "../lib/queries/vehicles"
import Reveal from "../components/ui/Reveal"

function formatGroupName(group) {
  return group.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Evolution() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvolutionGroups().then(setGroups).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="mx-auto max-w-6xl px-5 py-24 text-center text-white/50">Loading…</div>

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold">Vehicle Evolution</h1>
      <p className="mt-2 text-white/50">Pick a model to see how it has evolved across generations.</p>

      {groups.length === 0 ? (
        <p className="mt-12 text-center text-white/50">No evolution timelines added yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.08}>
              <Link
                to={`/evolution/${g.group}`}
                className="block rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
              >
                <p className="text-xs uppercase tracking-wide text-accent">{g.brand}</p>
                <h3 className="mt-1 text-xl font-semibold">{formatGroupName(g.group)}</h3>
                <p className="mt-2 text-sm text-white/50">View full generation timeline →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}