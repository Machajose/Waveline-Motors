import { useState } from "react"
import { sendContactMessage } from "../lib/queries/contact"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus("sending")
    setError("")
    try {
      await sendContactMessage(form)
      setStatus("sent")
      setForm({ name: "", email: "", message: "" })
    } catch (sendError) {
      setStatus("error")
      setError(sendError.message)
    }
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm outline-none focus:border-accent"

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-white/50">Have a question or want to work with us? Send a message below.</p>

      {status === "sent" && (
        <p role="status" className="mt-6 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-300">
          Your message was sent. Waveline Motors will get back to you.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-300">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm text-white/60">Name</label>
          <input id="contact-name" name="name" value={form.name} onChange={handleChange} required maxLength={120} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm text-white/60">Email</label>
          <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} required maxLength={320} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1 block text-sm text-white/60">Message</label>
          <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required maxLength={10000} rows={5} className={inputClass} />
        </div>
        <button type="submit" disabled={status === "sending"} className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-50 gradient-signature">
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  )
}
