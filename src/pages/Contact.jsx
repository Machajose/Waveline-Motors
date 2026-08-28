import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${form.name} — Waveline Motors`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:info@wavelinemotors.co.ke?subject=${subject}&body=${body}`
    setSent(true)
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm outline-none focus:border-accent"

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-white/50">Have a question or want to work with us? Send a message below.</p>

      {sent && (
        <p className="mt-6 rounded-lg bg-white/5 p-4 text-sm text-white/70">
          Your email app should have opened with your message ready to send. If not, reach us directly via WhatsApp in the footer.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-white/60">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/60">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/60">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className={inputClass} />
        </div>
        <button
          type="submit"
          className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 gradient-signature"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}