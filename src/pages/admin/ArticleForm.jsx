import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArticleById, createArticle, updateArticle } from "../../lib/queries/adminArticles"
import ImageUploadField from "./ImageUploadField"

const emptyForm = {
  slug: "", title: "", category: "", excerpt: "", content: "",
  image_url: "", author: "", is_published: true,
}

export default function AdminArticleForm() {
  const { id } = useParams()
  const isEditing = !!id
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) getArticleById(id).then((a) => setForm({ ...emptyForm, ...a }))
  }, [id, isEditing])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (isEditing) await updateArticle(id, form)
      else await createArticle(form)
      navigate("/admin/articles")
    } catch (err) {
      alert("Error saving article: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
  const labelClass = "mb-1 block text-sm text-white/60"

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">{isEditing ? "Edit Article" : "Add Article"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange} required placeholder="ev-adoption-east-africa" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="EVs, Local News, Classic Cars…" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Author</label>
            <input name="author" value={form.author} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <ImageUploadField
  label="Article Image"
  value={form.image_url}
  onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
  folder="articles"
/>
        <div>
          <label className={labelClass}>Excerpt (short summary)</label>
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Full Content</label>
          <textarea name="content" value={form.content} onChange={handleChange} rows={8} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} />
          Published
        </label>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-navy disabled:opacity-50">
            {saving ? "Saving…" : isEditing ? "Save Changes" : "Add Article"}
          </button>
          <button type="button" onClick={() => navigate("/admin/articles")} className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold hover:bg-white/10">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}