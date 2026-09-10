import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  getVehiclesByEvolutionGroupAdmin,
  deleteVehicle,
  renameEvolutionGroup,
  createVehicle,
  updateVehicle,
} from "../../lib/queries/adminVehicles"
import ImageUploadField from "./ImageUploadField"

function formatGroupName(group) {
  return group.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

const emptyTile = { generation: "", year_range: "", image_url: "", tagline: "", story_text: "" }

function GenerationTile({ vehicle, onSave, onDelete, onCancelNew }) {
  const [editing, setEditing] = useState(!vehicle?.id)
  const [form, setForm] = useState(vehicle || emptyTile)
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(form)
      setEditing(false)
    } catch (err) {
      alert("Error saving: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
  const labelClass = "mb-1 block text-xs text-white/50"

  if (editing) {
    return (
      <div className="rounded-xl border border-accent/40 bg-white/[0.04] p-5">
        <ImageUploadField
          label="Photo"
          value={form.image_url}
          onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
          folder="vehicles"
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Generation Name</label>
            <input name="generation" value={form.generation || ""} onChange={handleChange} placeholder="80 Series" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Year Range</label>
            <input name="year_range" value={form.year_range || ""} onChange={handleChange} placeholder="1990–1997" className={inputClass} />
          </div>
        </div>
        <div className="mt-3">
          <label className={labelClass}>Short Description (Tagline)</label>
          <textarea name="tagline" value={form.tagline || ""} onChange={handleChange} rows={2} className={inputClass} placeholder="One or two sentences that make someone curious to read more." />
        </div>
        <div className="mt-3">
          <label className={labelClass}>Full Story (shown on Read More)</label>
          <textarea name="story_text" value={form.story_text || ""} onChange={handleChange} rows={4} className={inputClass} />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-navy disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Tile"}
          </button>
          <button
            onClick={() => (vehicle?.id ? setEditing(false) : onCancelNew())}
            className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="aspect-[4/3] overflow-hidden bg-black/30">
        {form.image_url && <img src={form.image_url} alt={form.generation} className="h-full w-full object-cover" />}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-white/40">{form.year_range}</p>
        <h3 className="mt-0.5 font-semibold">{form.generation || "Untitled Generation"}</h3>
        {form.tagline && <p className="mt-2 whitespace-pre-line text-sm text-white/50 line-clamp-2">{form.tagline}</p>}
        <div className="mt-3 flex gap-3 text-xs">
          <button onClick={() => setEditing(true)} className="font-medium text-accent hover:underline">Edit Tile</button>
          <button onClick={() => onDelete(vehicle.id)} className="text-white/40 hover:text-red-400">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminEvolutionGroupDetail() {
  const { group } = useParams()
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [renaming, setRenaming] = useState(false)
  const [newName, setNewName] = useState(group)
  const [savingRename, setSavingRename] = useState(false)
  const [addingNew, setAddingNew] = useState(false)

  async function load() {
    setLoading(true)
    setVehicles(await getVehiclesByEvolutionGroupAdmin(group))
    setLoading(false)
  }

  useEffect(() => {
    setNewName(group)
    load()
  }, [group])

  async function handleDelete(id) {
    if (!confirm("Remove this generation? This deletes it permanently.")) return
    await deleteVehicle(id)
    load()
  }

  async function handleRename() {
    if (!newName.trim() || newName === group) {
      setRenaming(false)
      return
    }
    setSavingRename(true)
    try {
      await renameEvolutionGroup(group, newName.trim())
      navigate(`/admin/evolution/${newName.trim()}`)
    } catch (err) {
      alert("Error renaming group: " + err.message)
    } finally {
      setSavingRename(false)
    }
  }

  async function handleSaveExisting(vehicleForm) {
    await updateVehicle(vehicleForm.id, vehicleForm)
    load()
  }

  async function handleSaveNew(tileForm) {
  const baseModelName = vehicles[0]?.model_name || formatGroupName(group)
  const manufacturerId = vehicles[0]?.manufacturer_id
  const slugBase = slugify(`${baseModelName}-${tileForm.generation || Date.now()}`)

  await createVehicle({
    slug: slugBase,
    manufacturer_id: manufacturerId,
    model_name: baseModelName,
    generation: tileForm.generation,
    year_range: tileForm.year_range,
    image_url: tileForm.image_url,
    tagline: tileForm.tagline,
    story_text: tileForm.story_text,
    evolution_group: group,
    is_published: true,
    is_evolution_only: true,
  })
  setAddingNew(false)
  load()
}
  if (loading) return <p className="text-white/50">Loading…</p>

  return (
    <div>
      <Link to="/admin/evolution" className="text-sm text-white/40 hover:text-white/70">← All Evolution Timelines</Link>

      <div className="mt-3 flex items-center justify-between">
        {renaming ? (
          <div className="flex items-center gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-lg font-bold outline-none focus:border-accent"
            />
            <button onClick={handleRename} disabled={savingRename} className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-navy">
              {savingRename ? "Saving…" : "Save"}
            </button>
            <button onClick={() => { setRenaming(false); setNewName(group) }} className="text-xs text-white/40 hover:text-white/70">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{formatGroupName(group)}</h1>
            <button onClick={() => setRenaming(true)} className="text-xs text-accent hover:underline">
              Rename Group
            </button>
          </div>
        )}

        {!addingNew && (
          <button
            onClick={() => setAddingNew(true)}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-navy"
          >
            + Add Generation
          </button>
        )}
      </div>

      <p className="mt-1 text-sm text-white/50">
        {vehicles.length} generation{vehicles.length !== 1 ? "s" : ""} · click any tile below to edit it directly
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <GenerationTile key={v.id} vehicle={v} onSave={handleSaveExisting} onDelete={handleDelete} />
        ))}

        {addingNew && (
          <GenerationTile vehicle={null} onSave={handleSaveNew} onCancelNew={() => setAddingNew(false)} />
        )}
      </div>

      {vehicles.length === 0 && !addingNew && (
        <p className="mt-8 text-center text-white/40">No generations yet — click "+ Add Generation" to start this timeline.</p>
      )}
    </div>
  )
}