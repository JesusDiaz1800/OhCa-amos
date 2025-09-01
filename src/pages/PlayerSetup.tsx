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
  MapPin
} from 'lucide-react'

const PlayerSetup: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [players, setPlayers] = useState<string[]>([''])
  const [currentMode, setCurrentMode] = useState<string>('classic')
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const mode = searchParams.get('mode') || 'classic'
    setCurrentMode(mode)
  }, [searchParams])

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
      // Guardar jugadores en localStorage
      localStorage.setItem('gamePlayers', JSON.stringify(validPlayers))
      localStorage.setItem('gameMode', currentMode)
      
      // Efecto de confeti
      setShowConfetti(true)
      setTimeout(() => {
        navigate('/game-sub-mode-selector')
      }, 1000)
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
        {/* Header */}
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
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              ¡Agrega a tus Amigos!
            </h1>
            <p className="text-white/80">
              Cuantos más, más divertido será
            </p>
          </motion.div>

          <div className="w-12"></div> {/* Spacer para centrar */}
        </motion.div>

        {/* Modo actual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className={`bg-gradient-to-br ${currentModeInfo.bgColor} backdrop-blur-sm rounded-2xl p-6 border-2 ${currentModeInfo.borderColor} max-w-md mx-auto`}>
            <div className="flex items-center justify-center gap-4">
              <motion.div
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentModeInfo.color} flex items-center justify-center text-white`}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                {currentModeInfo.icon}
              </motion.div>
              <div className="text-center">
                <div className="text-4xl mb-2">{currentModeInfo.emoji}</div>
                <h2 className="text-2xl font-bold text-white">{currentModeInfo.title}</h2>
                <p className="text-white/80 text-sm">Modo seleccionado</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Player Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                👥
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Lista de Jugadores
              </h2>
              <p className="text-white/80">
                Mínimo 2, máximo 12 jugadores
              </p>
            </div>

            {/* Player inputs */}
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
                        className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border-2 border-white/20 rounded-2xl px-6 py-4 text-lg font-medium focus:outline-none focus:border-white/40 transition-all duration-300"
                      />
                      <motion.div
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
                        animate={player.trim() !== '' ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <User className="w-5 h-5" />
                      </motion.div>
                    </motion.div>

                    {players.length > 1 && (
                      <motion.button
                        onClick={() => handleRemovePlayer(index)}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 p-3 rounded-full border border-red-400/30 transition-all duration-300"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add player button */}
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
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl border border-white/20 transition-all duration-300 inline-flex items-center gap-3"
                >
                  <Plus className="w-6 h-6" />
                  Agregar Jugador
                </motion.button>
              </motion.div>
            )}

            {/* Player count */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-4">
                  <motion.div
                    className="text-3xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    👥
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {players.filter(p => p.trim() !== '').length} Jugadores
                    </div>
                    <div className="text-white/60 text-sm">
                      {players.length < 2 ? 'Necesitas al menos 2 jugadores' : 
                       players.length >= 12 ? '¡Máximo alcanzado!' : 
                       '¡Perfecto para una gran fiesta!'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                onClick={handleNext}
                disabled={!isValid}
                whileHover={isValid ? { scale: 1.05, y: -5 } : {}}
                whileTap={isValid ? { scale: 0.95 } : {}}
                className={`relative font-bold py-6 px-12 rounded-full text-2xl shadow-2xl transition-all duration-300 transform border-2 border-white/20 overflow-hidden inline-flex items-center gap-3 ${
                  isValid 
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 hover:-translate-y-2' 
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                {/* Efecto de brillo */}
                {isValid && (
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
                
                <span className="relative z-10 flex items-center gap-3">
                  <PartyPopper className="w-8 h-8" />
                  ¡Siguiente!
                  <motion.div
                    animate={isValid ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <motion.div
              className="text-4xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💡
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">
              Consejos para la Mejor Fiesta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Usa nombres divertidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Incluye a todos</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>¡Mantén la energía!</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlayerSetup
