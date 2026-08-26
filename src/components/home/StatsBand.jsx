import Reveal from "../ui/Reveal"

export default function StatsBand() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-14">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-2xl font-bold sm:text-3xl">
          Built in Kenya. <span className="gradient-signature-text">Growing across East Africa.</span>
        </p>
        <p className="mt-3 text-white/50">
          Automotive media, vehicle discovery, and marketplace — starting here, built to grow.
        </p>
      </Reveal>
    </section>
  )
}