import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const demos = [
  {
    to: '/meicn-gat',
    title: 'MEICN-GAT',
    subtitle: 'Luxury Hotel Guest Targeting',
    desc: 'Interactive graph-based recommendation: explore how multi-expert capsule networks with graph attention identify high-value guests for luxury hotels under extreme sparsity.',
    icon: '🏨',
    tags: ['Graph Attention', 'Multi-Interest Capsule', 'POI Weak-Ties'],
  },
  {
    to: '/dft-gen',
    title: 'DFT-GEN',
    subtitle: 'Museum Text Accessibility',
    desc: 'See how constraint-driven text rewriting transforms dense museum exhibit descriptions into dyslexia-friendly formats while preserving every key fact.',
    icon: '🏛️',
    tags: ['Multi-Agent', 'Fidelity-First', 'Visual Accessibility'],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[#8B0000]/10 text-[#8B0000] text-sm font-medium mb-4">
            MPhil Thesis Defense
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
            AI Methods for Hospitality &amp; Tourism
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Two method-to-application cycles: graph learning for luxury targeting, and constraint-driven rewriting for cognitive accessibility.
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Jiaqian Yu &nbsp;·&nbsp; The Hong Kong Polytechnic University &nbsp;·&nbsp; 2026
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {demos.map(d => (
            <Link
              key={d.to}
              to={d.to}
              className="card-hover block bg-white rounded-2xl border border-gray-100 overflow-hidden group"
            >
              <div className="bg-[#8B0000] px-6 py-5 flex items-center gap-4">
                <span className="text-3xl">{d.icon}</span>
                <div>
                  <h2 className="text-white font-bold text-xl">{d.title}</h2>
                  <p className="text-white/70 text-sm">{d.subtitle}</p>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {d.tags.map(t => (
                    <span key={t} className="px-2.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500 font-medium">{t}</span>
                  ))}
                </div>
                <div className="mt-4 text-[#8B0000] text-sm font-medium group-hover:underline">
                  Launch Demo →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
