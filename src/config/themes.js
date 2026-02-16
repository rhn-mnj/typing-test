export const THEMES = {
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      bg: '#FFFFFF',
      bgSecondary: '#F5F5F5',
      text: '#1A1A1A',
      textSecondary: '#666666',
      accent: '#7C3AED',
      accentLight: '#DDD6FE',
      border: '#E5E7EB',
      caret: '#7C3AED',
      correct: '#10B981',
      incorrect: '#EF4444',
      stat: '#7C3AED'
    }
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      bg: '#0F0F0F',
      bgSecondary: '#1A1A1A',
      text: '#E5E5E5',
      textSecondary: '#A0A0A0',
      accent: '#A78BFA',
      accentLight: '#3730A3',
      border: '#404040',
      caret: '#A78BFA',
      correct: '#84CC16',
      incorrect: '#FF6B6B',
      stat: '#A78BFA'
    }
  },
  nord: {
    id: 'nord',
    name: 'Nord',
    colors: {
      bg: '#2E3440',
      bgSecondary: '#3B4252',
      text: '#ECEFF4',
      textSecondary: '#D8DEE9',
      accent: '#88C0D0',
      accentLight: '#5E81AC',
      border: '#4C566A',
      caret: '#88C0D0',
      correct: '#A3BE8C',
      incorrect: '#BF616A',
      stat: '#88C0D0'
    }
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      bg: '#282A36',
      bgSecondary: '#21222C',
      text: '#F8F8F2',
      textSecondary: '#BD93F9',
      accent: '#FF79C6',
      accentLight: '#44475A',
      border: '#44475A',
      caret: '#FF79C6',
      correct: '#50FA7B',
      incorrect: '#FF5555',
      stat: '#FF79C6'
    }
  }
}

export const getTheme = (themeName) => {
  return THEMES[themeName] || THEMES.light
}

export const getAllThemes = () => {
  return Object.values(THEMES)
}
