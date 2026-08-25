import { useEffect, useState } from "react"
import Hero from "../components/home/Hero"
import SectionHeading from "../components/home/SectionHeading"
import CarOfTheDay from "../components/home/CarOfTheDay"
import StatsBand from "../components/home/StatsBand"
import VehicleGrid from "../components/vehicle/VehicleGrid"
import Reveal from "../components/ui/Reveal"
import { getFeaturedVehicles, getCarOfTheDay } from "../lib/queries/vehicles"
import { getAllManufacturers } from "../lib/queries/manufacturers"
import { getLatestArticles } from "../lib/queries/articles"
import { Link } from "react-router-dom"

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState([])
  const [carOfTheDay, setCarOfTheDay] = useState(null)
  const [brands, setBrands] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [fv, cotd, br, ar] = await Promise.all([
          getFeaturedVehicles(),
          getCarOfTheDay(),
          getAllManufacturers(),
          getLatestArticles(3),
        ])
        setFeaturedVehicles(fv)
        setCarOfTheDay(cotd)
        setBrands(br)
        setArticles(ar)
      } catch (err) {
        console.error("Error loading homepage data:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <Hero />

      <StatsBand />

      {featuredVehicles.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <SectionHeading title="Featured Vehicles" ctaTo="/vehicles" />
          </Reveal>
          <VehicleGrid
            vehicles={featuredVehicles.map((v) => ({
              id: v.id, slug: v.slug, make: v.manufacturers?.name, model: v.model_name,
              generation: v.generation, year: v.year_range, image: v.image_url,
              price: v.price, horsepower: v.horsepower, condition: v.condition,
            }))}
          />
        </section>
      )}

      {carOfTheDay && (
        <CarOfTheDay
          vehicle={{
            slug: carOfTheDay.slug,
            make: carOfTheDay.manufacturers?.name,
            model: carOfTheDay.model_name,
            generation: carOfTheDay.generation,
            year: carOfTheDay.year_range,
            image: carOfTheDay.image_url,
            description: carOfTheDay.story_text,
            fact: carOfTheDay.fact_text,
          }}
        />
      )}

      {brands.length > 0 && (
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
                  <img src={b.logo_url} alt={b.name} className="h-10 w-auto opacity-80 invert" />
                  <span className="mt-3 text-sm text-white/60">{b.name}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <SectionHeading title="Latest Automotive News" ctaTo="/news" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.1}>
                <Link to={`/news/${a.slug}`} className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="aspect-video overflow-hidden">
                    <img src={a.image_url} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-accent">{a.category}</p>
                    <h3 className="mt-2 font-semibold leading-snug">{a.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

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