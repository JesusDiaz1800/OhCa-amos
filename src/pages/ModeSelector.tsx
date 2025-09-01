import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Gamepad2, Flag, Sparkles, Users, Zap, Crown, Star, Heart, Globe, MapPin, PartyPopper, Beer, Wine, Music, Camera } from 'lucide-react'

const ModeSelector: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedMode, setSelectedMode] = useState<string | null>(
    searchParams.get('mode')
  )
  const [hoveredMode, setHoveredMode] = useState<string | null>(null)

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode)
    // Pequeña pausa para feedback visual
    setTimeout(() => {
      navigate(`/player-setup?mode=${mode}`)
    }, 300)
  }

  const handleBack = () => {
    navigate('/')
  }

  const modes = [
    {
      id: 'classic',
      title: 'Modo Clásico',
      subtitle: 'Experiencia Universal',
      description: 'La experiencia tradicional de ¡Oh Cañamos?, adaptable a cualquier fiesta y grupo de amigos.',
      icon: <Gamepad2 className="w-16 h-16" />,
      color: 'from-blue-500 via-purple-600 to-indigo-700',
      hoverColor: 'from-blue-400 via-purple-500 to-indigo-600',
      bgColor: 'from-blue-900/20 via-purple-900/20 to-indigo-900/20',
      borderColor: 'border-blue-400/30',
      features: [
        'Juegos universales y divertidos',
        'Retos para todos los gustos',
        'Experiencia probada y confiable',
        'Contenido internacional'
      ],
      particles: [Beer, Wine, Music, Camera],
      emoji: '🎮'
    },
    {
      id: 'bolivia',
      title: 'Modo Bolivia',
      subtitle: 'Sabor Local Auténtico',
      description: 'Con un toque auténtico y modismos bolivianos, diseñado para la cultura local y el humor criollo.',
      icon: <Flag className="w-16 h-16" />,
      color: 'from-green-500 via-yellow-500 to-orange-600',
      hoverColor: 'from-green-400 via-yellow-400 to-orange-500',
      bgColor: 'from-green-900/20 via-yellow-900/20 to-orange-900/20',
      borderColor: 'border-green-400/30',
      features: [
        'Modismos y referencias bolivianas',
        'Humor criollo y local',
        'Experiencia cultural única',
        'Jerga auténtica'
      ],
      particles: [Globe, MapPin, Heart, Star],
      emoji: '🇧🇴'
    }
  ]

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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
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
              Elige tu Experiencia
            </h1>
            <p className="text-white/80">
              ¿Cómo quieres que sea tu fiesta?
            </p>
          </motion.div>

          <div className="w-12"></div> {/* Spacer para centrar */}
        </motion.div>

        {/* Modes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredMode(mode.id)}
              onHoverEnd={() => setHoveredMode(null)}
              className={`relative bg-gradient-to-br ${mode.bgColor} backdrop-blur-sm rounded-3xl p-8 border-2 ${mode.borderColor} overflow-hidden group cursor-pointer transition-all duration-500`}
              onClick={() => handleModeSelect(mode.id)}
            >
              {/* Efectos de partículas */}
              <AnimatePresence>
                {hoveredMode === mode.id && (
                  <>
                    {mode.particles.map((ParticleIcon, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className="absolute text-white/20"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                        animate={{ 
                          opacity: [0, 0.5, 0],
                          scale: [0, 1, 0],
                          rotate: [0, 360],
                          y: [-20, -100],
                          x: [0, Math.random() * 40 - 20]
                        }}
                        transition={{
                          delay: particleIndex * 0.1,
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ParticleIcon size={Math.random() * 20 + 15} />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Efecto de brillo en hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: hoveredMode === mode.id ? "100%" : "-100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                {/* Header del modo */}
                <div className="text-center mb-8">
                  <motion.div
                    className="text-8xl mb-4"
                    animate={hoveredMode === mode.id ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {mode.emoji}
                  </motion.div>
                  
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${mode.color} flex items-center justify-center text-white`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {mode.icon}
                  </motion.div>

                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    animate={hoveredMode === mode.id ? {
                      textShadow: "0 0 20px rgba(255,255,255,0.5)"
                    } : {}}
                  >
                    {mode.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-xl text-white/80 font-medium"
                    animate={hoveredMode === mode.id ? {
                      color: "rgba(255,255,255,0.95)"
                    } : {}}
                  >
                    {mode.subtitle}
                  </motion.p>
                </div>

                {/* Descripción */}
                <motion.p 
                  className="text-white/90 text-lg leading-relaxed mb-8 text-center"
                  animate={hoveredMode === mode.id ? {
                    color: "rgba(255,255,255,1)"
                  } : {}}
                >
                  {mode.description}
                </motion.p>

                {/* Características */}
                <div className="space-y-4 mb-8">
                  {mode.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      className="flex items-center gap-3 text-white/90"
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${mode.color}`}
                        animate={hoveredMode === mode.id ? {
                          scale: [1, 1.5, 1],
                          boxShadow: "0 0 10px rgba(255,255,255,0.5)"
                        } : {}}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <span className="font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Botón de acción */}
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    className={`w-full bg-gradient-to-r ${mode.color} hover:${mode.hoverColor} text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-white/20 overflow-hidden relative group`}
                  >
                    {/* Efecto de brillo en el botón */}
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
                    
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      ¡Empezar {mode.title}!
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <motion.div
              className="text-4xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎉
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">
              ¡Ambos modos son increíbles!
            </h3>
            <p className="text-white/80">
              No importa cuál elijas, tendrás la mejor experiencia de fiesta. 
              Puedes cambiar entre modos en cualquier momento.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ModeSelector
