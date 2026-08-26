import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { getArticleBySlug } from "../lib/queries/articles"
import Reveal from "../components/ui/Reveal"

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    getArticleBySlug(slug)
      .then(setArticle)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="mx-auto max-w-3xl px-5 py-24 text-center text-white/50">Loading…</div>
  }

  if (error || !article) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
        <p className="mt-3 text-white/50">This article may have been removed or the link is incorrect.</p>
        <Link to="/news" className="mt-6 inline-block text-accent hover:underline">← Back to News</Link>
      </div>
    )
  }

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <motion.img
          src={article.image_url}
          alt={article.title}
          className="h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-5 pb-8">
          <div className="mx-auto max-w-3xl">
            {article.category && (
              <span className="text-sm font-medium uppercase tracking-wide gradient-signature-text">
                {article.category}
              </span>
            )}
            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{article.title}</h1>
            <p className="mt-2 text-sm text-white/50">
              {article.author && `${article.author} · `}
              {new Date(article.created_at).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-12">
        {article.excerpt && (
          <Reveal>
            <p className="text-lg text-white/70">{article.excerpt}</p>
          </Reveal>
        )}

        {article.content && (
          <Reveal delay={0.1}>
            <div className="mt-6 whitespace-pre-line leading-relaxed text-white/80">
              {article.content}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-8">
            <Link
              to="/news"
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 gradient-signature"
            >
              Browse All News
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}