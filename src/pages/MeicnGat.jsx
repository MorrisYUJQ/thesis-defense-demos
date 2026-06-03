import { useState, useMemo } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import Navbar from '../components/Navbar'
import { hotels, users, pois, rankUsers } from '../data/meicnGatData'

const POLYU = '#8B0000'

function Badge({ children, color = 'gray' }) {
  const colors = {
    gray: 'bg-gray-100 text-gray-600',
    red: 'bg-red-50 text-[#8B0000]',
    green: 'bg-emerald-50 text-emerald-700',
    blue: 'bg-blue-50 text-blue-700',
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>{children}</span>
}

function ScoreBar({ score, label }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 text-gray-500">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full bg-[#8B0000] transition-all duration-500" style={{ width: `${score * 100}%` }} />
      </div>
      <span className="w-10 text-right font-mono text-gray-700">{score.toFixed(3)}</span>
    </div>
  )
}

function UserCard({ user, rank, expanded, onToggle }) {
  const dims = Object.entries(user.capsule).map(([k, v]) => ({ dim: k, val: v }))
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden card-hover">
      <button onClick={onToggle} className="w-full text-left px-4 py-3 flex items-center gap-3">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${rank <= 3 ? 'bg-[#8B0000]' : 'bg-gray-400'}`}>
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-400">{user.stays} stays · {user.reviews} reviews</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-[#8B0000]">{user.score.toFixed(3)}</div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-50 pt-3">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {user.tags.map(t => <Badge key={t} color="red">{t}</Badge>)}
          </div>

          <div className="space-y-1.5 mb-3">
            <ScoreBar score={user.baseSim} label="Capsule" />
            {user.poiBonus > 0 && <ScoreBar score={user.poiBonus} label="POI Bonus" />}
          </div>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dims} outerRadius="75%">
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />
                <Radar dataKey="val" stroke={POLYU} fill={POLYU} fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

function GraphVis({ selectedHotel, usePoi }) {
  const nodeData = useMemo(() => {
    const nodes = []
    hotels.forEach((h, i) => {
      const angle = (i / hotels.length) * Math.PI * 2 - Math.PI / 2
      nodes.push({ ...h, x: 300 + Math.cos(angle) * 100, y: 200 + Math.sin(angle) * 100, kind: 'hotel' })
    })
    users.slice(0, 12).forEach((u, i) => {
      const angle = (i / 12) * Math.PI * 2
      nodes.push({ ...u, x: 300 + Math.cos(angle) * 230, y: 200 + Math.sin(angle) * 180, kind: 'user' })
    })
    if (usePoi) {
      pois.slice(0, 8).forEach((p, i) => {
        const angle = (i / 8) * Math.PI * 2 + 0.3
        nodes.push({ ...p, x: 300 + Math.cos(angle) * 155, y: 200 + Math.sin(angle) * 135, kind: 'poi' })
      })
    }
    return nodes
  }, [usePoi])

  const edgeLines = useMemo(() => {
    const lines = []
    const find = (id) => nodeData.find(n => n.id === id)
    const ranked = selectedHotel ? rankUsers(selectedHotel, usePoi).slice(0, 5).map(u => u.id) : []

    nodeData.filter(n => n.kind === 'user').forEach(u => {
      const h = find(selectedHotel)
      if (h && ranked.includes(u.id)) {
        lines.push({ x1: u.x, y1: u.y, x2: h.x, y2: h.y, color: POLYU, width: 2, opacity: 0.6 })
      }
      if (usePoi) {
        u.poiVisits?.slice(0, 2).forEach(pid => {
          const p = find(pid)
          if (p) lines.push({ x1: u.x, y1: u.y, x2: p.x, y2: p.y, color: '#059669', width: 1, opacity: 0.25 })
        })
      }
    })
    return lines
  }, [nodeData, selectedHotel, usePoi])

  return (
    <svg viewBox="0 0 600 400" className="w-full h-full">
      {edgeLines.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke={e.color} strokeWidth={e.width} opacity={e.opacity} />
      ))}
      {nodeData.map(n => {
        const isSelected = n.kind === 'hotel' && n.id === selectedHotel
        const r = n.kind === 'hotel' ? 18 : n.kind === 'poi' ? 10 : 12
        const fill = n.kind === 'hotel' ? (isSelected ? POLYU : '#DC2626') : n.kind === 'poi' ? '#059669' : '#3B82F6'
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={r} fill={fill}
              opacity={isSelected ? 1 : 0.7}
              stroke={isSelected ? '#fff' : 'none'} strokeWidth={isSelected ? 3 : 0}
              className="cursor-pointer hover:opacity-100 transition-opacity" />
            <text x={n.x} y={n.y + r + 12} textAnchor="middle" fontSize={9} fill="#6b7280" fontWeight={isSelected ? 700 : 400}>
              {n.name?.length > 12 ? n.name.slice(0, 12) + '…' : n.name}
            </text>
          </g>
        )
      })}
      <g transform="translate(10, 370)">
        <circle cx={0} cy={0} r={5} fill="#DC2626" /><text x={10} y={4} fontSize={9} fill="#6b7280">Hotel</text>
        <circle cx={60} cy={0} r={5} fill="#3B82F6" /><text x={70} y={4} fontSize={9} fill="#6b7280">User</text>
        {usePoi && <><circle cx={115} cy={0} r={5} fill="#059669" /><text x={125} y={4} fontSize={9} fill="#6b7280">POI</text></>}
      </g>
    </svg>
  )
}

export default function MeicnGat() {
  const [selectedHotel, setSelectedHotel] = useState('h1')
  const [usePoi, setUsePoi] = useState(true)
  const [expandedUser, setExpandedUser] = useState(null)
  const ranked = useMemo(() => rankUsers(selectedHotel, usePoi), [selectedHotel, usePoi])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">MEICN-GAT: Luxury Hotel Guest Targeting</h1>
          <p className="text-gray-500 text-sm mt-1">
            Select a hotel to see ranked potential high-value guests. Toggle POI signals to observe ranking changes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <span className="text-sm font-medium text-gray-600">Hotel:</span>
          {hotels.map(h => (
            <button
              key={h.id}
              onClick={() => { setSelectedHotel(h.id); setExpandedUser(null) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedHotel === h.id
                  ? 'bg-[#8B0000] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8B0000]/30'
              }`}
            >
              {h.name}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500">POI Weak-Tie Signals</span>
            <button
              onClick={() => setUsePoi(!usePoi)}
              className={`relative w-11 h-6 rounded-full transition-colors ${usePoi ? 'bg-[#8B0000]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${usePoi ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`}
                style={{ transform: usePoi ? 'translateX(22px)' : 'translateX(0)' }} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-4" style={{ minHeight: 420 }}>
            <GraphVis selectedHotel={selectedHotel} usePoi={usePoi} />
          </div>

          <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800 text-sm">Ranked Potential Guests</h3>
              <span className="text-xs text-gray-400">{ranked.length} users</span>
            </div>
            {ranked.slice(0, 10).map((u, i) => (
              <UserCard
                key={u.id}
                user={u}
                rank={i + 1}
                expanded={expandedUser === u.id}
                onToggle={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
