import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Flame, 
  Heart, 
  Users, 
  Brain, 
  Crown, 
  Zap, 
  Sparkles,
  Star,
  PartyPopper,
  Beer,
  Wine,
  Music,
  Camera,
  Globe,
  MapPin,
  Gamepad2,
  Flag,
  ArrowRight,
  Target,
  Trophy
} from 'lucide-react'

const GameSubModeSelector: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'classic'
  const players = searchParams.get('players') || ''
  
  const [selectedSubMode, setSelectedSubMode] = useState<string | null>(null)
  const [hoveredSubMode, setHoveredSubMode] = useState<string | null>(null)

  const handleSubModeSelect = (subMode: string) => {
    setSelectedSubMode(subMode)
    // Pequeña pausa para feedback visual
    setTimeout(() => {
      // Obtener jugadores del localStorage
      const storedPlayers = localStorage.getItem('gamePlayers')
      const playersArray = storedPlayers ? JSON.parse(storedPlayers) : []
      const playersParam = encodeURIComponent(JSON.stringify(playersArray))
      
      navigate(`/game-engine?mode=${mode}&subMode=${subMode}&players=${playersParam}`)
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
      icon: <Sparkles className="w-12 h-12" />,
      color: 'from-green-400 via-emerald-500 to-teal-600',
      bgColor: 'from-green-900/20 via-emerald-900/20 to-teal-900/20',
      borderColor: 'border-green-400/30',
      intensity: 'Suave',
      particles: [Beer, Wine, Music],
      emoji: '🍺',
      features: ['Preguntas suaves', 'Retos simples', 'Ideal para empezar']
    },
    {
      id: 'fiesta',
      title: 'Fiesta',
      subtitle: 'Modo Estándar',
      description: 'El ritmo se acelera con preguntas animadas y retos más emocionantes.',
      icon: <Zap className="w-12 h-12" />,
      color: 'from-blue-500 via-purple-600 to-indigo-700',
      bgColor: 'from-blue-900/20 via-purple-900/20 to-indigo-900/20',
      borderColor: 'border-blue-400/30',
      intensity: 'Medio',
      particles: [PartyPopper, Star, Zap],
      emoji: '🎉',
      features: ['Preguntas animadas', 'Retos emocionantes', 'Ritmo acelerado']
    },
    {
      id: 'after',
      title: 'After',
      subtitle: 'Intensidad Máxima',
      description: 'Preguntas y retos más intensos para el final de la noche.',
      icon: <Flame className="w-12 h-12" />,
      color: 'from-red-500 via-pink-600 to-rose-700',
      bgColor: 'from-red-900/20 via-pink-900/20 to-rose-900/20',
      borderColor: 'border-red-400/30',
      intensity: 'Alto',
      particles: [Flame, Target, Trophy],
      emoji: '🔥',
      features: ['Preguntas intensas', 'Retos extremos', 'Final de noche']
    },
    {
      id: 'hot',
      title: 'Hot',
      subtitle: 'Modo Coqueto',
      description: 'Preguntas íntimas y atrevidas para conocer secretos y crear conexiones.',
      icon: <Heart className="w-12 h-12" />,
      color: 'from-pink-500 via-rose-600 to-red-600',
      bgColor: 'from-pink-900/20 via-rose-900/20 to-red-900/20',
      borderColor: 'border-pink-400/30',
      intensity: 'Picante',
      particles: [Heart, Star, Sparkles],
      emoji: '💋',
      features: ['Preguntas íntimas', 'Retos atrevidos', 'Conexiones']
    },
    {
      id: 'pareja',
      title: 'Pareja',
      subtitle: 'Relación Tóxica',
      description: 'Enfocado en la dinámica de pareja con preguntas y retos románticos.',
      icon: <Users className="w-12 h-12" />,
      color: 'from-purple-500 via-indigo-600 to-blue-700',
      bgColor: 'from-purple-900/20 via-indigo-900/20 to-blue-900/20',
      borderColor: 'border-purple-400/30',
      intensity: 'Romántico',
      particles: [Users, Heart, Sparkles],
      emoji: '💕',
      features: ['Preguntas románticas', 'Retos de pareja', 'Dinámica especial']
    },
    {
      id: 'trivia',
      title: 'Trivia',
      subtitle: 'Conocimiento General',
      description: 'Preguntas de cultura general y conocimiento para los más intelectuales.',
      icon: <Brain className="w-12 h-12" />,
      color: 'from-yellow-500 via-orange-500 to-red-500',
      bgColor: 'from-yellow-900/20 via-orange-900/20 to-red-900/20',
      borderColor: 'border-yellow-400/30',
      intensity: 'Intelectual',
      particles: [Brain, Target, Trophy],
      emoji: '🧠',
      features: ['Cultura general', 'Conocimiento', 'Intelectual']
    }
  ]

  const boliviaSubModes = [
    {
      id: 'previa',
      title: 'Previa',
      subtitle: 'Calentamiento Criollo',
      description: 'Retos sencillos con toques culturales bolivianos, sin forzar.',
      icon: <Sparkles className="w-12 h-12" />,
      color: 'from-green-400 via-emerald-500 to-teal-600',
      bgColor: 'from-green-900/20 via-emerald-900/20 to-teal-900/20',
      borderColor: 'border-green-400/30',
      intensity: 'Suave',
      particles: [Globe, MapPin, Beer],
      emoji: '🇧🇴',
      features: ['Toques culturales', 'Retos suaves', 'Estilo criollo']
    },
    {
      id: 'joda',
      title: 'Joda',
      subtitle: 'Fiesta al Estilo Bolivia',
      description: 'La fiesta al estilo boliviano, con modismos y referencias locales.',
      icon: <Zap className="w-12 h-12" />,
      color: 'from-blue-500 via-purple-600 to-indigo-700',
      bgColor: 'from-blue-900/20 via-purple-900/20 to-indigo-900/20',
      borderColor: 'border-blue-400/30',
      intensity: 'Medio',
      particles: [PartyPopper, Star, Flag],
      emoji: '🎊',
      features: ['Modismos locales', 'Referencias bolivianas', 'Estilo joda']
    },
    {
      id: 'chaki',
      title: 'Chaki',
      subtitle: 'Intensidad Máxima',
      description: 'Preguntas y retos más intensos para el final de la noche.',
      icon: <Flame className="w-12 h-12" />,
      color: 'from-red-500 via-pink-600 to-rose-700',
      bgColor: 'from-red-900/20 via-pink-900/20 to-rose-900/20',
      borderColor: 'border-red-400/30',
      intensity: 'Alto',
      particles: [Flame, Target, Trophy],
      emoji: '🔥',
      features: ['Preguntas intensas', 'Retos extremos', 'Final de noche']
    },
    {
      id: 'relacion-toxica',
      title: 'Relación Tóxica',
      subtitle: 'Modo Picante Criollo',
      description: 'Preguntas atrevidas y de pareja con humor boliviano.',
      icon: <Heart className="w-12 h-12" />,
      color: 'from-pink-500 via-rose-600 to-red-600',
      bgColor: 'from-pink-900/20 via-rose-900/20 to-red-900/20',
      borderColor: 'border-pink-400/30',
      intensity: 'Picante',
      particles: [Heart, Star, Sparkles],
      emoji: '💔',
      features: ['Humor boliviano', 'Preguntas atrevidas', 'Relaciones tóxicas']
    },
    {
      id: 'bar',
      title: 'Bar',
      subtitle: 'Modo Bar',
      description: 'Perfecto para bares y discotecas con preguntas y retos de ambiente.',
      icon: <Beer className="w-12 h-12" />,
      color: 'from-yellow-500 via-orange-600 to-red-600',
      bgColor: 'from-yellow-900/20 via-orange-900/20 to-red-900/20',
      borderColor: 'border-yellow-400/30',
      intensity: 'Medio',
      particles: [Beer, Wine, Music],
      emoji: '🍻',
      features: ['Ambiente de bar', 'Retos sociales', 'Diversión grupal']
    },
    {
      id: 'pareja',
      title: 'Pareja',
      subtitle: 'Modo Romántico',
      description: 'Preguntas románticas y retos para parejas o personas interesadas.',
      icon: <Heart className="w-12 h-12" />,
      color: 'from-pink-500 via-rose-600 to-purple-600',
      bgColor: 'from-pink-900/20 via-rose-900/20 to-purple-900/20',
      borderColor: 'border-pink-400/30',
      intensity: 'Romántico',
      particles: [Heart, Sparkles, Star],
      emoji: '💕',
      features: ['Preguntas románticas', 'Retos para parejas', 'Conexión especial']
    }
  ]

  const subModes = mode === 'bolivia' ? boliviaSubModes : classicSubModes

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
              Elige el Ritmo
            </h1>
            <p className="text-white/80">
              ¿Cómo quieres que sea la intensidad?
            </p>
          </motion.div>

          <div className="w-12"></div> {/* Spacer para centrar */}
        </motion.div>

        {/* Modo seleccionado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4">
              <motion.div
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                  mode === 'bolivia' 
                    ? 'from-green-500 via-yellow-500 to-orange-600' 
                    : 'from-blue-500 via-purple-600 to-indigo-700'
                } flex items-center justify-center text-white`}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                {mode === 'bolivia' ? <Flag className="w-8 h-8" /> : <Gamepad2 className="w-8 h-8" />}
              </motion.div>
              <div className="text-center">
                <div className="text-4xl mb-2">{mode === 'bolivia' ? '🇧🇴' : '🎮'}</div>
                <h2 className="text-2xl font-bold text-white">
                  {mode === 'bolivia' ? 'Modo Bolivia' : 'Modo Clásico'}
                </h2>
                <p className="text-white/80 text-sm">Modo seleccionado</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sub-modos */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subModes.map((subMode, index) => (
              <motion.div
                key={subMode.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setHoveredSubMode(subMode.id)}
                onHoverEnd={() => setHoveredSubMode(null)}
                className={`relative bg-gradient-to-br ${subMode.bgColor} backdrop-blur-sm rounded-3xl p-8 border-2 ${subMode.borderColor} overflow-hidden group cursor-pointer transition-all duration-500`}
                onClick={() => handleSubModeSelect(subMode.id)}
              >
                {/* Efectos de partículas */}
                <AnimatePresence>
                  {hoveredSubMode === subMode.id && (
                    <>
                      {subMode.particles.map((ParticleIcon, particleIndex) => (
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
                  animate={{ x: hoveredSubMode === subMode.id ? "100%" : "-100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                <div className="relative z-10">
                  {/* Header del sub-modo */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={hoveredSubMode === subMode.id ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {subMode.emoji}
                    </motion.div>
                    
                    <motion.div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${subMode.color} flex items-center justify-center text-white`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {subMode.icon}
                    </motion.div>

                    <motion.h2 
                      className="text-2xl md:text-3xl font-bold text-white mb-2"
                      animate={hoveredSubMode === subMode.id ? {
                        textShadow: "0 0 20px rgba(255,255,255,0.5)"
                      } : {}}
                    >
                      {subMode.title}
                    </motion.h2>
                    
                    <motion.p 
                      className="text-lg text-white/80 font-medium"
                      animate={hoveredSubMode === subMode.id ? {
                        color: "rgba(255,255,255,0.95)"
                      } : {}}
                    >
                      {subMode.subtitle}
                    </motion.p>
                  </div>

                  {/* Descripción */}
                  <motion.p 
                    className="text-white/90 text-base leading-relaxed mb-6 text-center"
                    animate={hoveredSubMode === subMode.id ? {
                      color: "rgba(255,255,255,1)"
                    } : {}}
                  >
                    {subMode.description}
                  </motion.p>

                  {/* Características */}
                  <div className="space-y-3 mb-6">
                    {subMode.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <motion.div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${subMode.color}`}
                          animate={hoveredSubMode === subMode.id ? {
                            scale: [1, 1.5, 1],
                            boxShadow: "0 0 10px rgba(255,255,255,0.5)"
                          } : {}}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <span className="font-medium text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Intensidad */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white/80 text-sm font-medium">Intensidad:</span>
                    <motion.span 
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${subMode.color}`}
                      animate={hoveredSubMode === subMode.id ? {
                        scale: [1, 1.1, 1],
                        boxShadow: "0 0 10px rgba(255,255,255,0.3)"
                      } : {}}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      {subMode.intensity}
                    </motion.span>
                  </div>

                  {/* Botón de acción */}
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button
                      className={`w-full bg-gradient-to-r ${subMode.color} hover:${subMode.color.replace('from-', 'from-').replace('via-', 'via-').replace('to-', 'to-')} text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-white/20 overflow-hidden relative group`}
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
                        <Sparkles className="w-5 h-5" />
                        ¡Empezar {subMode.title}!
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
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
              🎯
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">
              ¡Cada modo es único!
            </h3>
            <p className="text-white/80">
              Elige el que mejor se adapte a tu grupo y al momento de la noche. 
              Puedes cambiar entre modos en cualquier momento.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GameSubModeSelector
