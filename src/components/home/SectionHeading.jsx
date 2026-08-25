import { Link } from "react-router-dom"

export default function SectionHeading({ title, subtitle, ctaLabel, ctaTo }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
      </div>
      {ctaTo && (
        <Link to={ctaTo} className="whitespace-nowrap text-sm font-medium text-accent hover:underline">
          {ctaLabel || "View all →"}
        </Link>
      )}
    </div>
  )
}
