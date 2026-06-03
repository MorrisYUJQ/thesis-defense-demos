import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import { samples } from '../data/dftGenData'

const POLYU = '#8B0000'
const STEPS = ['Architect Analysis', 'Placeholder Protection', 'Writer Rewriting', 'DAC Visual Control', 'Evaluator Check']
const STEP_ICONS = ['🔍', '🛡️', '✍️', '📐', '✅']
const STEP_DESC = [
  'Diagnose each sentence: role, focus, keywords, visual suggestion',
  'Replace high-risk spans (quotes, numbers, names) with immutable tokens',
  'Rewrite under blueprint constraints: split, simplify, preserve keywords',
  'Apply line-length capping, chunking, anchor isolation, keyword bolding',
  'Binary PASS/FAIL check. Failed items get up to 2 refinement rounds',
]

function Gauge({ value, label, size = 80 }) {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value)
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f3f4f6" strokeWidth={6} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={POLYU} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`} className="gauge-ring" />
        <text x={size/2} y={size/2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill="#1a1a2e">
          {(value * 100).toFixed(0)}
        </text>
      </svg>
      <span className="text-xs text-gray-500 mt-1">{label}</span>
    </div>
  )
}

function PipelineVis({ activeStep }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">DFT-GEN Pipeline</h3>
      <div className="flex items-start gap-1">
        {STEPS.map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
              i < activeStep ? 'bg-[#8B0000] text-white shadow-md' :
              i === activeStep ? 'bg-[#8B0000] text-white shadow-lg scale-110' :
              'bg-gray-100 text-gray-400'
            }`}>
              {STEP_ICONS[i]}
            </div>
            <div className={`mt-2 text-center text-xs font-medium transition-colors ${
              i <= activeStep ? 'text-[#8B0000]' : 'text-gray-400'
            }`}>
              {step}
            </div>
            {i === activeStep && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-gray-500 mt-1 text-center max-w-[140px]"
              >
                {STEP_DESC[i]}
              </motion.p>
            )}
            {i < STEPS.length - 1 && (
              <div className={`hidden sm:block absolute mt-5 w-full h-0.5 ${i < activeStep ? 'bg-[#8B0000]' : 'bg-gray-200'}`}
                style={{ left: '50%', width: '100%' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function BlueprintTable({ blueprint }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-3 py-2 text-left text-gray-500 font-medium">Sentence</th>
            <th className="px-3 py-2 text-left text-gray-500 font-medium">Role</th>
            <th className="px-3 py-2 text-left text-gray-500 font-medium">Focus</th>
            <th className="px-3 py-2 text-left text-gray-500 font-medium">Keywords</th>
          </tr>
        </thead>
        <tbody>
          {blueprint.map((b, i) => (
            <tr key={i} className="border-t border-gray-50">
              <td className="px-3 py-2 text-gray-700 max-w-[200px] truncate">{b.sentence}</td>
              <td className="px-3 py-2">
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs">{b.role}</span>
              </td>
              <td className="px-3 py-2 text-gray-600">{b.focus}</td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-1">
                  {b.keywords.map(k => (
                    <span key={k} className="px-1 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-mono">{k}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HelperComparison({ sample }) {
  return (
    <div className="bg-orange-50/50 rounded-xl border border-orange-100 p-4">
      <h4 className="text-sm font-semibold text-orange-800 mb-2">⚠ Naive "Dyslexia Helper" Output</h4>
      <p className="text-sm text-gray-700 mb-3">{sample.helperVersion}</p>
      <div className="text-xs text-gray-500 mb-2">Information lost:</div>
      <div className="flex flex-wrap gap-1.5">
        {sample.helperLost.map(l => (
          <span key={l} className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs line-through">{l}</span>
        ))}
      </div>
    </div>
  )
}

export default function DftGen() {
  const [sampleIdx, setSampleIdx] = useState(0)
  const [mode, setMode] = useState('focus')
  const [activeStep, setActiveStep] = useState(-1)
  const [showResult, setShowResult] = useState(false)
  const [showBlueprint, setShowBlueprint] = useState(false)
  const [tab, setTab] = useState('transform')
  const sample = samples[sampleIdx]

  function runPipeline() {
    setShowResult(false)
    setActiveStep(0)
    let step = 0
    const timer = setInterval(() => {
      step++
      if (step >= STEPS.length) {
        clearInterval(timer)
        setActiveStep(STEPS.length - 1)
        setTimeout(() => setShowResult(true), 400)
      } else {
        setActiveStep(step)
      }
    }, 800)
  }

  useEffect(() => {
    setShowResult(false)
    setActiveStep(-1)
    setShowBlueprint(false)
  }, [sampleIdx])

  const renderRewritten = () => {
    if (mode === 'full') return <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">{sample.rewritten.full}</p>
    if (mode === 'card') return sample.rewritten.card.map((c, i) => <div key={i} className="card-block text-sm text-gray-800">{c}</div>)
    return sample.rewritten.focus.map((line, i) =>
      line === '' ? <div key={i} className="h-3" /> : <div key={i} className="focus-line">{line}</div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">DFT-GEN: Museum Text Accessibility</h1>
          <p className="text-gray-500 text-sm mt-1">
            Compare original museum text with DFT-GEN's fidelity-preserving, dyslexia-friendly transformation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <span className="text-sm font-medium text-gray-600">Sample:</span>
          {samples.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSampleIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sampleIdx === i
                  ? 'bg-[#8B0000] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8B0000]/30'
              }`}
            >
              {s.title}
            </button>
          ))}

          <button
            onClick={runPipeline}
            className="ml-auto px-5 py-2 bg-[#8B0000] text-white rounded-lg text-sm font-medium hover:bg-[#A52A2A] transition-colors shadow-sm"
          >
            ▶ Run DFT-GEN
          </button>
        </div>

        <PipelineVis activeStep={activeStep} />

        <div className="flex gap-2 mb-4">
          {[['transform', 'Transformation'], ['compare', 'vs. Naive Helper'], ['blueprint', 'Architect Blueprint']].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tab === k ? 'bg-[#8B0000] text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'transform' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400" /> Original Museum Text
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed">{sample.original}</div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B0000]" /> DFT-GEN Output
                </h3>
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  {['full', 'card', 'focus'].map(m => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                        mode === m ? 'bg-white text-[#8B0000] shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div
                    key={mode + sampleIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderRewritten()}
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-40 text-gray-300 text-sm">
                    Click "Run DFT-GEN" to transform
                  </div>
                )}
              </AnimatePresence>

              {showResult && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">DCFI Scores</h4>
                  <div className="flex justify-around">
                    <Gauge value={sample.dcfi.overall} label="Overall" size={72} />
                    <Gauge value={sample.dcfi.accessibility} label="Access." size={64} />
                    <Gauge value={sample.dcfi.content} label="Content" size={64} />
                    <Gauge value={sample.dcfi.task} label="Task" size={64} />
                    <Gauge value={sample.dcfi.safety} label="Safety" size={64} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'compare' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <HelperComparison sample={sample} />
            <div className="bg-emerald-50/50 rounded-xl border border-emerald-100 p-4">
              <h4 className="text-sm font-semibold text-emerald-800 mb-2">✓ DFT-GEN Output (Focus Mode)</h4>
              {sample.rewritten.focus.map((line, i) =>
                line === '' ? <div key={i} className="h-2" /> : <div key={i} className="focus-line text-sm">{line}</div>
              )}
              <div className="mt-3 text-xs text-emerald-700 font-medium">
                DCFI: {sample.dcfi.overall.toFixed(3)} — All key facts preserved
              </div>
            </div>
          </div>
        )}

        {tab === 'blueprint' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Architect Blueprint — Sentence-Level Diagnosis</h3>
            <BlueprintTable blueprint={sample.blueprint} />
          </div>
        )}
      </div>
    </div>
  )
}
