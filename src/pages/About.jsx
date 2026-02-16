import React from 'react'
import { ArrowLeft } from 'lucide-react'

const About = ({ onBack }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg)',
        minHeight: 'calc(100vh - 60px)',
        color: 'var(--color-text)',
        transition: 'all 0.3s ease'
      }}
      className="p-8"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 hover:opacity-80 transition"
          style={{ color: 'var(--color-accent)' }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold mb-12">About TypeMaster</h1>

        <div
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            borderColor: 'var(--color-border)',
            borderWidth: '1px'
          }}
          className="rounded-lg p-8 space-y-6"
        >
          <p className="text-lg" style={{ color: 'var(--color-textSecondary)' }}>
            TypeMaster is a modern typing speed test application designed to help you improve your typing skills with real-time feedback and beautiful, theme-able design.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
              Features
            </h2>
            <ul
              className="space-y-2"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              <li>⚡ Real-time WPM (Words Per Minute) calculation</li>
              <li>🎯 Accuracy tracking with per-word analysis</li>
              <li>🎨 Multiple color themes (Light, Dark, Nord, Dracula)</li>
              <li>📊 Performance graphs and history tracking</li>
              <li>🌊 Monkeytype-inspired interface</li>
              <li>⏱️ Multiple test modes (timed and word-based)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
              How It Works
            </h2>
            <p style={{ color: 'var(--color-textSecondary)' }}>
              Choose a test mode, start typing the displayed text as accurately and quickly as possible. Your speed, accuracy, and per-word performance will be calculated in real-time. Your results are automatically saved and can be viewed in your test history.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
              Test Modes
            </h2>
            <ul
              className="space-y-2"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              <li><strong>Extended (120s)</strong> - Long-form typing test</li>
              <li><strong>Standard (60s)</strong> - Classic typing test</li>
              <li><strong>Sprint (30s)</strong> - Quick typing challenge</li>
              <li><strong>Hard Mode</strong> - Advanced vocabulary</li>
              <li><strong>Word Limits (10/25/50/100)</strong> - Focus on accuracy</li>
            </ul>
          </div>

          <div
            style={{
              borderTopColor: 'var(--color-border)',
              borderTopWidth: '1px',
              paddingTop: '24px'
            }}
          >
            <p className="text-center" style={{ color: 'var(--color-textSecondary)' }}>
              Built with React, Vite, Tailwind CSS, and Recharts
            </p>
            <p className="text-center text-sm mt-4" style={{ color: 'var(--color-textSecondary)' }}>
              Made with ❤️ for typing enthusiasts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About