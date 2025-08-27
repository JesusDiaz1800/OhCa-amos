import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Users, 
  Zap, 
  Crown, 
  Star, 
  Sparkles,
  ArrowRight,
  Flame,
  Heart,
  Trophy,
  Target,
  Gamepad2
} from 'lucide-react'
import { gameModes } from '../data/gameData'

interface GameModeSelectorProps {
  onModeSelect: (mode: string) => void
  onStartGame: () => void
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect, onStartGame }) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId)
    onModeSelect(modeId)
    
    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low':
        return 'neon-green'
      case 'medium':
        return 'neon-orange'
      case 'high':
        return 'neon-red'
      default:
        return 'neon-purple'
    }
  }

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case 'low':
        return '🟢'
      case 'medium':
        return '🟡'
      case 'high':
        return '🔴'
      default:
        return '🟣'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-15 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          
                         <h1 className="text-6xl md:text-8xl font-bold mb-6">
                 <span className="text-gradient neon-text">
                   ¡Oh Cañamos?
                 </span>
               </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-medium">
            Selecciona tu modo de fiesta
          </p>
          
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold neon-yellow">12+</div>
              <div className="text-sm text-white/70">Juegos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold neon-pink">500+</div>
              <div className="text-sm text-white/70">Preguntas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold neon-purple">∞</div>
              <div className="text-sm text-white/70">Diversión</div>
            </div>
          </div>
        </motion.div>

        {/* Game Modes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {gameModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotate: selectedMode === mode.id ? 2 : 0
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeSelect(mode.id)}
              className={`relative cursor-pointer group ${
                selectedMode === mode.id ? 'ring-4 ring-pink-500 ring-opacity-50' : ''
              }`}
            >
              <motion.div
                className={`${mode.color} rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 backdrop-blur-sm relative overflow-hidden`}
                animate={selectedMode === mode.id ? { 
                  boxShadow: [
                    "0 0 30px rgba(236, 72, 153, 0.5)",
                    "0 0 60px rgba(236, 72, 153, 0.8)",
                    "0 0 30px rgba(236, 72, 153, 0.5)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: selectedMode === mode.id ? Infinity : 0 }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 text-4xl">{mode.icon}</div>
                  <div className="absolute bottom-4 left-4 text-2xl">🎉</div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-4 animate-bounce-slow">{mode.icon}</div>
                  
                  <h3 className="text-2xl font-bold mb-3 neon-text">{mode.name}</h3>
                  
                  <p className="text-sm opacity-90 mb-4 leading-relaxed">
                    {mode.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                      {mode.minPlayers}-{mode.maxPlayers} jugadores
                    </span>
                    <span className={`text-lg ${getIntensityColor(mode.intensity)}`}>
                      {getIntensityIcon(mode.intensity)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-white/70" />
                      <span className="text-xs text-white/70">
                        {mode.intensity === 'low' ? 'Suave' : 
                         mode.intensity === 'medium' ? 'Medio' : 'Intenso'}
                      </span>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: selectedMode === mode.id ? 1 : 0, x: selectedMode === mode.id ? 0 : -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={20} className="text-white animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                {/* Selection indicator */}
                <AnimatePresence>
                  {selectedMode === mode.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star size={16} className="text-pink-500" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            disabled={!selectedMode}
            className={`btn-primary text-xl px-12 py-6 flex items-center space-x-4 mx-auto ${
              !selectedMode ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Play size={32} />
            <span className="text-2xl font-bold">¡Empezar Fiesta!</span>
            <Zap size={28} />
            <Sparkles size={24} />
          </motion.button>
          
          {!selectedMode && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 mt-4 text-lg"
            >
              Selecciona un modo para continuar
            </motion.p>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-pink">
              <Gamepad2 className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 neon-pink">Juegos Variados</h3>
            <p className="text-white/80">
              Desde clásicos hasta juegos únicos bolivianos
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-orange">
              <Flame className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 neon-orange">Contenido Viral</h3>
            <p className="text-white/80">
              Preguntas y retos súper divertidos y picantes
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-cyan">
              <Trophy className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 neon-cyan">Experiencia Premium</h3>
            <p className="text-white/80">
              Diseño impactante y animaciones fluidas
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default GameModeSelector
