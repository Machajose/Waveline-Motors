import { useState, useRef } from "react"
import { compressAndUploadImage } from "../../lib/imageUpload"

export default function ImageUploadField({ value, onChange, folder = "vehicles", label = "Image" }) {
  const [mode, setMode] = useState("upload") // "upload" | "url"
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")
    try {
      const url = await compressAndUploadImage(file, folder)
      onChange(url)
    } catch (err) {
      setError("Upload failed: " + err.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm text-white/60">{label}</label>
        <div className="flex rounded-full border border-white/15 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              mode === "upload" ? "bg-accent text-navy" : "text-white/50 hover:text-white/80"
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              mode === "url" ? "bg-accent text-navy" : "text-white/50 hover:text-white/80"
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {value && (
        <img src={value} alt="preview" className="mb-2 h-32 w-full rounded-lg object-cover sm:w-48" />
      )}

      {mode === "upload" ? (
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10">
            {uploading ? "Uploading…" : value ? "Replace Photo" : "Upload Photo"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {value && (
            <button type="button" onClick={() => onChange("")} className="text-sm text-white/40 hover:text-red-400">
              Remove
            </button>
          )}
        </div>
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className={inputClass}
        />
      )}

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {mode === "upload" && (
        <p className="mt-1 text-xs text-white/30">Photos are automatically resized and compressed on upload.</p>
      )}
    </div>
  )
}