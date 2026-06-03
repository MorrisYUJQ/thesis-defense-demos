import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MeicnGat from './pages/MeicnGat'
import DftGen from './pages/DftGen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meicn-gat" element={<MeicnGat />} />
      <Route path="/dft-gen" element={<DftGen />} />
    </Routes>
  )
}
