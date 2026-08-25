import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Vehicles", to: "/vehicles" },
  { label: "Evolution", to: "/evolution" },
  { label: "Brands", to: "/brands" },
  { label: "For Sale", to: "/for-sale" },
  { label: "Videos", to: "/videos" },
  { label: "News", to: "/news" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          WAVELINE<span className="text-accent">MOTORS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-white/60"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/partner-with-us"
          className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:block"
        >
          Partner With Us
        </Link>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-white/80">
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/partner-with-us"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Partner With Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
