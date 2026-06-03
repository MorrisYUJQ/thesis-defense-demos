import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const links = [
    { to: '/', label: 'Home' },
    { to: '/meicn-gat', label: 'MEICN-GAT Demo' },
    { to: '/dft-gen', label: 'DFT-GEN Demo' },
  ]
  return (
    <nav className="bg-[#8B0000] text-white px-6 py-3 flex items-center gap-8 shadow-md sticky top-0 z-50">
      <span className="font-bold text-lg tracking-wide">Thesis Defense</span>
      <div className="flex gap-1">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              pathname === l.to
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
