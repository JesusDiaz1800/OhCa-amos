import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useGameStore } from './stores/gameStore'
import { useThemeStore } from './stores/themeStore'
import Layout from './components/Layout'
import Home from './pages/Home'
import GameMode from './pages/GameMode'
import GamePlay from './pages/GamePlay'
import BoliviaMode from './pages/BoliviaMode'
import Settings from './pages/Settings'
import About from './pages/About'
import GameEngine from './components/GameEngine'

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
         <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-800 to-pink-600 transition-colors duration-300">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:mode" element={<GameMode />} />
          <Route path="/play/:gameType" element={<GamePlay />} />
          <Route path="/bolivia" element={<BoliviaMode />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/game-engine" element={<GameEngine />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
