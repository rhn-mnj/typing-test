import React from 'react'
import { Settings, BarChart3, HelpCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Navbar = ({ onNavigate, currentPage }) => {
  const { currentTheme } = useTheme()

  return (
    <nav
      style={{
        backgroundColor: 'var(--color-bgSecondary)',
        borderBottom: 'solid 1px var(--color-border)',
        transition: 'all 0.3s ease'
      }}
      className="p-4 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 font-bold text-2xl hover:opacity-80 transition"
        >
          <span style={{ color: 'var(--color-accent)' }}>⌨️</span>
          <span style={{ color: 'var(--color-text)' }}>TypeMaster</span>
        </button>

        {/* Right Navigation */}
        <div className="flex items-center gap-4">
          {/* Navbar links */}
          <button
            onClick={() => onNavigate('history')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
            title="View test history"
          >
            <BarChart3 size={20} />
            <span className="hidden sm:inline text-sm">History</span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
            title="About this app"
          >
            <HelpCircle size={20} />
            <span className="hidden sm:inline text-sm">About</span>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
            title="Settings"
          >
            <Settings size={20} />
            <span className="hidden sm:inline text-sm">Settings</span>
          </button>

          {/* Current theme indicator */}
          <div
            className="text-xs px-2 py-1 rounded-full ml-2"
            style={{
              backgroundColor: 'var(--color-accentLight)',
              color: 'var(--color-accent)'
            }}
          >
            {currentTheme}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
