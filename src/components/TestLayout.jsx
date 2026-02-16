import React from 'react'

const TestLayout = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg)',
        minHeight: 'calc(100vh - 120px)',
        color: 'var(--color-text)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px' }}>
        {children}
      </div>
    </div>
  )
}

export default TestLayout
