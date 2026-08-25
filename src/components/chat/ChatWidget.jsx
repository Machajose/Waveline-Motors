import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { sendChatMessage } from "../../lib/queries/chat"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm the Waveline Assistant. Ask me about vehicles, brands, or how to find something on the site." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const reply = await sendChatMessage(newMessages)
      setMessages((m) => [...m, { role: "assistant", content: reply }])
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl sm:w-[380px]"
          >
            <div className="border-b border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold">Waveline Assistant</p>
              <p className="text-xs text-white/40">Ask about vehicles, brands, or the site</p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user" ? "ml-auto bg-accent text-white" : "bg-white/[0.06] text-white/85"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && <div className="max-w-[85%] rounded-lg bg-white/[0.06] px-3 py-2 text-sm text-white/50">Typing…</div>}
            </div>

            <form onSubmit={handleSend} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent disabled:opacity-50"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}