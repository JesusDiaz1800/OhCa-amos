import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PartyPopper, Sparkles, Heart } from 'lucide-react'

const SplashScreen: React.FC = () => {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Mostrar contenido después de 500ms
    const timer1 = setTimeout(() => setShowContent(true), 500)
    // Mostrar botón después de 2 segundos
    const timer2 = setTimeout(() => setShowButton(true), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleStart = () => {
    navigate('/mode-selector')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 flex items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 text-yellow-300 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={60} />
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 text-pink-300 opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Heart size={50} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-blue-300 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <PartyPopper size={70} />
        </motion.div>
      </div>

      <div className="text-center z-10 px-6">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Logo */}
              <motion.div
                className="mb-8"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-8xl font-bold text-white mb-4">
                  🍺
                </div>
                <h1 className="text-6xl font-black text-white mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  ¡Oh Cañamos?
                </h1>
                <div className="text-2xl text-yellow-300 font-semibold">
                  La App #1 para la Fiesta
                </div>
              </motion.div>

              {/* Mensaje inspirador */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-12"
              >
                <p className="text-xl text-white/90 max-w-md mx-auto leading-relaxed">
                  ¡Prepárense para una noche inolvidable llena de risas, 
                  retos y momentos que recordarán para siempre!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-xl shadow-2xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:-translate-y-1"
            >
              🎉 ¡Empezar la Fiesta! 🎉
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mensaje de consumo responsable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <p className="text-sm text-white/70 text-center max-w-xs">
            🍺 Consumo responsable • Diversión sin excesos
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SplashScreen
