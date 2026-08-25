import Hero from "../components/home/Hero"
import SectionHeading from "../components/home/SectionHeading"
import CarOfTheDay from "../components/home/CarOfTheDay"
import StatsBand from "../components/home/StatsBand"
import VehicleGrid from "../components/vehicle/VehicleGrid"
import Reveal from "../components/ui/Reveal"
import { vehicles } from "../lib/mock/vehicles"
import { brands } from "../lib/mock/brands"
import { articles } from "../lib/mock/articles"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <Hero />

      <StatsBand />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <Reveal>
          <SectionHeading title="Featured Vehicles" ctaTo="/vehicles" />
        </Reveal>
        <VehicleGrid vehicles={vehicles} />
      </section>

      <CarOfTheDay />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <Reveal>
          <SectionHeading title="Automotive Brands" ctaTo="/brands" />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08}>
              <Link
                to={`/brands/${b.slug}`}
                className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25"
              >
                <img src={b.logo} alt={b.name} className="h-10 w-auto opacity-80 invert" />
                <span className="mt-3 text-sm text-white/60">{b.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <Reveal>
          <SectionHeading title="Latest Automotive News" ctaTo="/news" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.1}>
              <Link to={`/news/${a.slug}`} className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="aspect-video overflow-hidden">
                  <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-accent">{a.category}</p>
                  <h3 className="mt-2 font-semibold leading-snug">{a.title}</h3>
                  <p className="mt-2 text-xs text-white/40">{a.date}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] py-16">
        <Reveal className="mx-auto max-w-7xl px-5 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Partner With Waveline Motors</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/50">
            Featured placements, dealership pages, and automotive marketing packages for your business.
          </p>
          <Link
  to="/partner-with-us"
  className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 gradient-signature"
>
  Partner With Us
</Link>
        </Reveal>
      </section>
    </div>
  )
}
