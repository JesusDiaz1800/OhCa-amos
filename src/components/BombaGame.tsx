import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Users, Volume2, X, Play, Zap, AlertTriangle, Target } from 'lucide-react'

interface BombaGameProps {
  players: string[]
  onExplode: (playerName: string) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

const BombaGame: React.FC<BombaGameProps> = ({ 
  players, 
  onExplode, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isExploded, setIsExploded] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [showQuestion, setShowQuestion] = useState(true)
  const [explosionPlayer, setExplosionPlayer] = useState('')
  const [showPenalty, setShowPenalty] = useState(false)
  const [currentPenalty, setCurrentPenalty] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Generar pregunta basada en el modo de juego
  const generateQuestion = () => {
    const questions = {
      pre: [
        "Nombres de marcas de cerveza",
        "Nombres de frutas",
        "Nombres de colores",
        "Nombres de países",
        "Nombres de animales",
        "Nombres de ciudades",
        "Nombres de deportes",
        "Nombres de profesiones"
      ],
      peda: [
        "Nombres de bebidas alcohólicas",
        "Nombres de canciones de fiesta",
        "Nombres de lugares para bailar",
        "Nombres de cócteles",
        "Nombres de shots",
        "Nombres de juegos de beber",
        "Nombres de fiestas",
        "Nombres de discotecas"
      ],
      hot: [
        "Nombres de posiciones sexuales",
        "Nombres de fetiches",
        "Nombres de fantasías",
        "Nombres de lugares románticos",
        "Nombres de actividades íntimas",
        "Nombres de juegos de pareja",
        "Nombres de palabras picantes",
        "Nombres de experiencias hot"
      ],
      pareja: [
        "Nombres de actividades románticas",
        "Nombres de lugares para citas",
        "Nombres de regalos románticos",
        "Nombres de canciones de amor",
        "Nombres de películas románticas",
        "Nombres de gestos románticos",
        "Nombres de palabras de amor",
        "Nombres de momentos especiales"
      ],
      charades: [
        "Nombres de películas",
        "Nombres de series de TV",
        "Nombres de personajes famosos",
        "Nombres de deportistas",
        "Nombres de cantantes",
        "Nombres de animales",
        "Nombres de profesiones",
        "Nombres de emociones"
      ],
      mixed: [
        "Nombres de marcas de cerveza",
        "Nombres de frutas",
        "Nombres de colores",
        "Nombres de países",
        "Nombres de animales",
        "Nombres de ciudades",
        "Nombres de deportes",
        "Nombres de profesiones"
      ]
    }

    const modeQuestions = questions[gameMode as keyof typeof questions] || questions.mixed
    return modeQuestions[Math.floor(Math.random() * modeQuestions.length)]
  }

  // Generar penalización aleatoria
  const generatePenalty = () => {
    const penalties = isBolivian ? [
      "1 trago",
      "Medio vaso",
      "Vaso entero",
      "Un shot",
      "2 tragos",
      "Fondo blanco",
      "3 tragos",
      "Shot doble"
    ] : [
      "1 trago",
      "Medio vaso",
      "Vaso entero",
      "Un shot",
      "2 tragos",
      "Fondo blanco",
      "3 tragos",
      "Shot doble"
    ]

    return penalties[Math.floor(Math.random() * penalties.length)]
  }

  // Inicializar pregunta al montar el componente
  useEffect(() => {
    setCurrentQuestion(generateQuestion())
  }, [])

  const startBomb = () => {
    setIsActive(true)
    setIsExploded(false)
    setShowQuestion(false)
    setShowPenalty(false)
    setCurrentPlayerIndex(0)
    // Tiempo aleatorio entre 10-30 segundos
    const randomTime = Math.floor(Math.random() * 20) + 10
    setTimeLeft(randomTime)
    
    // Sonido de tictac
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const passBomb = () => {
    if (!isActive || isExploded) return
    
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
    setCurrentPlayerIndex(nextPlayerIndex)
    
    // Añadir tiempo extra al pasar (1-3 segundos)
    const extraTime = Math.floor(Math.random() * 3) + 1
    setTimeLeft(prev => prev + extraTime)
  }

  const handlePenaltyComplete = () => {
    setShowPenalty(false)
    onComplete()
  }

  useEffect(() => {
    if (isActive && timeLeft > 0 && !isExploded) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (isActive && timeLeft <= 0 && !isExploded) {
      // ¡BOOM! La bomba explotó
      setIsExploded(true)
      setExplosionPlayer(players[currentPlayerIndex])
      
      // Sonido de explosión
      if (audioRef.current) {
        audioRef.current.pause()
      }
      
      // Generar penalización
      const penalty = generatePenalty()
      setCurrentPenalty(penalty)
      setShowPenalty(true)
      
      // Notificar al componente padre después de un delay
      setTimeout(() => {
        onExplode(players[currentPlayerIndex])
      }, 3000)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isActive, timeLeft, isExploded, currentPlayerIndex, players, onExplode])

  const getTimeColor = () => {
    if (timeLeft > 15) return 'text-green-500'
    if (timeLeft > 8) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getBombSize = () => {
    if (timeLeft > 15) return 'scale-100'
    if (timeLeft > 8) return 'scale-110'
    return 'scale-125'
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
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

        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-orange-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-orange-400"></div>

        {/* Audio para efectos de sonido */}
        <audio ref={audioRef} loop>
          <source src="/sounds/tick-tock.mp3" type="audio/mpeg" />
        </audio>

        <div className="text-center relative z-10">
          {/* Título */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isBolivian ? '💣 ¡Bomba Cañera!' : '💣 ¡Bomba Drink!'}
          </motion.h1>

          {/* Pregunta inicial */}
          {showQuestion && !isActive && !isExploded && (
            <motion.div 
              className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white mr-2" />
                <span className="text-2xl font-bold text-white">¡PREGUNTA!</span>
              </div>
              <div className="text-xl font-bold text-white mb-4">
                {currentQuestion}
              </div>
              <div className="text-white/80 text-sm">
                {isBolivian 
                  ? '¡Empieza ' + players[0] + ' y continúa en orden!'
                  : '¡Empieza ' + players[0] + ' y continúa en orden!'
                }
              </div>
            </motion.div>
          )}

          {/* Bomba animada */}
          <motion.div 
            className="relative mb-8"
            animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <motion.div
              className={`${getBombSize()} transition-transform duration-300`}
              animate={isExploded ? { scale: [1, 2, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="text-8xl">💣</div>
            </motion.div>
            
            {/* Efectos de explosión */}
            <AnimatePresence>
              {isExploded && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 2, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-8xl">💥</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Timer */}
          {isActive && !isExploded && (
            <motion.div 
              className={`text-6xl font-bold mb-6 ${getTimeColor()}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Timer className="inline-block w-12 h-12 mr-2" />
              {timeLeft}s
            </motion.div>
          )}

          {/* Jugador actual */}
          {isActive && !isExploded && (
            <motion.div 
              className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white mr-2" />
                <span className="text-white font-semibold">Turno de:</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {players[currentPlayerIndex]}
              </div>
              <div className="text-white/80 text-sm mt-2">
                ¡Responde rápido y pasa la bomba!
              </div>
            </motion.div>
          )}

          {/* Mensaje de explosión */}
          {isExploded && !showPenalty && (
            <motion.div 
              className="bg-gradient-to-r from-red-600/80 to-orange-600/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-3xl font-bold text-white mb-2">¡BOOM! 💥</div>
              <div className="text-xl text-white">
                {isBolivian 
                  ? `¡${explosionPlayer} se quedó con la bomba! ¡A cañar!`
                  : `¡${explosionPlayer} se quedó con la bomba! ¡A beber!`
                }
              </div>
            </motion.div>
          )}

          {/* Penalización */}
          <AnimatePresence>
            {showPenalty && currentPenalty && (
              <motion.div 
                className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">¡PENALIZACIÓN!</span>
                </div>
                <div className="text-xl font-bold text-white mb-4">
                  {currentPenalty}
                </div>
                <div className="text-white/80 text-sm">
                  {isBolivian 
                    ? `¡${explosionPlayer} debe cumplir la penalización!`
                    : `¡${explosionPlayer} debe cumplir la penalización!`
                  }
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-4">
            {showQuestion && !isActive && !isExploded && (
              <motion.button
                onClick={startBomb}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="inline-block w-6 h-6 mr-2" />
                {isBolivian ? '¡Empezar la Bomba Cañera!' : '¡Empezar la Bomba!'}
              </motion.button>
            )}

            {isActive && !isExploded && (
              <motion.button
                onClick={passBomb}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="inline-block w-6 h-6 mr-2" />
                {isBolivian ? '¡Pasar la Bomba, Cumpa!' : '¡Pasar la Bomba!'}
              </motion.button>
            )}

            {showPenalty && (
              <motion.button
                onClick={handlePenaltyComplete}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Cumplido!
              </motion.button>
            )}
          </div>

          {/* Lista de jugadores */}
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-3">Jugadores:</h3>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player, index) => (
                <div
                  key={player}
                  className={`p-3 rounded-lg text-sm text-center transition-all ${
                    isActive && !isExploded && index === currentPlayerIndex
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-lg scale-105'
                      : 'bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/20'
                  }`}
                >
                  {player}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BombaGame
