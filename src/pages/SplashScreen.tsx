import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PartyPopper, Sparkles, Heart, Beer, Wine, Zap, Crown, Star, Flame, Music, Camera, Gamepad2 } from 'lucide-react'

const SplashScreen: React.FC = () => {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Mostrar contenido después de 300ms
    const timer1 = setTimeout(() => setShowContent(true), 300)
    // Mostrar partículas después de 800ms
    const timer2 = setTimeout(() => setShowParticles(true), 800)
    // Mostrar botón después de 1.5 segundos
    const timer3 = setTimeout(() => setShowButton(true), 1500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleStart = () => {
    navigate('/mode-selector')
  }

  // Partículas flotantes
  const particles = [
    { icon: Beer, delay: 0, duration: 8 },
    { icon: Wine, delay: 1, duration: 10 },
    { icon: Sparkles, delay: 2, duration: 12 },
    { icon: Heart, delay: 3, duration: 9 },
    { icon: Star, delay: 4, duration: 11 },
    { icon: Crown, delay: 5, duration: 7 },
    { icon: Flame, delay: 6, duration: 13 },
    { icon: Music, delay: 7, duration: 8 },
    { icon: Camera, delay: 8, duration: 10 },
    { icon: Gamepad2, delay: 9, duration: 9 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 flex items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo dinámicos */}
      <div className="absolute inset-0">
        {/* Gradiente animado de fondo */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-600/20 to-yellow-500/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(251, 146, 60, 0.2), rgba(239, 68, 68, 0.2), rgba(251, 191, 36, 0.2))",
              "linear-gradient(45deg, rgba(251, 191, 36, 0.2), rgba(251, 146, 60, 0.2), rgba(239, 68, 68, 0.2))",
              "linear-gradient(45deg, rgba(239, 68, 68, 0.2), rgba(251, 191, 36, 0.2), rgba(251, 146, 60, 0.2))",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Partículas flotantes */}
        <AnimatePresence>
          {showParticles && particles.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute text-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                y: [-20, -100],
                x: [0, Math.random() * 40 - 20],
                rotate: [0, 360]
              }}
              transition={{
                delay: particle.delay,
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <particle.icon size={Math.random() * 30 + 20} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Efectos de luz */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Logo principal con efectos */}
              <motion.div
                className="mb-12"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Emoji principal con efectos */}
                <motion.div
                  className="text-9xl mb-6 inline-block"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🍺
                </motion.div>
                
                {/* Título principal */}
                <motion.h1 
                  className="text-7xl md:text-8xl font-black mb-4 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  ¡Oh Cañamos?
                </motion.h1>
                
                {/* Subtítulo */}
                <motion.div 
                  className="text-2xl md:text-3xl text-yellow-200 font-bold mb-2"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(251, 191, 36, 0.5)",
                      "0 0 20px rgba(251, 191, 36, 0.8)",
                      "0 0 10px rgba(251, 191, 36, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  La App #1 para la Fiesta Más Viral
                </motion.div>
                
                {/* Tagline */}
                <motion.div
                  className="text-lg text-white/80 font-medium"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎉 Diversión sin límites • Momentos inolvidables 🎉
                </motion.div>
              </motion.div>

              {/* Mensaje inspirador mejorado */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-16"
              >
                <motion.p 
                  className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed font-medium"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ¡Prepárense para una experiencia única que romperá el hielo y 
                  creará momentos que recordarán para siempre! 
                  <br />
                  <span className="text-yellow-300 font-bold">
                    La fiesta más divertida está a un clic de distancia
                  </span>
                </motion.p>
              </motion.div>

              {/* Características destacadas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl mb-2">🎮</div>
                  <div className="text-white font-semibold">25+ Juegos</div>
                  <div className="text-white/70 text-sm">Experiencias únicas</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl mb-2">🌟</div>
                  <div className="text-white font-semibold">Diseño Viral</div>
                  <div className="text-white/70 text-sm">Efecto wow garantizado</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl mb-2">🇧🇴</div>
                  <div className="text-white font-semibold">Sabor Local</div>
                  <div className="text-white/70 text-sm">Cultura boliviana</div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold py-6 px-12 rounded-full text-2xl shadow-2xl hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/20 overflow-hidden"
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
                
                <span className="relative z-10 flex items-center gap-3">
                  🎉 ¡Empezar la Fiesta! 🎉
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap size={24} />
                  </motion.div>
                </span>
              </motion.button>
              
              {/* Texto adicional */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white/70 text-sm mt-4"
              >
                ¡Únete a miles de personas que ya están disfrutando!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensaje de consumo responsable mejorado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
            <p className="text-sm text-white/80 text-center">
              🍺 Consumo responsable • Diversión sin excesos • 18+ años
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SplashScreen
