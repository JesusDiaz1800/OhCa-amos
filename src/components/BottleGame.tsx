import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Users, X, Volume2, VolumeX, Settings, Check, XCircle, Beer, Sparkles, Zap, Crown, Star, Heart, Trophy, Play, Pause, SkipForward } from 'lucide-react'
import BottleImage from './BottleImage'

interface BottleGameProps {
  players: string[]
  onSpin: (playerName: string) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

interface Challenge {
  type: 'verdad' | 'reto' | 'yo_nunca' | 'que_prefieres' | 'shot' | 'group' | 'conditional'
  difficulty: 'suave' | 'atrevido' | 'picante'
  content: string
  drinks?: number
  groupAction?: boolean
  conditional?: {
    phrase: string
    penalty: number
    duration: number
  }
}

const BottleGame: React.FC<BottleGameProps> = ({ 
  players, 
  onSpin, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
     const [gamePhase, setGamePhase] = useState<'instructions' | 'spinning' | 'stopped' | 'challenge' | 'result' | 'penalty'>('instructions')
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [bottleRotation, setBottleRotation] = useState(0)
  const [totalDrinks, setTotalDrinks] = useState<{[key: string]: number}>({})
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPenalty, setShowPenalty] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const popRef = useRef<HTMLAudioElement | null>(null)
  const cheerRef = useRef<HTMLAudioElement | null>(null)
  const penaltyRef = useRef<HTMLAudioElement | null>(null)

  // Base de datos de retos viral y moderna
  const challenges = {
    suave: [
      { type: 'verdad', difficulty: 'suave', content: "¿Cuál es tu mayor miedo?", drinks: 1 },
      { type: 'reto', difficulty: 'suave', content: "Baila 15 segundos como si nadie te viera", drinks: 1 },
      { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he mentido sobre mi edad", drinks: 1 },
      { type: 'que_prefieres', difficulty: 'suave', content: "¿Prefieres ser invisible o volar?", drinks: 1 },
      { type: 'shot', difficulty: 'suave', content: "1 trago", drinks: 1 },
      { type: 'group', difficulty: 'suave', content: "Todos toman 1 trago", drinks: 1, groupAction: true }
    ],
    atrevido: [
      { type: 'verdad', difficulty: 'atrevido', content: "¿Cuál es tu mayor secreto?", drinks: 2 },
      { type: 'reto', difficulty: 'atrevido', content: "Besa a alguien del grupo", drinks: 2 },
      { type: 'yo_nunca', difficulty: 'atrevido', content: "Yo nunca he tenido una aventura", drinks: 2 },
      { type: 'que_prefieres', difficulty: 'atrevido', content: "¿Prefieres ser rico y feo o pobre y guapo?", drinks: 2 },
      { type: 'shot', difficulty: 'atrevido', content: "2 shots", drinks: 2 },
      { type: 'group', difficulty: 'atrevido', content: "Todos toman 2 tragos", drinks: 2, groupAction: true }
    ],
    picante: [
      { type: 'verdad', difficulty: 'picante', content: "¿Cuál es tu mayor vergüenza?", drinks: 3 },
      { type: 'reto', difficulty: 'picante', content: "Llama a tu ex", drinks: 3 },
      { type: 'yo_nunca', difficulty: 'picante', content: "Yo nunca he tenido sexo en público", drinks: 3 },
      { type: 'que_prefieres', difficulty: 'picante', content: "¿Prefieres ser famoso y odiado o desconocido y amado?", drinks: 3 },
      { type: 'shot', difficulty: 'picante', content: "3 shots seguidos", drinks: 3 },
      { type: 'group', difficulty: 'picante', content: "Todos toman 3 tragos", drinks: 3, groupAction: true }
    ],
    bolivia: [
      { type: 'verdad', difficulty: 'suave', content: "¿Cuál es tu plato boliviano favorito?", drinks: 1 },
      { type: 'reto', difficulty: 'suave', content: "Baila folklore", drinks: 1 },
      { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he tomado Singani", drinks: 1 },
      { type: 'que_prefieres', difficulty: 'suave', content: "¿Prefieres Paceña o Huari?", drinks: 1 },
      { type: 'shot', difficulty: 'suave', content: "1 trago de Singani", drinks: 1 },
      { type: 'group', difficulty: 'suave', content: "Todos toman Singani", drinks: 1, groupAction: true },
      { type: 'verdad', difficulty: 'atrevido', content: "¿Cuál es tu mayor chisme boliviano?", drinks: 2 },
      { type: 'reto', difficulty: 'atrevido', content: "Habla en quechua", drinks: 2 },
      { type: 'yo_nunca', difficulty: 'atrevido', content: "Yo nunca he ido al Carnaval de Oruro", drinks: 2 },
      { type: 'shot', difficulty: 'atrevido', content: "2 tragos de Paceña", drinks: 2 },
      { type: 'verdad', difficulty: 'picante', content: "¿Cuál es tu mayor vergüenza en Bolivia?", drinks: 3 },
      { type: 'reto', difficulty: 'picante', content: "Llama a tu ex boliviano", drinks: 3 },
      { type: 'yo_nunca', difficulty: 'picante', content: "Yo nunca he tenido sexo en el altiplano", drinks: 3 },
      { type: 'shot', difficulty: 'picante', content: "Fondo blanco de Paceña", drinks: 3 }
    ]
  }

  // Inicializar tragos
  useEffect(() => {
    const initialDrinks: {[key: string]: number} = {}
    players.forEach(player => {
      initialDrinks[player] = 0
    })
    setTotalDrinks(initialDrinks)
  }, [players])

     const startSpinning = () => {
    console.log('BottleGame: startSpinning iniciado')
    setGamePhase('spinning')
    setIsSpinning(true)
    setShowSparkles(true)

    // Sonido de giro
    if (soundEnabled && audioRef.current) {
      audioRef.current.play()
    }

    // Rotación aleatoria
    const randomRotation = Math.random() * 360 + 1440
    setBottleRotation(prev => prev + randomRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setShowSparkles(false)
      setGamePhase('stopped')

      // Seleccionar jugador aleatorio
      const randomPlayer = players[Math.floor(Math.random() * players.length)]
      setSelectedPlayer(randomPlayer)
      console.log('BottleGame: Jugador seleccionado:', randomPlayer)

      // Sonido de pop
      if (soundEnabled && popRef.current) {
        popRef.current.play()
      }
    }, 4000)
  }

     const showChallenge = (playerName: string) => {
    console.log('BottleGame: showChallenge llamado para:', playerName)
    setSelectedPlayer(playerName)
    setGamePhase('challenge')
     
     // Generar reto
     const difficulty = isBolivian ? 'bolivia' : 
       Math.random() > 0.7 ? 'picante' : 
       Math.random() > 0.4 ? 'atrevido' : 'suave'
     
     const challengeList = challenges[difficulty as keyof typeof challenges]
     const randomChallenge = challengeList[Math.floor(Math.random() * challengeList.length)] as Challenge
     console.log('BottleGame: Reto generado:', randomChallenge)
     setCurrentChallenge(randomChallenge)
   }

  const handleChallengeComplete = (completed: boolean) => {
    console.log('BottleGame: handleChallengeComplete llamado con:', completed)
    setChallengeCompleted(completed)
    
    if (completed && currentChallenge && selectedPlayer) {
      // Aplicar reto si se completó
      if (currentChallenge.drinks) {
        if (currentChallenge.groupAction) {
          const newDrinks = { ...totalDrinks }
          players.forEach(player => {
            newDrinks[player] = (newDrinks[player] || 0) + currentChallenge.drinks!
          })
          setTotalDrinks(newDrinks)
        } else {
          setTotalDrinks(prev => ({
            ...prev,
            [selectedPlayer]: prev[selectedPlayer] + currentChallenge.drinks!
          }))
        }
      }

      // Sonido de celebración
      if (soundEnabled && cheerRef.current) {
        cheerRef.current.play()
      }

      setShowConfetti(true)
      setGamePhase('result')

      setTimeout(() => {
        setShowConfetti(false)
        setGamePhase('instructions')
        setSelectedPlayer(null)
        setCurrentChallenge(null)
        setChallengeCompleted(false)
        console.log('BottleGame: Llamando onComplete()')
        onComplete()
      }, 3000)
    } else if (!completed && currentChallenge && selectedPlayer) {
      // Penalización por no completar
      if (currentChallenge.type !== 'shot') {
        const penaltyDrinks = currentChallenge.drinks ? currentChallenge.drinks * 2 : 2
        setTotalDrinks(prev => ({
          ...prev,
          [selectedPlayer]: prev[selectedPlayer] + penaltyDrinks
        }))
      }

      // Sonido de penalización
      if (soundEnabled && penaltyRef.current) {
        penaltyRef.current.play()
      }

      setShowPenalty(true)
      setGamePhase('penalty')

      setTimeout(() => {
        setShowPenalty(false)
        setGamePhase('instructions')
        setSelectedPlayer(null)
        setCurrentChallenge(null)
        setChallengeCompleted(false)
        console.log('BottleGame: Llamando onComplete() (penalización)')
        onComplete()
      }, 3000)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'suave': return 'from-green-500 to-emerald-500'
      case 'atrevido': return 'from-yellow-500 to-orange-500'
      case 'picante': return 'from-red-500 to-pink-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'verdad': return '💭'
      case 'reto': return '🎯'
      case 'yo_nunca': return '🤔'
      case 'que_prefieres': return '⚖️'
      case 'shot': return '🍺'
      case 'group': return '👥'
      default: return '🎲'
    }
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Fondo moderno con efectos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-15 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>
      {/* Audio para efectos de sonido mejorados */}
      <audio ref={audioRef}>
        <source src="/sounds/bottle-spin.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={popRef}>
        <source src="/sounds/pop.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={cheerRef}>
        <source src="/sounds/cheer.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={penaltyRef}>
        <source src="/sounds/penalty.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Nuevos efectos de sonido */}
      <audio ref={useRef<HTMLAudioElement>(null)}>
        <source src="/sounds/dramatic.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={useRef<HTMLAudioElement>(null)}>
        <source src="/sounds/victory.mp3" type="audio/mpeg" />
      </audio>

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

      {/* Efectos de sparkles */}
      <AnimatePresence>
        {showSparkles && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-2xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: Math.random() * window.innerHeight
                }}
                transition={{ 
                  duration: 1 + Math.random(),
                  delay: Math.random() * 0.5
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efectos de confeti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)]
                }}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: -50,
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: window.innerHeight + 50
                }}
                transition={{ 
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5
                }}
              >
                {['🎉', '🎊', '🎈', '🎁', '⭐', '💫', '🌟', '✨'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efectos de penalización */}
      <AnimatePresence>
        {showPenalty && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-500 text-3xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: Math.random() * window.innerHeight
                }}
                transition={{ 
                  duration: 1 + Math.random(),
                  delay: Math.random() * 0.3
                }}
              >
                💥
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Instrucciones iniciales */}
        {gamePhase === 'instructions' && (
          <motion.div
            className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 rounded-3xl p-8 border border-white/20"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <motion.h1 
              className="text-5xl font-bold text-white mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              🍾 ¡Gira la Botella!
            </motion.h1>

            <motion.div 
              className="bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-white text-center">
                <div className="font-bold text-2xl mb-4">📱 Instrucciones:</div>
                <div className="text-lg space-y-2">
                  <div>1. Pon el celular al centro del grupo</div>
                  <div>2. Presiona "Empezar a Girar"</div>
                  <div>3. La botella girará en pantalla completa</div>
                  <div>4. Cuando pare, verás el reto</div>
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={startSpinning}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 px-8 rounded-2xl transition-all shadow-lg text-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="inline-block w-8 h-8 mr-3" />
              ¡Empezar a Girar!
            </motion.button>
          </motion.div>
        )}

        {/* Pantalla de giro */}
        {gamePhase === 'spinning' && (
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-96 h-96 flex items-center justify-center"
              animate={isSpinning ? { 
                rotate: [0, 360, 720, 1080, 1440, 1800, 2160, 2520, 2880, 3240, 3600]
              } : { rotate: bottleRotation }}
              transition={{ 
                duration: 4,
                ease: "easeOut"
              }}
              style={{ transformOrigin: 'center center' }}
            >
              <BottleImage isBolivian={isBolivian} className="w-96 h-96" />
            </motion.div>
          </motion.div>
        )}

        {/* Botella detenida - pantalla completa para ver a quién apunta */}
        {gamePhase === 'stopped' && (
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-96 h-96 flex items-center justify-center"
              animate={{ rotate: bottleRotation }}
              style={{ transformOrigin: 'center center' }}
            >
              <BottleImage isBolivian={isBolivian} className="w-96 h-96" />
            </motion.div>
            
            {/* Overlay con instrucción */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-white text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-bold text-xl mb-2">¡La Botella se Detuvo!</div>
                <div className="text-lg opacity-90">
                  Mira a quién apunta la botella
                </div>
              </div>
            </motion.div>

            {/* Botón para continuar */}
            <motion.button
              onClick={() => {
                if (selectedPlayer) {
                  showChallenge(selectedPlayer)
                }
              }}
              className="absolute top-10 right-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <Check className="inline-block w-6 h-6 mr-2" />
              Confirmar
            </motion.button>
          </motion.div>
        )}



        {/* Reto */}
        {gamePhase === 'challenge' && currentChallenge && (
          <motion.div
            className={`bg-gradient-to-br ${getDifficultyColor(currentChallenge.difficulty)}/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20`}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{getChallengeIcon(currentChallenge.type)}</div>
              <div className="text-4xl font-bold text-white mb-4">¡RETO!</div>
              <div className="text-2xl font-bold text-white mb-6">
                {currentChallenge.content}
              </div>
              {currentChallenge.drinks && (
                <div className="text-white/90 text-xl mb-6">
                  <Beer className="inline-block w-6 h-6 mr-2" />
                  Tragos: {currentChallenge.drinks}
                </div>
              )}
              <div className="text-white/80 text-lg">
                {currentChallenge.type === 'shot' 
                  ? `¡${selectedPlayer} debe tomar ${currentChallenge.drinks} trago(s)!`
                  : `¡${selectedPlayer} debe cumplir el reto!`
                }
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.button
                onClick={() => handleChallengeComplete(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 px-6 rounded-2xl transition-all shadow-lg text-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="inline-block w-6 h-6 mr-2" />
                ¡Cumplido!
              </motion.button>
              <motion.button
                onClick={() => handleChallengeComplete(false)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-6 px-6 rounded-2xl transition-all shadow-lg text-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <XCircle className="inline-block w-6 h-6 mr-2" />
                ¡Fallé!
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Resultado */}
        {gamePhase === 'result' && (
          <motion.div
            className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 rounded-3xl p-8 border border-white/20"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <div className="text-center">
              <div className="text-8xl mb-6">🎉</div>
              <div className="text-4xl font-bold text-white mb-4">¡RETO CUMPLIDO!</div>
              <div className="text-2xl text-white opacity-90">
                ¡Excelente trabajo!
              </div>
            </div>
          </motion.div>
        )}

        {/* Penalización */}
        {gamePhase === 'penalty' && (
          <motion.div
            className="bg-gradient-to-br from-red-900 via-red-800 to-pink-700 rounded-3xl p-8 border border-white/20"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <div className="text-center">
              <div className="text-8xl mb-6">💥</div>
              <div className="text-4xl font-bold text-white mb-4">¡PENALIZACIÓN!</div>
              <div className="text-2xl text-white opacity-90">
                {currentChallenge?.type === 'shot' 
                  ? '¡Ya tomaste los tragos!'
                  : `¡${currentChallenge?.drinks ? currentChallenge.drinks * 2 : 2} tragos por no cumplir!`
                }
              </div>
            </div>
          </motion.div>
        )}

        {/* Lista de jugadores - ELIMINADO */}
        {/* Ya no es necesario mostrar contadores de puntuación */}
      </div>
    </motion.div>
  )
}

export default BottleGame
