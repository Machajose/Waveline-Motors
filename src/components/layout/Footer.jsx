import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold">WAVELINE MOTORS</h3>
            <p className="text-sm text-white/50">
              Automotive Media. Vehicle Discovery. Automotive Marketing. Starting in Kenya.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Explore</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/vehicles">Vehicles</Link></li>
              <li><Link to="/evolution">Evolution</Link></li>
              <li><Link to="/brands">Brands</Link></li>
              <li><Link to="/for-sale">For Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Company</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/kenya">Waveline Kenya</Link></li>
              <li><Link to="/creative">Waveline Creative</Link></li>
              <li><Link to="/partner-with-us">Partner With Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Follow</h4>
            <p className="text-sm text-white/50">Instagram · YouTube · TikTok</p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Waveline Motors. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
