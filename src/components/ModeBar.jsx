import React from 'react'
import { TYPING_MODES } from '../config/modes'

const ModeBar = ({ selectedMode, onSelectMode }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bgSecondary)',
        borderBottomColor: 'var(--color-border)',
        borderBottomWidth: '1px'
      }}
      className="p-4 overflow-x-auto"
    >
      <div className="flex gap-3 justify-center flex-wrap sm:flex-nowrap max-w-full">
        {TYPING_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            style={{
              backgroundColor: selectedMode === mode.id ? 'var(--color-accent)' : 'var(--color-bg)',
              color: selectedMode === mode.id ? 'white' : 'var(--color-text)',
              borderColor: 'var(--color-border)',
              borderWidth: '1px',
              transition: 'all 0.2s ease'
            }}
            className="px-4 py-2 rounded-lg whitespace-nowrap hover:scale-105 transition-transform font-semibold text-sm"
          >
            {mode.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ModeBar
