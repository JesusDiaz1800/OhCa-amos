import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import SplashScreen from './pages/SplashScreen'
import Home from './pages/Home'
import ModeSelector from './pages/ModeSelector'
import PlayerSetup from './pages/PlayerSetup'
import GameSubModeSelector from './pages/GameSubModeSelector'
import GameEngine from './components/GameEngine'
import TestGame from './pages/TestGame'
import GameResults from './pages/GameResults'
import Layout from './components/Layout'
import { useThemeStore } from './stores/themeStore'

// Nuevos sistemas implementados
import SoundManager from './components/SoundManager'
import AchievementSystem from './components/AchievementSystem'
import ThemeToggle from './components/ThemeToggle'
import TouchGestures from './components/TouchGestures'

const App: React.FC = () => {
  const themeStore = useThemeStore()
  
  // Inicializar tema al cargar la aplicación
  useEffect(() => {
    themeStore.initializeTheme()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600">
      <Layout>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mode-selector" element={<ModeSelector />} />
          <Route path="/player-setup" element={<PlayerSetup />} />
          <Route path="/game-sub-mode-selector" element={<GameSubModeSelector />} />
          <Route path="/game-engine" element={<GameEngine />} />
          <Route path="/game-results" element={<GameResults />} />
          <Route path="/test" element={<TestGame />} />
        </Routes>
      </Layout>

      {/* Sistemas globales de la aplicación */}
      <SoundManager />
      <AchievementSystem />
      <ThemeToggle />
      <TouchGestures />
    </div>
  )
}

export default App
