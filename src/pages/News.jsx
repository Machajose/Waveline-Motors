import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPublishedArticles } from "../lib/queries/articles"

export default function News() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPublishedArticles()
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="mx-auto max-w-7xl px-5 py-24 text-center text-white/50">Loading…</div>

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold">Automotive News</h1>
      {articles.length === 0 ? (
        <p className="mt-6 text-white/50">No articles published yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.id} to={`/news/${a.slug}`} className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <div className="aspect-video overflow-hidden">
                <img src={a.image_url} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-accent">{a.category}</p>
                <h3 className="mt-2 font-semibold leading-snug">{a.title}</h3>
                {a.excerpt && <p className="mt-2 text-sm text-white/50">{a.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}