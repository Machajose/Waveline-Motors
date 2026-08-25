import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import { getVehicleById, createVehicle, updateVehicle } from "../../lib/queries/adminVehicles"

const emptyForm = {
  slug: "", manufacturer_id: "", model_name: "", generation: "", year_range: "",
  image_url: "", tagline: "", story_text: "", price: "", horsepower: "",
  body_type: "", fuel: "", transmission: "", condition: "", is_published: true,
}

export default function AdminVehicleForm() {
  const { id } = useParams()
  const isEditing = !!id
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [manufacturers, setManufacturers] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from("manufacturers").select("id, name").order("name").then(({ data }) => setManufacturers(data || []))
    if (isEditing) {
      getVehicleById(id).then((v) => setForm({ ...emptyForm, ...v }))
    }
  }, [id, isEditing])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (isEditing) {
        await updateVehicle(id, form)
      } else {
        await createVehicle(form)
      }
      navigate("/admin")
    } catch (err) {
      alert("Error saving vehicle: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
  const labelClass = "mb-1 block text-sm text-white/60"

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">{isEditing ? "Edit Vehicle" : "Add Vehicle"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Manufacturer</label>
          <select name="manufacturer_id" value={form.manufacturer_id} onChange={handleChange} required className={inputClass}>
            <option value="">Select manufacturer…</option>
            {manufacturers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Model Name</label>
            <input name="model_name" value={form.model_name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Slug (URL-friendly)</label>
            <input name="slug" value={form.slug} onChange={handleChange} required placeholder="toyota-fortuner-3rd-gen" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Generation</label>
            <input name="generation" value={form.generation} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Year Range</label>
            <input name="year_range" value={form.year_range} onChange={handleChange} placeholder="2020–present" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input name="image_url" value={form.image_url} onChange={handleChange} className={inputClass} />
          {form.image_url && <img src={form.image_url} alt="preview" className="mt-2 h-32 rounded-lg object-cover" />}
        </div>

        <div>
          <label className={labelClass}>Tagline</label>
          <input name="tagline" value={form.tagline} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Story / Discover More Text</label>
          <textarea name="story_text" value={form.story_text} onChange={handleChange} rows={5} className={inputClass} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Price</label>
            <input name="price" value={form.price} onChange={handleChange} placeholder="KSh 5,000,000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Horsepower</label>
            <input name="horsepower" value={form.horsepower} onChange={handleChange} placeholder="204 hp" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Body Type</label>
            <input name="body_type" value={form.body_type} onChange={handleChange} placeholder="SUV" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Fuel</label>
            <input name="fuel" value={form.fuel} onChange={handleChange} placeholder="Diesel" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Transmission</label>
            <input name="transmission" value={form.transmission} onChange={handleChange} placeholder="Automatic" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Condition</label>
            <input name="condition" value={form.condition} onChange={handleChange} placeholder="New / Used" className={inputClass} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-white/60">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} />
          Published (visible on public site)
        </label>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold disabled:opacity-50">
            {saving ? "Saving…" : isEditing ? "Save Changes" : "Add Vehicle"}
          </button>
          <button type="button" onClick={() => navigate("/admin")} className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold hover:bg-white/10">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}