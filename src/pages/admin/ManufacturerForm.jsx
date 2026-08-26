import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getManufacturerById, createManufacturer, updateManufacturer } from "../../lib/queries/adminManufacturers"
import ImageUploadField from "./ImageUploadField"

const emptyForm = { slug: "", name: "", country: "", founded_year: "", logo_url: "" }

export default function AdminManufacturerForm() {
  const { id } = useParams()
  const isEditing = !!id
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) getManufacturerById(id).then((m) => setForm({ ...emptyForm, ...m }))
  }, [id, isEditing])

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, founded_year: form.founded_year ? Number(form.founded_year) : null }
      if (isEditing) await updateManufacturer(id, payload)
      else await createManufacturer(payload)
      navigate("/admin/brands")
    } catch (err) {
      alert("Error saving brand: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
  const labelClass = "mb-1 block text-sm text-white/60"

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">{isEditing ? "Edit Brand" : "Add Brand"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange} required placeholder="land-rover" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Country</label>
            <input name="country" value={form.country} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Founded Year</label>
            <input name="founded_year" type="number" value={form.founded_year} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <ImageUploadField
  label="Brand Logo"
  value={form.logo_url}
  onChange={(url) => setForm((f) => ({ ...f, logo_url: url }))}
  folder="brands"
/>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-navy disabled:opacity-50">
            {saving ? "Saving…" : isEditing ? "Save Changes" : "Add Brand"}
          </button>
          <button type="button" onClick={() => navigate("/admin/brands")} className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold hover:bg-white/10">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}