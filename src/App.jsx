import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './layouts/Navbar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import About from './pages/About'
import ResultsHistory from './pages/ResultsHistory'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <ThemeProvider>
      <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', transition: 'background-color 0.3s ease' }}>
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />

        {currentPage === 'home' && <Home />}
        {currentPage === 'settings' && <Settings onBack={() => setCurrentPage('home')} />}
        {currentPage === 'about' && <About onBack={() => setCurrentPage('home')} />}
        {currentPage === 'history' && <ResultsHistory onBack={() => setCurrentPage('home')} />}
      </div>
    </ThemeProvider>
  )
}

export default App