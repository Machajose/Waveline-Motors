import StatCounter from "../ui/StatCounter"

const stats = [
  { value: 500, suffix: "+", label: "Vehicles Listed" },
  { value: 40, suffix: "+", label: "Partner Dealers" },
  { value: 25, suffix: "+", label: "Brands Covered" },
  { value: 120, suffix: "+", label: "Articles & Reviews" },
]

export default function StatsBand() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:grid-cols-4">
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  )
}
