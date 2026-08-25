import { vehicles } from "../lib/mock/vehicles"
import VehicleGrid from "../components/vehicle/VehicleGrid"

export default function Vehicles() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold">Vehicle Explorer</h1>
      <p className="mt-2 text-white/50">Search and filter by make, model, generation, year, body type and more.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {["Manufacturer", "Body Type", "Fuel", "Transmission", "Price Range", "New/Used"].map((f) => (
          <button key={f} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/60 hover:bg-white/5">
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <VehicleGrid vehicles={vehicles} />
      </div>
    </div>
  )
}
