import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllManufacturersAdmin, deleteManufacturer } from "../../lib/queries/adminManufacturers"

export default function AdminManufacturerList() {
  const [manufacturers, setManufacturers] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    setManufacturers(await getAllManufacturersAdmin())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!confirm("Delete this brand? This will also delete its vehicles.")) return
    await deleteManufacturer(id)
    load()
  }

  if (loading) return <p className="text-white/50">Loading…</p>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Brands</h1>
        <Link to="/admin/brands/new" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-navy">
          + Add Brand
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-white/50">
            <tr>
              <th className="p-3">Logo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Country</th>
              <th className="p-3">Founded</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((m) => (
              <tr key={m.id} className="border-t border-white/10">
                <td className="p-3"><img src={m.logo_url} alt={m.name} className="h-8 w-auto object-contain invert" /></td>
                <td className="p-3">{m.name}</td>
                <td className="p-3 text-white/60">{m.country}</td>
                <td className="p-3 text-white/60">{m.founded_year}</td>
                <td className="p-3 text-right">
                  <Link to={`/admin/brands/${m.id}`} className="mr-3 text-accent hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(m.id)} className="text-white/40 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}