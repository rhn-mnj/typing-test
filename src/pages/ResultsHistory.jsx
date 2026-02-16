import { useState, useContext } from 'react'
import { Trash2, BarChart3 } from 'lucide-react'
import { getAllResultsGroupedByMode, deleteResult, clearAllResults } from '../utils/resultsStorage'
import { TYPING_MODES } from '../config/modes'
import { ThemeContext } from '../context/ThemeContext'

const ResultsHistory = ({ onBack }) => {
  const { currentTheme } = useContext(ThemeContext)
  const [resultsGrouped, setResultsGrouped] = useState(getAllResultsGroupedByMode())

  const handleDeleteResult = (resultId) => {
    deleteResult(resultId)
    setResultsGrouped(getAllResultsGroupedByMode())
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all results? This cannot be undone.')) {
      clearAllResults()
      setResultsGrouped({})
    }
  }

  const getModeInfo = (modeId) => {
    return TYPING_MODES.find(m => m.id === modeId)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const totalResults = Object.values(resultsGrouped).reduce((sum, arr) => sum + arr.length, 0)

  if (totalResults === 0) {
    return (
      <div className="rounded-lg shadow-lg p-8 space-y-6 text-center" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Results History</h2>
        <div className="py-12">
          <BarChart3 size={48} className="mx-auto mb-4" style={{ color: 'var(--color-textSecondary)' }} />
          <p className="text-lg" style={{ color: 'var(--color-textSecondary)' }}>No test results yet. Complete a test to see your stats here!</p>
          <button
            onClick={onBack}
            className="mt-6 text-white px-6 py-2 rounded-lg transition"
            style={{ backgroundColor: 'var(--color-accent)' }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            Back to Tests
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg shadow-lg p-8 space-y-6" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Results History</h2>
        <button
          onClick={onBack}
          className="text-white px-6 py-2 rounded-lg transition"
          style={{ backgroundColor: 'var(--color-accent)' }}
          onMouseOver={(e) => e.target.style.opacity = '0.8'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          Back to Tests
        </button>
      </div>

      <p style={{ color: 'var(--color-textSecondary)' }}>Total results: {totalResults}</p>

      {Object.entries(resultsGrouped).map(([modeId, results]) => {
        const modeInfo = getModeInfo(modeId)
        if (!modeInfo) return null

        return (
          <div key={modeId} className="pt-6" style={{ borderTopColor: 'var(--color-border)', borderTopWidth: '1px' }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>{modeInfo.name}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
                    <th className="px-4 py-2 text-left font-semibold" style={{ color: 'var(--color-text)' }}>Date</th>
                    <th className="px-4 py-2 text-left font-semibold" style={{ color: 'var(--color-text)' }}>WPM</th>
                    <th className="px-4 py-2 text-left font-semibold" style={{ color: 'var(--color-text)' }}>Accuracy</th>
                    <th className="px-4 py-2 text-left font-semibold" style={{ color: 'var(--color-text)' }}>Words Typed</th>
                    <th className="px-4 py-2 text-left font-semibold" style={{ color: 'var(--color-text)' }}>Time (s)</th>
                    <th className="px-4 py-2 text-center font-semibold" style={{ color: 'var(--color-text)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id} style={{ borderBottomColor: 'var(--color-border)', borderBottomWidth: '1px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bgSecondary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text)' }}>{formatDate(result.date)}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: 'var(--color-stat)' }}>{result.wpm}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text)' }}>{result.accuracy}%</td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text)' }}>{result.wordsTyped}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text)' }}>{result.timeElapsed}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteResult(result.id)}
                          className="transition"
                          style={{ color: 'var(--color-incorrect)' }}
                          title="Delete result"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}

      <div className="pt-6 flex justify-between" style={{ borderTopColor: 'var(--color-border)', borderTopWidth: '1px' }}>
        <button
          onClick={handleClearAll}
          className="text-white px-6 py-2 rounded-lg transition"
          style={{ backgroundColor: 'var(--color-incorrect)' }}
          onMouseOver={(e) => e.target.style.opacity = '0.8'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          Clear All Results
        </button>
        <p className="text-sm self-center" style={{ color: 'var(--color-textSecondary)' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default ResultsHistory
