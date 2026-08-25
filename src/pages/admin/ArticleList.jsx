import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllArticlesAdmin, deleteArticle } from "../../lib/queries/adminArticles"

export default function AdminArticleList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    setArticles(await getAllArticlesAdmin())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!confirm("Delete this article?")) return
    await deleteArticle(id)
    load()
  }

  if (loading) return <p className="text-white/50">Loading…</p>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link to="/admin/articles/new" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-navy">
          + Add Article
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-white/50">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Published</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-t border-white/10">
                <td className="p-3"><img src={a.image_url} alt={a.title} className="h-12 w-16 rounded object-cover" /></td>
                <td className="p-3">{a.title}</td>
                <td className="p-3 text-white/60">{a.category}</td>
                <td className="p-3">{a.is_published ? "Yes" : "No"}</td>
                <td className="p-3 text-right">
                  <Link to={`/admin/articles/${a.id}`} className="mr-3 text-accent hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(a.id)} className="text-white/40 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}