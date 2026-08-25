import { Link } from "react-router-dom"
import { articles } from "../lib/mock/articles"

export default function News() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold">Automotive News</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {articles.map((a) => (
          <Link key={a.id} to={`/news/${a.slug}`} className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="aspect-video overflow-hidden">
              <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-accent">{a.category}</p>
              <h3 className="mt-2 font-semibold leading-snug">{a.title}</h3>
              <p className="mt-2 text-xs text-white/40">{a.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
