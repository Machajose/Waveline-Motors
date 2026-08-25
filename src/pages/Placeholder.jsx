import LogoEvolutionStrip from "../components/brand/LogoEvolutionStrip"
import { toyotaLogoEvolution } from "../lib/mock/brands"
import Reveal from "../components/ui/Reveal"

export default function Placeholder({ title, showLogoDemo = false }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-24 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-white/50">This section is scaffolded — content coming in a later phase.</p>

      {showLogoDemo && (
        <div className="mt-16 text-left">
          <Reveal>
            <h2 className="mb-6 text-xl font-semibold">Logo Evolution — Toyota</h2>
          </Reveal>
          <LogoEvolutionStrip logos={toyotaLogoEvolution} />
        </div>
      )}
    </div>
  )
}
