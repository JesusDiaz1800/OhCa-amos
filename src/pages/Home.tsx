import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Play, 
  Zap,
  Gamepad2,
  Star,
  Heart,
  Trophy,
  Sparkles,
  PartyPopper,
  Flame,
  Crown,
  Target,
  Rocket,
  Diamond,
  Music,
  Camera,
  Globe,
  Users,
  Award,
  Gift
} from 'lucide-react'

const Home = () => {
  const [currentEmoji, setCurrentEmoji] = useState('🍺')
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const emojis = ['🍺', '🎉', '🎊', '✨', '🔥', '⚡', '🎭', '🎪']
    const interval = setInterval(() => {
      setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setShowParticles(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 relative overflow-hidden">
      {/* Efectos de fondo dinámicos */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-red-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Partículas flotantes */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/30 text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-20, -100, -200]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              >
                {['✨', '🌟', '💫', '⭐', '🎉', '🎊'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Emoji principal animado */}
          <motion.div
            className="text-8xl md:text-9xl mb-8"
            variants={itemVariants}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {currentEmoji}
          </motion.div>

          {/* Título principal */}
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl"
            variants={itemVariants}
          >
            ¡Oh Cañamos?
          </motion.h1>

          {/* Subtítulo viral */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <motion.p 
                className="text-2xl md:text-3xl text-white font-bold mb-3"
                animate={{
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                La App #1 para la Fiesta Más Viral
              </motion.p>
              <div className="flex items-center justify-center gap-4 text-white/80">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="w-6 h-6 text-yellow-400" />
                </motion.div>
                <span className="text-lg">✨ Diversión sin límites • Momentos inolvidables ✨</span>
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Características principales */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎮
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">25+ Juegos</h3>
                <p className="text-white/80">Experiencias únicas</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ⚡
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Diseño Viral</h3>
                <p className="text-white/80">Efecto wow garantizado</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🇧🇴
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Sabor Local</h3>
                <p className="text-white/80">Cultura boliviana</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Botón principal viral */}
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/mode-selector"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold py-6 px-16 rounded-full text-2xl shadow-2xl hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/20 overflow-hidden inline-flex items-center gap-4"
              >
                {/* Efecto de brillo */}
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
                
                <span className="relative z-10 flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <PartyPopper className="w-8 h-8" />
                  </motion.div>
                  <span>✨ ¡Empezar la Fiesta! ✨</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mensaje de responsabilidad */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 max-w-md mx-auto"
          >
            <p className="text-sm text-white/70">
              🍻 Bebe responsablemente • ¡La diversión es mejor con amigos!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
