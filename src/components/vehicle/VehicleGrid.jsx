import VehicleCard from "./VehicleCard"
import Reveal from "../ui/Reveal"

export default function VehicleGrid({ vehicles }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {vehicles.map((v, i) => (
        <Reveal key={v.id} delay={i * 0.08}>
          <VehicleCard vehicle={v} />
        </Reveal>
      ))}
    </div>
  )
}
