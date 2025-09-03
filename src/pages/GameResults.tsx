import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  Trophy, 
  Award, 
  Crown, 
  Star, 
  Beer, 
  Wine, 
  GlassWater,
  ArrowLeft,
  Home,
  Share2,
  Camera,
  Download,
  Users,
  TrendingUp,
  Zap,
  Heart,
  Brain,
  Target,
  Sparkles,
  PartyPopper,
  Flag,
  Globe,
  MapPin,
  Gamepad2,
  Clock,
  Volume2,
  VolumeX,
  Settings,
  RotateCcw,
  Play
} from 'lucide-react'

interface PlayerStats {
  name: string
  drinks: number
  correctAnswers: number
  wrongAnswers: number
  skips: number
  totalScore: number
}

const GameResults: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  // Obtener datos del juego desde URL params o localStorage
  const playersParam = searchParams.get('players') || ''
  const drinksParam = searchParams.get('drinks') || ''
  const gameMode = searchParams.get('mode') || 'classic'
  const totalCards = parseInt(searchParams.get('totalCards') || '0')
  const skipCount = parseInt(searchParams.get('skipCount') || '0')

  const players = playersParam ? playersParam.split(',') : []
  const drinks = drinksParam ? JSON.parse(decodeURIComponent(drinksParam)) : {}

  // Calcular estadísticas
  const playerStats: PlayerStats[] = players.map(player => ({
    name: player,
    drinks: drinks[player] || 0,
    correctAnswers: Math.floor(Math.random() * 10), // Simulado
    wrongAnswers: Math.floor(Math.random() * 5), // Simulado
    skips: Math.floor(Math.random() * 3), // Simulado
    totalScore: (drinks[player] || 0) * 10 + Math.floor(Math.random() * 50) // Simulado
  }))

  // Ordenar por puntuación (menos tragos = mejor)
  const sortedStats = [...playerStats].sort((a, b) => a.drinks - b.drinks)

  useEffect(() => {
    // Efectos iniciales
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2000)
  }, [])

  const handlePlayAgain = () => {
    navigate('/mode-selector')
  }

  const handleNewGame = () => {
    navigate('/')
  }

  const handleShare = () => {
    // Compartir resultados
    const text = `🎉 ¡Terminé el juego en ¡Oh Cañamos?!\n\n🏆 Ganador: ${sortedStats[0]?.name}\n🍺 Total de tragos: ${Object.values(drinks).reduce((a: any, b: any) => a + b, 0)}\n\n¡Juega tú también!`
    
    if (navigator.share) {
      navigator.share({
        title: '¡Oh Cañamos? - Resultados',
        text: text,
        url: window.location.origin
      })
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(text)
      alert('¡Resultados copiados al portapapeles!')
    }
  }

  const getWinnerIcon = (position: number) => {
    switch (position) {
      case 0: return '🥇'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return '🎉'
    }
  }

  const getPlayerColor = (position: number) => {
    switch (position) {
      case 0: return 'from-yellow-400 to-orange-500'
      case 1: return 'from-gray-300 to-gray-400'
      case 2: return 'from-orange-600 to-red-700'
      default: return 'from-purple-600 to-pink-600'
    }
  }

  const totalDrinks = Object.values(drinks).reduce((a: any, b: any) => a + b, 0)
  const averageDrinks = totalDrinks / players.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Confeti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                }}
                initial={{ y: -10, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 10, 
                  opacity: [1, 1, 0],
                  rotate: [0, 360, 720]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  ease: "easeOut"
                }}
              >
                {['🎉', '🎊', '✨', '🌟', '💫', '⭐', '🍺', '🥂', '🏆', '👑', '💎', '🔥'][Math.floor(Math.random() * 12)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Sparkles */}
      <AnimatePresence>
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none z-40">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate('/')}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-6 h-6" />
          </motion.button>

          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🏆
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">
              ¡Fin del Juego!
            </h1>
            <p className="text-white/80">
              Resultados de la fiesta
            </p>
          </motion.div>

          <motion.button
            onClick={() => setShowSettings(true)}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Estadísticas generales */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <motion.div
              className="text-4xl mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🍺
            </motion.div>
            <div className="text-white/80 text-sm">Total Tragos</div>
            <div className="text-white font-bold text-2xl">{totalDrinks}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <motion.div
              className="text-4xl mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              👥
            </motion.div>
            <div className="text-white/80 text-sm">Jugadores</div>
            <div className="text-white font-bold text-2xl">{players.length}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <motion.div
              className="text-4xl mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              🎯
            </motion.div>
            <div className="text-white/80 text-sm">Promedio</div>
            <div className="text-white font-bold text-2xl">{averageDrinks.toFixed(1)}</div>
          </div>
        </motion.div>

        {/* Podio */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            🏆 Podio de Ganadores
          </h2>
          
          <div className="flex flex-col items-center space-y-4">
            {sortedStats.slice(0, 3).map((player, index) => (
              <motion.div
                key={player.name}
                className={`w-full max-w-md bg-gradient-to-r ${getPlayerColor(index)} backdrop-blur-sm rounded-2xl p-6 border border-white/20`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {getWinnerIcon(index)}
                    </motion.div>
                    <div>
                      <div className="text-white font-bold text-xl">{player.name}</div>
                      <div className="text-white/80 text-sm">
                        {player.drinks} tragos • {player.totalScore} puntos
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-2xl">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lista completa de jugadores */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white text-center mb-4">
            📊 Estadísticas Completas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedStats.map((player, index) => (
              <motion.div
                key={player.name}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getWinnerIcon(index)}</div>
                    <div>
                      <div className="text-white font-bold">{player.name}</div>
                      <div className="text-white/60 text-sm">
                        Posición #{index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">
                      {player.drinks} 🍺
                    </div>
                    <div className="text-white/60 text-sm">
                      {player.totalScore} pts
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            onClick={handlePlayAgain}
            className="viral-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="inline-block w-6 h-6 mr-2" />
            Jugar de Nuevo
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="inline-block w-6 h-6 mr-2" />
            Compartir
          </motion.button>

          <motion.button
            onClick={handleNewGame}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="inline-block w-6 h-6 mr-2" />
            Nueva Partida
          </motion.button>
        </motion.div>

        {/* Mensaje final */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎉
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">
              ¡Gracias por jugar!
            </h3>
            <p className="text-white/80">
              Esperamos que hayas tenido una fiesta increíble. 
              ¡Recuerda beber con responsabilidad y divertirte!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Configuración</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Sonido</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      soundEnabled ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl mt-6"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GameResults
