import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useGameStore } from './stores/gameStore'
import { useThemeStore } from './stores/themeStore'
import Layout from './components/Layout'
import SplashScreen from './pages/SplashScreen'
import Home from './pages/Home'
import ModeSelector from './pages/ModeSelector'
import PlayerSetup from './pages/PlayerSetup'
import GameSubModeSelector from './pages/GameSubModeSelector'

import BoliviaMode from './pages/BoliviaMode'
import Settings from './pages/Settings'
import About from './pages/About'
import GameEngine from './components/GameEngine'
import TestGame from './pages/TestGame'

function App() {
  const { initializeGame } = useGameStore()
  const { theme, initializeTheme } = useThemeStore()

  useEffect(() => {
    initializeTheme()
    initializeGame()
  }, [initializeTheme, initializeGame])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 transition-colors duration-300">
      <Layout>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mode-selector" element={<ModeSelector />} />
          <Route path="/player-setup" element={<PlayerSetup />} />
          <Route path="/game-sub-mode-selector" element={<GameSubModeSelector />} />

          <Route path="/bolivia" element={<BoliviaMode />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/game-engine" element={<GameEngine />} />
          <Route path="/test" element={<TestGame />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
