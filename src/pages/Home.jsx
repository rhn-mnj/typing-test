import { useState } from 'react'
import ModeBar from '../components/ModeBar'
import ModeDisplay from '../components/ModeDisplay'
import TestLayout from '../components/TestLayout'
import { TYPING_MODES } from '../config/modes'

const Home = () => {
  const [selectedMode, setSelectedMode] = useState('standard')

  const handleSelectMode = (modeId) => {
    setSelectedMode(modeId)
  }

  const currentMode = TYPING_MODES.find(m => m.id === selectedMode)

  if (!currentMode) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ModeBar selectedMode={selectedMode} onSelectMode={handleSelectMode} />
      <TestLayout>
        {/* Key prop forces remount when mode changes, resetting the test */}
        <ModeDisplay key={selectedMode} mode={currentMode} isEmbedded={true} />
      </TestLayout>
    </div>
  )
}

export default Home
