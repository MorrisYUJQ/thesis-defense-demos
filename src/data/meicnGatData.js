export const hotels = [
  { id: 'h1', name: 'The Peninsula', district: 'Tsim Sha Tsui', stars: 5, rooms: 300 },
  { id: 'h2', name: 'Mandarin Oriental', district: 'Central', stars: 5, rooms: 501 },
  { id: 'h3', name: 'The Ritz-Carlton', district: 'West Kowloon', stars: 5, rooms: 312 },
  { id: 'h4', name: 'Rosewood Hong Kong', district: 'Tsim Sha Tsui', stars: 5, rooms: 413 },
  { id: 'h5', name: 'Four Seasons', district: 'Central', stars: 5, rooms: 399 },
]

export const pois = [
  { id: 'p1', name: 'Victoria Peak', type: 'Landmark' },
  { id: 'p2', name: 'IFC Mall', type: 'Shopping' },
  { id: 'p3', name: 'Harbour City', type: 'Shopping' },
  { id: 'p4', name: 'Michelin Star Lane Fook', type: 'Dining' },
  { id: 'p5', name: 'The Spa at Four Seasons', type: 'Spa' },
  { id: 'p6', name: 'HKCEC', type: 'Business' },
  { id: 'p7', name: 'Star Ferry Pier', type: 'Leisure' },
  { id: 'p8', name: 'Lan Kwai Fong', type: 'Nightlife' },
  { id: 'p9', name: 'Elements Mall', type: 'Shopping' },
  { id: 'p10', name: 'Ocean Park', type: 'Leisure' },
]

export const users = [
  { id: 'u1',  name: 'Chen Wei',      stays: 12, reviews: 8,  tags: ['Business','Dining'],      capsule: { Dining: 0.7, Spa: 0.3, Business: 0.9, Leisure: 0.2, Shopping: 0.4 }, poiVisits: ['p2','p6','p4'] },
  { id: 'u2',  name: 'Sarah L.',      stays: 5,  reviews: 3,  tags: ['Spa','Leisure'],           capsule: { Dining: 0.4, Spa: 0.95, Business: 0.1, Leisure: 0.8, Shopping: 0.6 }, poiVisits: ['p5','p7','p10'] },
  { id: 'u3',  name: 'James K.',      stays: 8,  reviews: 6,  tags: ['Shopping','Dining'],       capsule: { Dining: 0.85, Spa: 0.2, Business: 0.3, Leisure: 0.5, Shopping: 0.9 }, poiVisits: ['p2','p3','p9','p4'] },
  { id: 'u4',  name: 'Li Fang',       stays: 3,  reviews: 1,  tags: ['Business'],                capsule: { Dining: 0.3, Spa: 0.1, Business: 0.95, Leisure: 0.15, Shopping: 0.2 }, poiVisits: ['p6'] },
  { id: 'u5',  name: 'Anna M.',       stays: 15, reviews: 12, tags: ['Spa','Shopping','Dining'], capsule: { Dining: 0.8, Spa: 0.85, Business: 0.2, Leisure: 0.6, Shopping: 0.75 }, poiVisits: ['p5','p2','p3','p4'] },
  { id: 'u6',  name: 'Wang Jun',      stays: 7,  reviews: 4,  tags: ['Leisure','Dining'],        capsule: { Dining: 0.75, Spa: 0.4, Business: 0.25, Leisure: 0.85, Shopping: 0.3 }, poiVisits: ['p1','p7','p10','p4'] },
  { id: 'u7',  name: 'Emily R.',      stays: 2,  reviews: 0,  tags: ['Shopping'],                capsule: { Dining: 0.3, Spa: 0.2, Business: 0.1, Leisure: 0.4, Shopping: 0.95 }, poiVisits: ['p2','p3','p9'] },
  { id: 'u8',  name: 'David Z.',      stays: 10, reviews: 7,  tags: ['Business','Spa'],          capsule: { Dining: 0.5, Spa: 0.7, Business: 0.85, Leisure: 0.3, Shopping: 0.4 }, poiVisits: ['p6','p5'] },
  { id: 'u9',  name: 'Huang Mei',     stays: 6,  reviews: 5,  tags: ['Dining','Leisure'],        capsule: { Dining: 0.9, Spa: 0.35, Business: 0.2, Leisure: 0.7, Shopping: 0.45 }, poiVisits: ['p4','p1','p7'] },
  { id: 'u10', name: 'Tom B.',        stays: 4,  reviews: 2,  tags: ['Business','Shopping'],     capsule: { Dining: 0.4, Spa: 0.15, Business: 0.8, Leisure: 0.2, Shopping: 0.7 }, poiVisits: ['p6','p2','p9'] },
  { id: 'u11', name: 'Liu Yan',       stays: 9,  reviews: 6,  tags: ['Spa','Dining'],            capsule: { Dining: 0.7, Spa: 0.9, Business: 0.15, Leisure: 0.5, Shopping: 0.35 }, poiVisits: ['p5','p4'] },
  { id: 'u12', name: 'Michelle C.',   stays: 1,  reviews: 0,  tags: ['Leisure'],                 capsule: { Dining: 0.25, Spa: 0.3, Business: 0.05, Leisure: 0.9, Shopping: 0.4 }, poiVisits: ['p1','p7','p10'] },
  { id: 'u13', name: 'Zhang Hao',     stays: 11, reviews: 9,  tags: ['Business','Dining','Spa'], capsule: { Dining: 0.8, Spa: 0.6, Business: 0.9, Leisure: 0.3, Shopping: 0.5 }, poiVisits: ['p6','p4','p5'] },
  { id: 'u14', name: 'Kate W.',       stays: 3,  reviews: 1,  tags: ['Shopping','Spa'],          capsule: { Dining: 0.35, Spa: 0.75, Business: 0.1, Leisure: 0.45, Shopping: 0.85 }, poiVisits: ['p3','p5','p9'] },
  { id: 'u15', name: 'Xu Ming',       stays: 7,  reviews: 5,  tags: ['Dining'],                  capsule: { Dining: 0.95, Spa: 0.2, Business: 0.3, Leisure: 0.4, Shopping: 0.25 }, poiVisits: ['p4'] },
  { id: 'u16', name: 'Rachel P.',     stays: 6,  reviews: 3,  tags: ['Leisure','Shopping'],      capsule: { Dining: 0.5, Spa: 0.4, Business: 0.15, Leisure: 0.75, Shopping: 0.8 }, poiVisits: ['p1','p2','p10'] },
  { id: 'u17', name: 'Zhao Lin',      stays: 14, reviews: 10, tags: ['Business','Dining'],       capsule: { Dining: 0.75, Spa: 0.3, Business: 0.92, Leisure: 0.2, Shopping: 0.35 }, poiVisits: ['p6','p4','p2'] },
  { id: 'u18', name: 'Sophie T.',     stays: 2,  reviews: 1,  tags: ['Spa','Leisure'],           capsule: { Dining: 0.3, Spa: 0.85, Business: 0.05, Leisure: 0.8, Shopping: 0.5 }, poiVisits: ['p5','p7'] },
  { id: 'u19', name: 'He Dong',       stays: 8,  reviews: 4,  tags: ['Shopping','Business'],     capsule: { Dining: 0.4, Spa: 0.2, Business: 0.7, Leisure: 0.3, Shopping: 0.88 }, poiVisits: ['p2','p3','p6','p9'] },
  { id: 'u20', name: 'Linda H.',      stays: 5,  reviews: 2,  tags: ['Dining','Spa','Leisure'],  capsule: { Dining: 0.65, Spa: 0.7, Business: 0.2, Leisure: 0.65, Shopping: 0.4 }, poiVisits: ['p4','p5','p1'] },
]

const hotelProfiles = {
  h1: { Dining: 0.8, Spa: 0.7, Business: 0.6, Leisure: 0.5, Shopping: 0.7 },
  h2: { Dining: 0.9, Spa: 0.6, Business: 0.85, Leisure: 0.4, Shopping: 0.5 },
  h3: { Dining: 0.7, Spa: 0.8, Business: 0.5, Leisure: 0.7, Shopping: 0.6 },
  h4: { Dining: 0.85, Spa: 0.75, Business: 0.4, Leisure: 0.6, Shopping: 0.65 },
  h5: { Dining: 0.75, Spa: 0.9, Business: 0.7, Leisure: 0.5, Shopping: 0.55 },
}

const hotelPois = {
  h1: ['p3','p4','p7'],
  h2: ['p2','p4','p6'],
  h3: ['p9','p5','p1'],
  h4: ['p3','p4','p7','p8'],
  h5: ['p2','p5','p6'],
}

function cosineSim(a, b) {
  const keys = Object.keys(a)
  let dot = 0, na = 0, nb = 0
  for (const k of keys) {
    dot += a[k] * b[k]
    na += a[k] ** 2
    nb += b[k] ** 2
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9)
}

export function rankUsers(hotelId, usePoi) {
  const profile = hotelProfiles[hotelId]
  const nearbyPois = hotelPois[hotelId] || []

  return users.map(u => {
    const baseSim = cosineSim(u.capsule, profile)
    const stayBonus = Math.min(u.stays / 15, 1) * 0.15
    let poiBonus = 0
    if (usePoi) {
      const overlap = u.poiVisits.filter(p => nearbyPois.includes(p)).length
      poiBonus = overlap * 0.08
    }
    const score = Math.min(baseSim + stayBonus + poiBonus, 1.0)
    return { ...u, score: +score.toFixed(3), baseSim: +baseSim.toFixed(3), poiBonus: +poiBonus.toFixed(3) }
  }).sort((a, b) => b.score - a.score)
}

export const edges = []
users.forEach(u => {
  const hotelEdges = u.stays > 5 ? ['h1','h2','h3'] : u.stays > 2 ? ['h1','h4'] : ['h5']
  hotelEdges.forEach(h => edges.push({ from: u.id, to: h, type: 'stay' }))
  u.poiVisits.forEach(p => edges.push({ from: u.id, to: p, type: 'poi' }))
})
hotels.forEach(h => {
  (hotelPois[h.id] || []).forEach(p => edges.push({ from: h.id, to: p, type: 'nearby' }))
})
