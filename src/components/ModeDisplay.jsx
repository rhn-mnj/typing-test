import TypingTest from './TypingTest'

const ModeDisplay = ({ mode, isEmbedded = false }) => {
  if (isEmbedded) {
    // When embedded in the new layout, just show the test
    return <TypingTest mode={mode} />
  }

  // Legacy layout for backward compatibility
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg)',
        minHeight: '100vh',
        color: 'var(--color-text)',
        transition: 'all 0.3s ease'
      }}
      className="p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">
          {mode.name} Mode
        </h2>
        <p className="text-center mb-8" style={{ color: 'var(--color-textSecondary)' }}>
          {mode.description}
        </p>
        <TypingTest mode={mode} />
      </div>
    </div>
  )
}

export default ModeDisplay

