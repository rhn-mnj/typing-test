import { useState } from 'react'
import { Trash2, BarChart3 } from 'lucide-react'
import { getAllResultsGroupedByMode, deleteResult, clearAllResults } from '../utils/resultsStorage'
import { TYPING_MODES } from '../config/modes'

const ResultsHistory = ({ onBack }) => {
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
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Results History</h2>
        <div className="py-12">
          <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No test results yet. Complete a test to see your stats here!</p>
          <button
            onClick={onBack}
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Tests
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Results History</h2>
        <button
          onClick={onBack}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Back to Tests
        </button>
      </div>

      <p className="text-gray-600">Total results: {totalResults}</p>

      {Object.entries(resultsGrouped).map(([modeId, results]) => {
        const modeInfo = getModeInfo(modeId)
        if (!modeInfo) return null

        return (
          <div key={modeId} className="border-t pt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{modeInfo.name}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">WPM</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Accuracy</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Words Typed</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Time (s)</th>
                    <th className="px-4 py-2 text-center font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{formatDate(result.date)}</td>
                      <td className="px-4 py-3 font-semibold text-purple-600">{result.wpm}</td>
                      <td className="px-4 py-3 text-gray-700">{result.accuracy}%</td>
                      <td className="px-4 py-3 text-gray-700">{result.wordsTyped}</td>
                      <td className="px-4 py-3 text-gray-700">{result.timeElapsed}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteResult(result.id)}
                          className="text-red-600 hover:text-red-800 transition"
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

      <div className="pt-6 border-t flex justify-between">
        <button
          onClick={handleClearAll}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Clear All Results
        </button>
        <p className="text-gray-500 text-sm self-center">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default ResultsHistory
