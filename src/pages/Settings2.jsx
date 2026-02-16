import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getAllThemes } from '../config/themes'

const Settings = ({ onBack }) => {
  const { currentTheme, changeTheme } = useTheme()
  const themes = getAllThemes()

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

        <h1 className="text-4xl font-bold mb-12">Settings</h1>

        {/* Theme Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Theme</h2>
          <p className="mb-6" style={{ color: 'var(--color-textSecondary)' }}>
            Choose your preferred color theme
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                style={{
                  backgroundColor: theme.colors.bgSecondary,
                  borderColor: currentTheme === theme.id ? theme.colors.accent : theme.colors.border,
                  borderWidth: currentTheme === theme.id ? '3px' : '1px',
                  boxShadow:
                    currentTheme === theme.id
                      ? `0 0 0 2px ${theme.colors.bg}, 0 0 0 4px ${theme.colors.accent}`
                      : 'none',
                  transition: 'all 0.2s ease'
                }}
                className="p-6 rounded-lg text-center hover:scale-105 transition-transform"
              >
                {/* Color preview dots */}
                <div className="flex justify-center gap-2 mb-4">
                  <div
                    style={{ backgroundColor: theme.colors.accent }}
                    className="w-6 h-6 rounded-full"
                  />
                  <div
                    style={{ backgroundColor: theme.colors.correct }}
                    className="w-6 h-6 rounded-full"
                  />
                  <div
                    style={{ backgroundColor: theme.colors.incorrect }}
                    className="w-6 h-6 rounded-full"
                  />
                </div>

                <h3
                  style={{ color: theme.colors.text }}
                  className="font-semibold text-lg"
                >
                  {theme.name}
                </h3>

                {currentTheme === theme.id && (
                  <div
                    style={{ color: theme.colors.accent }}
                    className="text-xs font-bold mt-2"
                  >
                    ACTIVE
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Other settings section (future) */}
        <div className="mt-12 pt-8" style={{ borderTopColor: 'var(--color-border)', borderTopWidth: '1px' }}>
          <h2 className="text-2xl font-semibold mb-4">More Options Coming Soon</h2>
          <ul style={{ color: 'var(--color-textSecondary)' }} className="space-y-2">
            <li>• Sound toggle</li>
            <li>• Difficulty presets</li>
            <li>• Custom colors</li>
            <li>• Font selection</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings
