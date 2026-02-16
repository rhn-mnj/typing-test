import ModeCard from './ModeCard'
import { BarChart3 } from 'lucide-react'

const ModeSelector = ({ modes, onSelectMode, onViewHistory }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold text-gray-800">
            Choose Your Typing Test
          </h2>
          {onViewHistory && (
            <button
              onClick={onViewHistory}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <BarChart3 size={20} />
              History
            </button>
          )}
        </div>
        <p className="text-center text-gray-600 mb-12">
          Select a mode and improve your typing speed and accuracy
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modes.map((mode) => (
            <ModeCard key={mode.id} mode={mode} onSelect={onSelectMode} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModeSelector
