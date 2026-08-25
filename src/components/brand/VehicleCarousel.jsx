import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function VehicleCarousel({ vehicles, activeId, onSelect }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelectState = useCallback(() => {
    if (!emblaApi) return
    const idx = emblaApi.selectedScrollSnap()
    setSelectedIndex(idx)
    onSelect(vehicles[idx]?.id)
  }, [emblaApi, vehicles, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    onSelectState()
    emblaApi.on("select", onSelectState)
    emblaApi.on("reInit", onSelectState)
  }, [emblaApi, onSelectState])

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden py-6" ref={emblaRef}>
        <div className="flex items-center">
          {vehicles.map((v, i) => {
            const isActive = i === selectedIndex
            const distance = Math.abs(i - selectedIndex)

            return (
              <div key={v.id} className="flex-none basis-[75%] px-3 sm:basis-[45%] lg:basis-[32%]">
                <button
                  onClick={() => scrollTo(i)}
                  className="block w-full text-left transition-all duration-500 ease-out"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(0.85)",
                    opacity: isActive ? 1 : Math.max(0.25, 1 - distance * 0.4),
                  }}
                >
                  <div
                    className={`overflow-hidden rounded-xl border ${
                      isActive ? "border-accent shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]" : "border-white/10"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-wide text-white/40">{v.year}</p>
                      <h3 className="mt-1 font-semibold">{v.name}</h3>
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/80 p-2 backdrop-blur sm:-left-4"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/80 p-2 backdrop-blur sm:-right-4"
      >
        <ChevronRight size={18} />
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {vehicles.map((v, i) => (
          <button
            key={v.id}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === selectedIndex ? "w-6 bg-accent" : "w-1.5 bg-white/20"
            }`}
            aria-label={`Go to ${v.name}`}
          />
        ))}
      </div>
    </div>
  )
}