import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Users, X, Play, Zap, Target, AlertTriangle, Volume2, VolumeX, Settings, Award, Heart, Star, Crown, Check, XCircle, Beer, Gamepad2, Sparkles, Flame, Trophy, Clock, Wine, GlassWater } from 'lucide-react'

interface RouletteGameProps {
  players: string[]
  onSpin: (playerName: string, action: string) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

interface RouletteAction {
  type: 'drink' | 'action' | 'truth' | 'dare' | 'bolivia' | 'group' | 'conditional'
  content: string
  difficulty: 'mild' | 'medium' | 'extreme'
  drinks?: number
  groupAction?: boolean
  conditional?: {
    phrase: string
    penalty: number
    duration: number
  }
}

const RouletteGame: React.FC<RouletteGameProps> = ({ 
  players, 
  onSpin, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [currentAction, setCurrentAction] = useState<RouletteAction | null>(null)
  const [showAction, setShowAction] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [round, setRound] = useState(1)
  const [scores, setScores] = useState<{[key: string]: number}>({})
  const [totalDrinks, setTotalDrinks] = useState<{[key: string]: number}>({})
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [gamePhase, setGamePhase] = useState<'waiting' | 'spinning' | 'action' | 'result'>('waiting')
  const [actionCompleted, setActionCompleted] = useState(false)
  const [activeConditionals, setActiveConditionals] = useState<Array<{
    phrase: string
    penalty: number
    roundsLeft: number
    description: string
  }>>([])
  const [wheelIntensity, setWheelIntensity] = useState(1)
  const [showLuckyEffect, setShowLuckyEffect] = useState(false)
  const [spinCount, setSpinCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const winRef = useRef<HTMLAudioElement | null>(null)
  const spinRef = useRef<HTMLAudioElement | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Base de datos de acciones súper mejorada
    const actions = {
    mild: [
      { type: 'drink', difficulty: 'mild', content: "1 trago", drinks: 1 },
      { type: 'action', difficulty: 'mild', content: "Baila 10 segundos", drinks: 1 },
      { type: 'truth', difficulty: 'mild', content: "Cuenta un chiste", drinks: 1 },
      { type: 'dare', difficulty: 'mild', content: "Imita a alguien del grupo", drinks: 1 },
      { type: 'conditional', difficulty: 'mild', content: "Di 'mi amor' después de cada frase", drinks: 1, conditional: { phrase: "mi amor", penalty: 2, duration: 3 } },
      { type: 'group', difficulty: 'mild', content: "Todos toman 1 trago", drinks: 1, groupAction: true }
    ],
    medium: [
      { type: 'drink', difficulty: 'medium', content: "2 shots", drinks: 2 },
      { type: 'action', difficulty: 'medium', content: "Besa a alguien del grupo", drinks: 2 },
      { type: 'truth', difficulty: 'medium', content: "Cuenta tu mayor secreto", drinks: 2 },
      { type: 'dare', difficulty: 'medium', content: "Quítate una prenda", drinks: 2 },
      { type: 'conditional', difficulty: 'medium', content: "Di '¡Oh cañamos!' antes de hablar", drinks: 2, conditional: { phrase: "¡Oh cañamos!", penalty: 3, duration: 4 } },
      { type: 'group', difficulty: 'medium', content: "Todos toman 2 tragos", drinks: 2, groupAction: true }
    ],
    extreme: [
      { type: 'drink', difficulty: 'extreme', content: "3 shots seguidos", drinks: 3 },
      { type: 'action', difficulty: 'extreme', content: "Llama a tu ex", drinks: 3 },
      { type: 'truth', difficulty: 'extreme', content: "Cuenta tu mayor vergüenza", drinks: 3 },
      { type: 'dare', difficulty: 'extreme', content: "El grupo elige tu castigo", drinks: 3 },
      { type: 'conditional', difficulty: 'extreme', content: "Di '¡Qué waso!' después de cada palabra", drinks: 3, conditional: { phrase: "¡Qué waso!", penalty: 5, duration: 5 } },
      { type: 'group', difficulty: 'extreme', content: "Todos toman 3 tragos", drinks: 3, groupAction: true }
    ],
    bolivia: [
      { type: 'drink', difficulty: 'mild', content: "Un trago de Singani", drinks: 1 },
      { type: 'action', difficulty: 'mild', content: "Baila folklore", drinks: 1 },
      { type: 'truth', difficulty: 'mild', content: "Cuenta un chisme boliviano", drinks: 1 },
      { type: 'dare', difficulty: 'mild', content: "Habla en quechua", drinks: 1 },
      { type: 'conditional', difficulty: 'mild', content: "Di 'cumpa' al final de cada frase", drinks: 1, conditional: { phrase: "cumpa", penalty: 1, duration: 2 } },
      { type: 'group', difficulty: 'mild', content: "Todos toman Singani", drinks: 1, groupAction: true },
      { type: 'drink', difficulty: 'medium', content: "2 tragos de Paceña", drinks: 2 },
      { type: 'action', difficulty: 'medium', content: "Canta una canción boliviana", drinks: 2 },
      { type: 'truth', difficulty: 'medium', content: "¿Cuál es tu mayor vergüenza en Bolivia?", drinks: 2 },
      { type: 'dare', difficulty: 'medium', content: "Llama a tu ex boliviano", drinks: 2 },
      { type: 'conditional', difficulty: 'medium', content: "Di '¡A la mierda!' cuando te equivoques", drinks: 2, conditional: { phrase: "¡A la mierda!", penalty: 2, duration: 3 } },
      { type: 'drink', difficulty: 'extreme', content: "Fondo blanco de Paceña", drinks: 3 },
      { type: 'action', difficulty: 'extreme', content: "Baila Caporales desnudo", drinks: 3 },
      { type: 'truth', difficulty: 'extreme', content: "¿Cuál es tu mayor secreto boliviano?", drinks: 3 },
      { type: 'dare', difficulty: 'extreme', content: "El grupo elige tu castigo boliviano", drinks: 3 }
    ]
  }

  // Inicializar puntuaciones y tragos
  useEffect(() => {
    const initialScores: {[key: string]: number} = {}
    const initialDrinks: {[key: string]: number} = {}
    players.forEach(player => {
      initialScores[player] = 0
      initialDrinks[player] = 0
    })
    setScores(initialScores)
    setTotalDrinks(initialDrinks)
  }, [players])

  // Actualizar condiciones activas
  useEffect(() => {
    setActiveConditionals(prev => 
      prev.map(conditional => ({
        ...conditional,
        roundsLeft: conditional.roundsLeft - 1
      })).filter(conditional => conditional.roundsLeft > 0)
    )
  }, [round])

  const spinWheel = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setGamePhase('spinning')
    setShowAction(false)
    setActionCompleted(false)

    // Sonido de giro
    if (soundEnabled && spinRef.current) {
      spinRef.current.play()
    }

    // Rotación aleatoria
    const randomRotation = Math.random() * 360 + 720 // Mínimo 2 vueltas completas
    setWheelRotation(prev => prev + randomRotation)

    // Determinar jugador seleccionado
    const segmentAngle = 360 / players.length
    const normalizedRotation = (randomRotation % 360)
    const selectedIndex = Math.floor(normalizedRotation / segmentAngle)
    const player = players[selectedIndex % players.length]

    // Efectos visuales
    setWheelIntensity(1.2)

    setTimeout(() => {
      setSelectedPlayer(player)
      setIsSpinning(false)
      setGamePhase('action')
      
      // Generar acción
      const difficulty = isBolivian ? 'bolivia' : 
        Math.random() > 0.7 ? 'extreme' : 
        Math.random() > 0.4 ? 'medium' : 'mild'
      
      const actionList = actions[difficulty as keyof typeof actions]
      const randomAction = actionList[Math.floor(Math.random() * actionList.length)]
      setCurrentAction(randomAction)
      setShowAction(true)

      // Sonido de ganar
      if (soundEnabled && winRef.current) {
        winRef.current.play()
      }

      setWheelIntensity(1)
      setSpinCount(prev => prev + 1)
    }, 3000)
  }

  const handleActionComplete = (completed: boolean) => {
    setActionCompleted(completed)
    setGamePhase('result')

    if (completed && currentAction && selectedPlayer) {
      // Aplicar acción si se completó
      if (currentAction.drinks) {
        if (currentAction.groupAction) {
          // Aplicar a todos los jugadores
          const newDrinks = { ...totalDrinks }
          players.forEach(player => {
            newDrinks[player] = (newDrinks[player] || 0) + currentAction.drinks!
          })
          setTotalDrinks(newDrinks)
        } else {
          // Aplicar solo al jugador seleccionado
          setTotalDrinks(prev => ({
            ...prev,
            [selectedPlayer]: prev[selectedPlayer] + currentAction.drinks!
          }))
        }
      }

      if (currentAction.type === 'conditional' && currentAction.conditional) {
        // Agregar condición activa
        setActiveConditionals(prev => [...prev, {
          phrase: currentAction.conditional!.phrase,
          penalty: currentAction.conditional!.penalty,
          roundsLeft: currentAction.conditional!.duration,
          description: currentAction.content
        }])
      }

      // Notificar al componente padre
      onSpin(selectedPlayer, currentAction.content)
    } else if (!completed && currentAction && selectedPlayer) {
      // Penalización por no completar (doble castigo)
      const penaltyDrinks = currentAction.drinks ? currentAction.drinks * 2 : 2
      setTotalDrinks(prev => ({
        ...prev,
        [selectedPlayer]: prev[selectedPlayer] + penaltyDrinks
      }))
    }

    // Continuar después de 3 segundos
    setTimeout(() => {
      setShowAction(false)
      setGamePhase('waiting')
      setRound(prev => prev + 1)
      setSelectedPlayer(null)
      setCurrentAction(null)
      setActionCompleted(false)
    onComplete()
    }, 3000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'mild': return 'from-green-500 to-emerald-500'
      case 'medium': return 'from-yellow-500 to-orange-500'
      case 'extreme': return 'from-red-500 to-pink-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'drink': return '🍺'
      case 'action': return '🎯'
      case 'truth': return '💭'
      case 'dare': return '🔥'
      case 'group': return '👥'
      case 'conditional': return '🎭'
      default: return '🎲'
    }
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Botón de configuración */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors z-10"
        >
          <Settings size={24} />
        </button>

        {/* Panel de configuración */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              className="absolute top-12 left-4 bg-black/90 backdrop-blur-sm rounded-xl p-4 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="flex items-center space-x-2 text-white">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>

        {/* Audio para efectos de sonido */}
        <audio ref={audioRef}>
          <source src="/sounds/roulette-spin.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={winRef}>
          <source src="/sounds/win.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={spinRef}>
          <source src="/sounds/spin-start.mp3" type="audio/mpeg" />
        </audio>

        {/* Efecto de suerte */}
        <AnimatePresence>
          {showLuckyEffect && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-400 text-2xl"
                  initial={{ 
                    x: Math.random() * 400 - 200, 
                    y: Math.random() * 400 - 200,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: Math.random() * 400 - 200
                  }}
                  transition={{ 
                    duration: 1 + Math.random(),
                    delay: Math.random() * 0.5
                  }}
                >
                  ⭐
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Efectos de partículas virales */}
        <AnimatePresence>
          {isSpinning && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 1
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Efectos de confeti para victorias */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -50,
                    scale: 0,
                    opacity: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    y: window.innerHeight + 100,
                    scale: [0, 1, 0.8],
                    opacity: [0, 1, 0],
                    rotate: [0, 360, 720]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 0.5
                  }}
                >
                  {['🎉', '🎊', '🎈', '🎁', '⭐', '💫', '🌟', '✨', '🍺', '🥂', '🎰', '🔥'][Math.floor(Math.random() * 12)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center relative z-10">
          {/* Título */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isBolivian ? '🎰 ¡Ruleta Mágica Cañera!' : '🎰 ¡Ruleta Mágica!'}
          </motion.h1>

          {/* Condiciones activas */}
          {activeConditionals.length > 0 && (
          <motion.div 
              className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
              <div className="text-white text-sm">
                <div className="font-bold mb-1">🎯 Condiciones Activas:</div>
                {activeConditionals.map((conditional, index) => (
                  <div key={index} className="text-xs opacity-90">
                    • {conditional.phrase} ({conditional.roundsLeft} rondas) - {conditional.penalty} tragos
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Información de ronda */}
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-6 border border-white/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-4 text-white">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                <span className="font-semibold">Ronda {round}</span>
              </div>
              <div className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                <span className="font-semibold">{spinCount} giros</span>
            </div>
            </div>
          </motion.div>

          {/* Ruleta */}
          <motion.div 
            className="relative mb-8"
            animate={isSpinning ? { 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <motion.div
              className={`transition-transform duration-1000 ${wheelIntensity > 1 ? 'scale-110' : 'scale-100'}`}
              style={{ transform: `rotate(${wheelRotation}deg)` }}
            >
              <div className="text-8xl">🎰</div>
            </motion.div>
            
            {/* Efectos de intensidad */}
            <AnimatePresence>
              {wheelIntensity > 1.1 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.7 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <div className="text-6xl">✨</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Jugador seleccionado */}
          {selectedPlayer && !showAction && (
            <motion.div 
              className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white mr-2" />
                <span className="text-white font-semibold">Seleccionado:</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {selectedPlayer}
              </div>
              <div className="text-white/80 text-sm mt-2">
                {isBolivian 
                  ? '¡Preparate para la acción, cumpa!'
                  : '¡Preparate para la acción!'
                }
              </div>
            </motion.div>
          )}

          {/* Acción */}
          <AnimatePresence>
            {showAction && currentAction && gamePhase === 'action' && (
              <motion.div 
                className={`bg-gradient-to-r ${getDifficultyColor(currentAction.difficulty)}/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-2">{getActionIcon(currentAction.type)}</span>
                  <span className="text-2xl font-bold text-white">¡ACCIÓN!</span>
                </div>
                <div className="text-xl font-bold text-white mb-4">
                  {currentAction.content}
                </div>
                {currentAction.drinks && (
                  <div className="text-white/80 text-sm mb-4">
                    <Beer className="inline-block w-4 h-4 mr-1" />
                    Tragos: {currentAction.drinks}
                </div>
                )}
                <div className="text-white/80 text-sm">
                  {isBolivian 
                    ? `¡${selectedPlayer} debe cumplir la acción, cumpa!`
                    : `¡${selectedPlayer} debe cumplir la acción!`
                  }
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resultado de la acción */}
          <AnimatePresence>
            {gamePhase === 'result' && (
              <motion.div 
                className={`backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 ${
                  actionCompleted 
                    ? 'bg-gradient-to-r from-green-600/90 to-emerald-600/90' 
                    : 'bg-gradient-to-r from-red-600/90 to-pink-600/90'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  {actionCompleted ? (
                    <Check className="w-8 h-8 text-white mr-2" />
                  ) : (
                    <XCircle className="w-8 h-8 text-white mr-2" />
                  )}
                  <span className="text-2xl font-bold text-white">
                    {actionCompleted ? '¡ACCIÓN CUMPLIDA!' : '¡ACCIÓN FALLIDA!'}
                  </span>
                </div>
                <div className="text-xl text-white">
                  {actionCompleted 
                    ? '¡Excelente trabajo!'
                    : `¡Doble castigo! +${currentAction?.drinks ? currentAction.drinks * 2 : 2} tragos`
                  }
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-4">
            {!isSpinning && !showAction && gamePhase === 'waiting' && (
              <motion.button
                onClick={spinWheel}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="inline-block w-6 h-6 mr-2" />
                {isBolivian ? '¡Girar la Ruleta, Cumpa!' : '¡Girar la Ruleta!'}
              </motion.button>
            )}

            {showAction && gamePhase === 'action' && (
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => handleActionComplete(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check className="inline-block w-6 h-6 mr-2" />
                  ¡Cumplido!
                </motion.button>
              <motion.button
                  onClick={() => handleActionComplete(false)}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                  <XCircle className="inline-block w-6 h-6 mr-2" />
                  ¡Fallé!
              </motion.button>
              </div>
            )}
          </div>

          {/* Lista de jugadores - ELIMINADO */}
          {/* Ya no es necesario mostrar contadores de puntuación */}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RouletteGame
