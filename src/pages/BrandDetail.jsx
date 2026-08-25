import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getManufacturerBySlug } from "../lib/queries/manufacturers"
import { getVehiclesByManufacturerSlug } from "../lib/queries/vehicles"
import VehicleCarousel from "../components/brand/VehicleCarousel"
import DiscoverMore from "../components/brand/DiscoverMore"
import Reveal from "../components/ui/Reveal"

export default function BrandDetail() {
  const { slug } = useParams()
  const [brand, setBrand] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [brandData, vehicleData] = await Promise.all([
          getManufacturerBySlug(slug),
          getVehiclesByManufacturerSlug(slug),
        ])
        setBrand(brandData)
        setVehicles(vehicleData)
        setActiveId(vehicleData[0]?.id)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  const activeVehicle = vehicles.find((v) => v.id === activeId) || vehicles[0]

  if (loading) {
    return <div className="mx-auto max-w-3xl px-5 py-24 text-center text-white/50">Loading…</div>
  }

  if (!brand) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-bold">Brand Not Found</h1>
        <Link to="/brands" className="mt-4 inline-block text-accent hover:underline">← Back to Brands</Link>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <img src={brand.logo_url} alt={brand.name} className="mx-auto h-14 w-auto opacity-90 invert" />
          <h1 className="mt-6 text-4xl font-extrabold">{brand.name}</h1>
          <p className="mt-2 text-white/50">{brand.country} · Founded {brand.founded_year}</p>
        </div>
      </section>

      {vehicles.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <h2 className="text-2xl font-bold sm:text-3xl">{brand.name} Vehicles</h2>
            <p className="mt-2 text-white/50">Browse the lineup, then discover the story behind each model.</p>
          </Reveal>

          <div className="mt-8">
            <VehicleCarousel
              vehicles={vehicles.map(v => ({ ...v, name: v.model_name, year: v.year_range, image: v.image_url }))}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>

          <DiscoverMore
            vehicle={activeVehicle && {
              ...activeVehicle,
              name: activeVehicle.model_name,
              year: activeVehicle.year_range,
              image: activeVehicle.image_url,
              story: activeVehicle.story_text,
            }}
          />
        </section>
      )}
    </div>
  )
}