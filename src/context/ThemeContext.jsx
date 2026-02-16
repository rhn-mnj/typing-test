import React, { createContext, useState, useEffect, useCallback } from 'react'
import { getTheme } from '../config/themes'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    return localStorage.getItem('selectedTheme') || 'light'
  })

  const applyTheme = useCallback((themeName) => {
    const theme = getTheme(themeName)
    const root = document.documentElement

    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Apply data attribute for CSS selectors
    root.setAttribute('data-theme', themeName)

    // Save to localStorage
    localStorage.setItem('selectedTheme', themeName)
    setCurrentTheme(themeName)
  }, [])

  // Apply initial theme on mount
  useEffect(() => {
    applyTheme(currentTheme)
  }, [])

  const changeTheme = (themeName) => {
    applyTheme(themeName)
  }

  const value = {
    currentTheme,
    changeTheme,
    getTheme: () => getTheme(currentTheme)
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
