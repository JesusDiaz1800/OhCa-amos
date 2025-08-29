import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Flame, Heart, Users, Brain, Crown, Zap, Sparkles } from 'lucide-react'

const GameSubModeSelector: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'classic'
  const players = searchParams.get('players') || ''
  
  const [selectedSubMode, setSelectedSubMode] = useState<string | null>(null)

  const handleSubModeSelect = (subMode: string) => {
    setSelectedSubMode(subMode)
    // Pequeña pausa para feedback visual
    setTimeout(() => {
      navigate(`/game-engine?mode=${mode}&subMode=${subMode}&players=${players}`)
    }, 300)
  }

  const handleBack = () => {
    navigate('/player-setup')
  }

  const classicSubModes = [
    {
      id: 'previa',
      title: 'Previa',
      subtitle: 'Calentamiento Ligero',
      description: 'Preguntas sencillas y retos suaves para empezar la noche con buen pie.',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500',
      intensity: 'Suave'
    },
    {
      id: 'fiesta',
      title: 'Fiesta',
      subtitle: 'Modo Estándar',
      description: 'El ritmo se acelera con preguntas animadas y retos más emocionantes.',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-500 to-purple-600',
      intensity: 'Medio'
    },
    {
      id: 'after',
      title: 'After',
      subtitle: 'Intensidad Máxima',
      description: 'Preguntas y retos más intensos para el final de la noche.',
      icon: <Flame className="w-8 h-8" />,
      color: 'from-red-500 to-pink-600',
      intensity: 'Alto'
    },
    {
      id: 'hot',
      title: 'Hot',
      subtitle: 'Modo Coqueto',
      description: 'Preguntas íntimas y atrevidas para conocer secretos y crear conexiones.',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-600',
      intensity: 'Picante'
    },
    {
      id: 'pareja',
      title: 'Pareja',
      subtitle: 'Relación Tóxica',
      description: 'Enfocado en la dinámica de pareja con preguntas y retos románticos.',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-600',
      intensity: 'Romántico'
    },
    {
      id: 'trivia',
      title: 'Trivia',
      subtitle: 'Conocimiento General',
      description: 'Preguntas de cultura general y conocimiento para los más intelectuales.',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      intensity: 'Intelectual'
    }
  ]

  const boliviaSubModes = [
    {
      id: 'previa-boliviana',
      title: 'Previa Boliviana',
      subtitle: 'Calentamiento Criollo',
      description: 'Retos sencillos con toques culturales bolivianos, sin forzar.',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500',
      intensity: 'Suave'
    },
    {
      id: 'joda',
      title: 'Joda',
      subtitle: 'Fiesta al Estilo Bolivia',
      description: 'La fiesta al estilo boliviano, con modismos y referencias locales.',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-500 to-purple-600',
      intensity: 'Medio'
    },
    {
      id: 'relacion-toxi',
      title: 'Relación Toxi',
      subtitle: 'Modo Picante Criollo',
      description: 'Preguntas atrevidas y de pareja con humor boliviano.',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-600',
      intensity: 'Picante'
    },
    {
      id: 'bolivia-profunda',
      title: 'Bolivia Profunda',
      subtitle: 'Trivia Cultural',
      description: 'Preguntas sobre cultura boliviana y tradiciones locales.',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      intensity: 'Cultural'
    }
  ]

  const subModes = mode === 'bolivia' ? boliviaSubModes : classicSubModes

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
            Elige el Ritmo
          </h1>
          <p className="text-white/80">
            ¿Cómo quieres que sea la intensidad?
          </p>
        </div>

        <div className="w-24"></div> {/* Espaciador */}
      </motion.div>

      {/* Modo seleccionado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center max-w-md mx-auto">
          <div className="text-white/80 text-sm mb-1">Modo seleccionado</div>
          <div className="text-white font-semibold text-lg">
            {mode === 'bolivia' ? '🇧🇴 Modo Bolivia' : '🎮 Modo Clásico'}
          </div>
        </div>
      </motion.div>

      {/* Sub-modos */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subModes.map((subMode, index) => (
            <motion.div
              key={subMode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubModeSelect(subMode.id)}
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer
                bg-gradient-to-br ${subMode.color}
                transition-all duration-300 transform hover:-translate-y-1
                shadow-2xl hover:shadow-3xl
                ${selectedSubMode === subMode.id ? 'ring-4 ring-yellow-300 ring-opacity-50' : ''}
              `}
            >
              {/* Efectos de fondo */}
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4 text-white/20">
                <Crown size={20} />
              </div>

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-white p-3 rounded-full bg-white/20 backdrop-blur-sm">
                    {subMode.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {subMode.title}
                    </h2>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">
                      {subMode.subtitle}
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-white/90 text-sm mb-4 leading-relaxed">
                  {subMode.description}
                </p>

                {/* Intensidad */}
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Intensidad:</span>
                  <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium text-white">
                    {subMode.intensity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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

export default GameSubModeSelector
