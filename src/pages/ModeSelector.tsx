import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Gamepad2, Flag, Sparkles, Users, Zap } from 'lucide-react'

const ModeSelector: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedMode, setSelectedMode] = useState<string | null>(
    searchParams.get('mode')
  )

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
      icon: <Gamepad2 className="w-12 h-12" />,
      color: 'from-blue-500 to-purple-600',
      hoverColor: 'from-blue-400 to-purple-500',
      features: [
        'Juegos universales y divertidos',
        'Retos para todos los gustos',
        'Experiencia probada y confiable'
      ]
    },
    {
      id: 'bolivia',
      title: 'Modo Bolivia',
      subtitle: 'Sabor Local Auténtico',
      description: 'Con un toque auténtico y modismos bolivianos, diseñado para la cultura local y el humor criollo.',
      icon: <Flag className="w-12 h-12" />,
      color: 'from-green-500 to-yellow-500',
      hoverColor: 'from-green-400 to-yellow-400',
      features: [
        'Modismos y referencias bolivianas',
        'Humor criollo y local',
        'Experiencia cultural única'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
          <span className="text-lg font-semibold">Volver</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Elige tu Modo de Fiesta
          </h1>
          <p className="text-white/80">
            ¿Cómo quieres que sea tu noche?
          </p>
        </div>

        <div className="w-24"></div> {/* Espaciador */}
      </motion.div>

      {/* Modos */}
      <div className="max-w-4xl mx-auto space-y-6">
        {modes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleModeSelect(mode.id)}
            className={`
              relative overflow-hidden rounded-2xl cursor-pointer
              bg-gradient-to-r ${mode.color} hover:${mode.hoverColor}
              transition-all duration-300 transform hover:-translate-y-1
              shadow-2xl hover:shadow-3xl
              ${selectedMode === mode.id ? 'ring-4 ring-yellow-300 ring-opacity-50' : ''}
            `}
          >
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-4 right-4 text-white/20">
              <Sparkles size={24} />
            </div>

            <div className="relative p-8">
              <div className="flex items-start gap-6">
                {/* Icono */}
                <motion.div
                  className="text-white p-4 rounded-full bg-white/20 backdrop-blur-sm"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {mode.icon}
                </motion.div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-3xl font-bold text-white">
                      {mode.title}
                    </h2>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
                      {mode.subtitle}
                    </span>
                  </div>

                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    {mode.description}
                  </p>

                  {/* Características */}
                  <div className="space-y-2">
                    {mode.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + featureIndex * 0.1 }}
                        className="flex items-center gap-3 text-white/80"
                      >
                        <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Flecha */}
                <motion.div
                  className="text-white/60 self-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap size={24} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensaje de consumo responsable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-white/70 text-sm max-w-md mx-auto">
          🍺 Recuerda: La diversión es mejor cuando se disfruta con responsabilidad
        </p>
      </motion.div>
    </div>
  )
}

export default ModeSelector
