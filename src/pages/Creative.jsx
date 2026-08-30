import { motion } from "framer-motion"
import Reveal from "../components/ui/Reveal"

const specialties = [
  "Posters & Campaign Visuals",
  "Brand Identity & Logo Design",
  "Brochures & Print Design",
  "Social Media Content",
  "Billboards & Large Format",
  "Apparel Branding",
]

const contactLinks = [
  { label: "WhatsApp", href: "https://wa.me/254115265702" },
  { label: "Email", href: "mailto:studio.wavecreative@gmail.com" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590104652609" },
  { label: "X / Twitter", href: "https://x.com/victorwawe4441" },
  { label: "Behance", href: "https://www.behance.net/victorwaweru2" },
]

export default function Creative() {
  return (
    <div>
      <section className="border-b border-white/10 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest gradient-signature-text">
            Waveline Creative
          </p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Designs that move brands forward.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/60">
            The design studio behind Waveline Motors — posters, branding, campaign visuals and social
            media content, crafted for businesses that want to be unmissable.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            
              <a href="https://wave-creative-showcase.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 gradient-signature"
            >
              View Full Portfolio
            </a>
            
              <a href="https://wa.me/254115265702"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Hire Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">What We Do</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s} delay={i * 0.06}>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <p className="text-sm text-white/70">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16">
        <Reveal>
          <h2 className="text-center text-xl font-semibold">Get in Touch</h2>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {contactLinks.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              
                <a href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-accent"
              >
                {c.label}
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] py-16">
        <Reveal className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to build your brand?</h2>
          <p className="mx-auto mt-3 text-white/50">
            From logo design to full campaign visuals — see completed work and available packages
            on the full Waveline Creative portfolio site.
          </p>
          
           <a href="https://wave-creative-showcase.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 gradient-signature"
          >
            Visit Waveline Creative →
          </a>
        </Reveal>
      </section>
    </div>
  )
}