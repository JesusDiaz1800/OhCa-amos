import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Users, 
  User, 
  Crown, 
  Star, 
  Heart, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Gamepad2,
  Flag,
  PartyPopper,
  Beer,
  Wine,
  Music,
  Camera,
  Globe,
  MapPin,
  CheckCircle,
  AlertCircle,
  Smile,
  Trophy,
  Target,
  Flame,
  Palette,
  Gift,
  Lightbulb,
  Rocket,
  Diamond
} from 'lucide-react'

const PlayerSetup: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [players, setPlayers] = useState<string[]>([''])
  const [currentMode, setCurrentMode] = useState<string>('classic')
  const [showConfetti, setShowConfetti] = useState(false)
  const [hoveredPlayer, setHoveredPlayer] = useState<number | null>(null)
  const [showTips, setShowTips] = useState(false)
  const [currentTip, setCurrentTip] = useState('')
  const [playerCount, setPlayerCount] = useState(0)
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    const mode = searchParams.get('mode') || 'classic'
    setCurrentMode(mode)
  }, [searchParams])

  useEffect(() => {
    const count = players.filter(p => p.trim() !== '').length
    setPlayerCount(count)
  }, [players])

  const getRandomTip = () => {
    const tips = [
      '🎭 Usa nombres creativos y divertidos',
      '🌟 Incluye a todos en la diversión',
      '🔥 Mantén la energía alta',
      '💎 Los mejores jugadores tienen los mejores nombres',
      '🚀 Cuantos más, más caótico y divertido',
      '🎪 Los apodos siempre son bienvenidos',
      '⚡ La creatividad no tiene límites',
      '🎨 Personaliza tu experiencia de juego'
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  const showRandomTip = () => {
    setCurrentTip(getRandomTip())
    setShowTips(true)
    setTimeout(() => setShowTips(false), 4000)
  }

  const handleAddPlayer = () => {
    if (players.length < 12) {
      setPlayers([...players, ''])
    }
  }

  const handleRemovePlayer = (index: number) => {
    if (players.length > 1) {
      const newPlayers = players.filter((_, i) => i !== index)
      setPlayers(newPlayers)
    }
  }

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players]
    newPlayers[index] = value
    setPlayers(newPlayers)
  }

  const handleNext = () => {
    const validPlayers = players.filter(player => player.trim() !== '')
    if (validPlayers.length >= 2) {
      setIsValidating(true)
      
      // Guardar jugadores en localStorage
      localStorage.setItem('gamePlayers', JSON.stringify(validPlayers))
      localStorage.setItem('gameMode', currentMode)
      
      // Efecto de confeti
      setShowConfetti(true)
      setTimeout(() => {
        navigate(`/game-sub-mode-selector?mode=${currentMode}`)
      }, 1500)
    }
  }

  const handleBack = () => {
    navigate('/mode-selector')
  }

  const isValid = players.filter(player => player.trim() !== '').length >= 2

  const modeInfo = {
    classic: {
      title: 'Modo Clásico',
      icon: <Gamepad2 className="w-8 h-8" />,
      color: 'from-blue-500 via-purple-600 to-indigo-700',
      bgColor: 'from-blue-900/20 via-purple-900/20 to-indigo-900/20',
      borderColor: 'border-blue-400/30',
      particles: [Beer, Wine, Music, Camera],
      emoji: '🎮'
    },
    bolivia: {
      title: 'Modo Bolivia',
      icon: <Flag className="w-8 h-8" />,
      color: 'from-green-500 via-yellow-500 to-orange-600',
      bgColor: 'from-green-900/20 via-yellow-900/20 to-orange-900/20',
      borderColor: 'border-green-400/30',
      particles: [Globe, MapPin, Heart, Star],
      emoji: '🇧🇴'
    }
  }

  const currentModeInfo = modeInfo[currentMode as keyof typeof modeInfo] || modeInfo.classic

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 relative overflow-hidden">
      {/* Efectos de fondo dinámicos */}
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
            {[...Array(50)].map((_, i) => (
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
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut"
                }}
              >
                {['🎉', '🎊', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🎭
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              ¡Agrega a tus Amigos!
            </h1>
            <p className="text-white/90 text-lg">
              Cuantos más, más divertido será
            </p>
          </motion.div>

          <motion.button
            onClick={showRandomTip}
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <Lightbulb className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Modo actual mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className={`bg-gradient-to-br ${currentModeInfo.bgColor} backdrop-blur-sm rounded-3xl p-8 border-2 ${currentModeInfo.borderColor} max-w-lg mx-auto shadow-2xl`}>
            <div className="flex items-center justify-center gap-6">
              <motion.div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentModeInfo.color} flex items-center justify-center text-white shadow-lg`}
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {currentModeInfo.icon}
              </motion.div>
              <div className="text-center">
                <motion.div 
                  className="text-5xl mb-3"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {currentModeInfo.emoji}
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">{currentModeInfo.title}</h2>
                <p className="text-white/90 text-lg">Modo seleccionado</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Diamond className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/80 text-sm">Listo para la diversión</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Player Input Section Mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <motion.div
                className="text-7xl mb-6"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                👥
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lista de Jugadores
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Mínimo 2, máximo 12 jugadores
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Nombres creativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Apodos bienvenidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Incluye a todos</span>
                </div>
              </div>
            </div>

            {/* Player inputs mejorados */}
            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {players.map((player, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4"
                    onMouseEnter={() => setHoveredPlayer(index)}
                    onMouseLeave={() => setHoveredPlayer(null)}
                  >
                    <motion.div
                      className="flex-1 relative"
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="text"
                        value={player}
                        onChange={(e) => handlePlayerChange(index, e.target.value)}
                        placeholder={`Jugador ${index + 1}`}
                        className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border-2 border-white/20 rounded-2xl px-12 py-5 text-lg font-medium focus:outline-none focus:border-white/40 transition-all duration-300 shadow-lg"
                      />
                      <motion.div
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
                        animate={player.trim() !== '' ? { scale: [1, 1.2, 1], color: '#fbbf24' } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {player.trim() !== '' ? <Smile className="w-6 h-6" /> : <User className="w-6 h-6" />}
                      </motion.div>
                      
                      {player.trim() !== '' && (
                        <motion.div
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                      )}
                    </motion.div>

                    {players.length > 1 && (
                      <motion.button
                        onClick={() => handleRemovePlayer(index)}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 p-4 rounded-full border border-red-400/30 transition-all duration-300 shadow-lg"
                      >
                        <X className="w-6 h-6" />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add player button mejorado */}
            {players.length < 12 && (
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={handleAddPlayer}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 backdrop-blur-sm text-white font-bold py-5 px-10 rounded-2xl border border-white/20 transition-all duration-300 inline-flex items-center gap-3 shadow-lg"
                >
                  <Plus className="w-7 h-7" />
                  <span className="text-lg">Agregar Jugador</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Gift className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}

            {/* Player count mejorado */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-center gap-6">
                  <motion.div
                    className="text-5xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    👥
                  </motion.div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {playerCount} Jugadores
                    </div>
                    <div className="text-white/80 text-lg">
                      {playerCount < 2 ? (
                        <div className="flex items-center gap-2 text-red-300">
                          <AlertCircle className="w-5 h-5" />
                          <span>Necesitas al menos 2 jugadores</span>
                        </div>
                      ) : playerCount >= 12 ? (
                        <div className="flex items-center gap-2 text-yellow-300">
                          <Trophy className="w-5 h-5" />
                          <span>¡Máximo alcanzado!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-300">
                          <Target className="w-5 h-5" />
                          <span>¡Perfecto para una gran fiesta!</span>
                        </div>
                      )}
                    </div>
                    {playerCount >= 2 && (
                      <motion.div
                        className="mt-3 flex items-center justify-center gap-2 text-yellow-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Flame className="w-4 h-4" />
                        <span className="text-sm">¡Listo para la diversión!</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next button mejorado */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                onClick={handleNext}
                disabled={!isValid || isValidating}
                whileHover={isValid && !isValidating ? { scale: 1.05, y: -5 } : {}}
                whileTap={isValid && !isValidating ? { scale: 0.95 } : {}}
                className={`relative font-bold py-8 px-16 rounded-full text-3xl shadow-2xl transition-all duration-300 transform border-2 border-white/20 overflow-hidden inline-flex items-center gap-4 ${
                  isValid && !isValidating
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 hover:-translate-y-2' 
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                {/* Efecto de brillo */}
                {isValid && !isValidating && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-4">
                  {isValidating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Rocket className="w-8 h-8" />
                      </motion.div>
                      <span>Preparando...</span>
                    </>
                  ) : (
                    <>
                      <PartyPopper className="w-8 h-8" />
                      <span>¡Siguiente!</span>
                      <motion.div
                        animate={isValid ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Consejos mejorados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-3xl mx-auto shadow-2xl">
            <motion.div
              className="text-5xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💡
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Consejos para la Mejor Fiesta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-white/80">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Usa nombres divertidos</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Incluye a todos</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Zap className="w-5 h-5 text-blue-400" />
                <span>¡Mantén la energía!</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Palette className="w-5 h-5 text-green-400" />
                <span>Sé creativo</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consejo flotante */}
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl max-w-md">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-6 h-6 text-yellow-300" />
                  <span className="text-white font-bold">Consejo del Día</span>
                </div>
                <p className="text-white/90 text-lg">{currentTip}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PlayerSetup
