import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Users, X, Play, Zap, Brain, Target, Trophy, Clock, Volume2, VolumeX, Settings, Heart, Star, Crown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { playSound } from '../utils/soundUtils'

interface CulturaChupisticaGameProps {
  players: string[]
  onAnswer: (playerName: string, isCorrect: boolean) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

interface Challenge {
  type: 'peticion' | 'verdad' | 'reto' | 'yo_nunca' | 'trivia'
  difficulty: 'previa' | 'fiesta' | 'hot' | 'bolivia' | 'descontrol' | 'trivia'
  content: string
  options?: string[]
  correct?: string
  penalty?: string
  timeLimit?: number
}

const CulturaChupisticaGame: React.FC<CulturaChupisticaGameProps> = ({ 
  players, 
  onAnswer, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState<{[key: string]: number}>({})
  const [round, setRound] = useState(1)
  const [maxRounds, setMaxRounds] = useState(players.length * 3)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [usedAnswers, setUsedAnswers] = useState<string[]>([])
  const [showPenalty, setShowPenalty] = useState(false)
  const [currentPenalty, setCurrentPenalty] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [gamePhase, setGamePhase] = useState<'waiting' | 'answering' | 'result' | 'penalty'>('waiting')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Base de datos completa de retos y preguntas
  const challenges: Record<string, Record<string, Challenge[]>> = {
    previa: {
      peticion: [
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Nombres de frutas", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Marcas de coches", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Países de Sudamérica", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Cosas que siempre llevas contigo", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Días de la semana", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Colores del arcoíris", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Animales domésticos", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'previa' as const, content: "Cultura Chupística pide: Deportes olímpicos", timeLimit: 15 }
      ]
    },
    fiesta: {
      peticion: [
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Películas de los 90s", timeLimit: 12 },
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Canciones con la palabra 'amor'", timeLimit: 12 },
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Canciones en inglés con partes en español", timeLimit: 12 },
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Supersticiones populares", timeLimit: 12 },
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Comidas de comida rápida", timeLimit: 12 },
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Series de Netflix", timeLimit: 12 },
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Redes sociales", timeLimit: 12 },
        { type: 'peticion' as const, difficulty: 'fiesta' as const, content: "Cultura Chupística pide: Bebidas alcohólicas", timeLimit: 12 }
      ]
    },
    hot: {
      yo_nunca: [
        { type: 'yo_nunca' as const, difficulty: 'hot' as const, content: "Yo nunca he enviado un mensaje comprometedor a la persona equivocada", penalty: "2 shots" },
        { type: 'yo_nunca' as const, difficulty: 'hot' as const, content: "Yo nunca me he liado con alguien en los baños de la uni/oficina", penalty: "2 shots" },
        { type: 'yo_nunca' as const, difficulty: 'hot' as const, content: "Yo nunca he tenido un sueño erótico con alguien que no debería", penalty: "2 shots" },
        { type: 'yo_nunca' as const, difficulty: 'hot' as const, content: "Yo nunca he besado a alguien del mismo sexo", penalty: "1 shot" },
        { type: 'yo_nunca' as const, difficulty: 'hot' as const, content: "Yo nunca he tenido sexo en un lugar público", penalty: "2 shots" },
        { type: 'yo_nunca' as const, difficulty: 'hot' as const, content: "Yo nunca he robado algo de una tienda", penalty: "1 shot" }
      ],
      verdad: [
        { type: 'verdad' as const, difficulty: 'hot' as const, content: "¿Cuál es tu mayor secreto?", penalty: "1 shot si no quieres responder" },
        { type: 'verdad' as const, difficulty: 'hot' as const, content: "Si pudieras cambiar una cosa de ti, ¿cuál sería?", penalty: "1 shot si no quieres responder" },
        { type: 'verdad' as const, difficulty: 'hot' as const, content: "¿Cuál es tu mayor fantasía romántica?", penalty: "1 shot si no quieres responder" },
        { type: 'verdad' as const, difficulty: 'hot' as const, content: "¿Alguna vez te has enamorado de alguien del mismo grupo de amigos?", penalty: "1 shot si no quieres responder" }
      ],
      reto: [
        { type: 'reto' as const, difficulty: 'hot' as const, content: "Dale un beso en la mejilla al jugador que te parezca más atractivo aquí", penalty: "2 shots si no quieres hacerlo" },
        { type: 'reto' as const, difficulty: 'hot' as const, content: "Baila de forma sensual durante 30 segundos", penalty: "2 shots si no quieres hacerlo" },
        { type: 'reto' as const, difficulty: 'hot' as const, content: "Deja que alguien del grupo te toque donde quiera durante 10 segundos", penalty: "2 shots si no quieres hacerlo" },
        { type: 'reto' as const, difficulty: 'hot' as const, content: "Quítate una prenda (opcional y con consentimiento)", penalty: "2 shots si no quieres hacerlo" }
      ]
    },
    bolivia: {
      peticion: [
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: Cosas que te dejan con un buen chaqui", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: Platos pintudos de la gastronomía boliviana", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: ¡Excusas creativas para no estar yesca!", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: Lugares ideales para cañar en La Paz", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: Bebidas típicas bolivianas", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: Danzas folklóricas bolivianas", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: Departamentos de Bolivia", timeLimit: 15 },
        { type: 'peticion' as const, difficulty: 'bolivia' as const, content: "Cultura Chupística pide: Palabras en quechua o aymara", timeLimit: 15 }
      ],
      yo_nunca: [
        { type: 'yo_nunca' as const, difficulty: 'bolivia' as const, content: "Yo nunca he ido al Carnaval de Oruro y he terminado bien yuca", penalty: "Un trago de Singani" },
        { type: 'yo_nunca' as const, difficulty: 'bolivia' as const, content: "Yo nunca he dicho 'nove?' más de cinco veces en una conversación", penalty: "1 shot" },
        { type: 'yo_nunca' as const, difficulty: 'bolivia' as const, content: "Yo nunca he estado yesca en una fiesta", penalty: "1 shot" },
        { type: 'yo_nunca' as const, difficulty: 'bolivia' as const, content: "Yo nunca he cañado hasta el amanecer", penalty: "1 shot" },
        { type: 'yo_nunca' as const, difficulty: 'bolivia' as const, content: "Yo nunca he tenido un chaqui terrible", penalty: "1 shot" },
        { type: 'yo_nunca' as const, difficulty: 'bolivia' as const, content: "Yo nunca he hecho algo waso en una fiesta", penalty: "1 shot" }
      ],
      reto: [
        { type: 'reto' as const, difficulty: 'bolivia' as const, content: "¡Haz el baile más pintudo que conozcas al ritmo de una cumbia boliviana!", penalty: "Fondo blanco de Paceña" },
        { type: 'reto' as const, difficulty: 'bolivia' as const, content: "Demuéstranos tu ñeque y cuenta el chisme más grande que sepas sin mencionar nombres", penalty: "Un trago de Singani" },
        { type: 'reto' as const, difficulty: 'bolivia' as const, content: "Baila un paso de folklore boliviano", penalty: "1 shot" },
        { type: 'reto' as const, difficulty: 'bolivia' as const, content: "Haz un brindis cañero por Bolivia", penalty: "1 shot" }
      ]
    },
    descontrol: {
      peticion: [
        { type: 'peticion' as const, difficulty: 'descontrol' as const, content: "Cultura Chupística pide: Nombra 5 cosas en la habitación que empiecen con la letra 'P' en menos de 10 segundos", timeLimit: 10 },
        { type: 'peticion' as const, difficulty: 'descontrol' as const, content: "Cultura Chupística pide: Palabras impronunciables", timeLimit: 8 },
        { type: 'peticion' as const, difficulty: 'descontrol' as const, content: "Cultura Chupística pide: Decir el abecedario al revés lo más rápido posible", timeLimit: 20 },
        { type: 'peticion' as const, difficulty: 'descontrol' as const, content: "Cultura Chupística pide: Responder con solo monosílabos durante 3 turnos", timeLimit: 5 }
      ],
      reto: [
        { type: 'reto' as const, difficulty: 'descontrol' as const, content: "Llama a tu ex y déjale un mensaje de voz diciendo lo mucho que lo/la extrañas (con opción de saltar)", penalty: "Tomar 3 shots seguidos" },
        { type: 'reto' as const, difficulty: 'descontrol' as const, content: "Beber el vaso de otro jugador (a elegir)", penalty: "El grupo elige un castigo colectivo" },
        { type: 'reto' as const, difficulty: 'descontrol' as const, content: "El grupo elige un castigo colectivo e hilarante", penalty: "Cumplir el castigo elegido" }
      ]
    },
    trivia: {
      trivia: [
        { 
          type: 'trivia' as const, 
          difficulty: 'trivia' as const, 
          content: "¿Cuál es el río más largo del mundo?", 
          options: ["Nilo", "Amazonas", "Misisipi", "Yangtsé"],
          correct: "Nilo",
          penalty: "1 shot por respuesta incorrecta"
        },
        { 
          type: 'trivia' as const, 
          difficulty: 'trivia' as const, 
          content: "¿En qué año se firmó la Declaración de Independencia de Bolivia?", 
          options: ["1824", "1825", "1826", "1827"],
          correct: "1825",
          penalty: "1 shot por respuesta incorrecta"
        },
        { 
          type: 'trivia' as const, 
          difficulty: 'trivia' as const, 
          content: "¿Cuál es la capital de Francia?", 
          options: ["Londres", "París", "Madrid", "Roma"],
          correct: "París",
          penalty: "1 shot por respuesta incorrecta"
        },
        { 
          type: 'trivia' as const, 
          difficulty: 'trivia' as const, 
          content: "¿Cuántos planetas hay en el sistema solar?", 
          options: ["7", "8", "9", "10"],
          correct: "8",
          penalty: "1 shot por respuesta incorrecta"
        }
      ]
    }
  }

  // Generar reto aleatorio
  const generateChallenge = (): Challenge => {
    const mode = gameMode || 'fiesta'
    const modeChallenges = challenges[mode as keyof typeof challenges]
    
    if (!modeChallenges) {
      // Fallback a fiesta si el modo no existe
      const fiestaChallenges = challenges.fiesta
      const challengeTypes = Object.keys(fiestaChallenges) as Array<keyof typeof fiestaChallenges>
      const randomType = challengeTypes[Math.floor(Math.random() * challengeTypes.length)]
      const typeChallenges = fiestaChallenges[randomType]
      return typeChallenges[Math.floor(Math.random() * typeChallenges.length)]
    }

    const challengeTypes = Object.keys(modeChallenges) as Array<keyof typeof modeChallenges>
    const randomType = challengeTypes[Math.floor(Math.random() * challengeTypes.length)]
    const typeChallenges = modeChallenges[randomType]
    return typeChallenges[Math.floor(Math.random() * typeChallenges.length)]
  }

  // Memoizar handleTimeOut para evitar recreaciones
  const handleTimeOut = useCallback(() => {
    setIsTimerActive(false)
    setIsCorrect(false)
    setShowResult(true)
    setGamePhase('result')
    
    // Penalización por tiempo agotado
    const penalty = currentChallenge?.penalty || "1 shot"
    setCurrentPenalty(penalty)
    setShowPenalty(true)
    setGamePhase('penalty')
    
    // Notificar al componente padre
    onAnswer(players[currentPlayerIndex], false)
  }, [currentChallenge, currentPlayerIndex, players, onAnswer])

  // Inicializar puntuaciones - solo cuando cambian los jugadores
  useEffect(() => {
    if (players.length > 0) {
      const initialScores: {[key: string]: number} = {}
    players.forEach(player => {
        initialScores[player] = 0
      })
      setScore(initialScores)
    }
  }, [players])

  // Timer effect - memoizado para evitar loops infinitos
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else if (isTimerActive && timeLeft <= 0) {
      // Tiempo agotado
      handleTimeOut()
    }
  }, [isTimerActive, timeLeft, handleTimeOut])

  const startNewRound = () => {
    const challenge = generateChallenge()
    setCurrentChallenge(challenge)
    setUsedAnswers([])
    setSelectedAnswer('')
    setShowResult(false)
    setShowPenalty(false)
    setGamePhase('waiting')
    
    // Configurar timer si el reto lo requiere
    if (challenge.timeLimit) {
      setTimeLeft(challenge.timeLimit)
      setIsTimerActive(true)
    }
  }

  const handleAnswer = (answer: string) => {
    if (currentChallenge?.type === 'trivia') {
      // Para trivia, verificar respuesta correcta
      const correct = answer === currentChallenge.correct
      setIsCorrect(correct)
    setSelectedAnswer(answer)
    setShowResult(true)
      setGamePhase('result')
      setIsTimerActive(false)
    
    // Actualizar puntuación
    const currentPlayer = players[currentPlayerIndex]
    setScore(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + (correct ? 1 : 0)
    }))
    
    // Notificar al componente padre
    onAnswer(currentPlayer, correct)
      
      if (!correct && currentChallenge.penalty) {
        setCurrentPenalty(currentChallenge.penalty)
        setShowPenalty(true)
        setGamePhase('penalty')
      }
    } else {
      // Para otros tipos, verificar que no se repita
      if (usedAnswers.includes(answer.toLowerCase())) {
        setIsCorrect(false)
        setSelectedAnswer(answer)
        setShowResult(true)
        setGamePhase('result')
        setIsTimerActive(false)
        
        // Penalización por repetir
        const penalty = currentChallenge?.penalty || "1 shot"
        setCurrentPenalty(penalty)
        setShowPenalty(true)
        setGamePhase('penalty')
        
        // Notificar al componente padre
        onAnswer(players[currentPlayerIndex], false)
      } else {
        // Respuesta válida
        setIsCorrect(true)
        setSelectedAnswer(answer)
        setUsedAnswers(prev => [...prev, answer.toLowerCase()])
        setShowResult(true)
        setGamePhase('result')
        setIsTimerActive(false)
        
        // Actualizar puntuación
        const currentPlayer = players[currentPlayerIndex]
        setScore(prev => ({
          ...prev,
          [currentPlayer]: prev[currentPlayer] + 1
        }))
        
        // Notificar al componente padre
        onAnswer(currentPlayer, true)
      }
    }
  }

  const skipChallenge = () => {
    const penalty = currentChallenge?.penalty || "1 shot"
    setCurrentPenalty(penalty)
    setShowPenalty(true)
    setGamePhase('penalty')
    setIsTimerActive(false)
    
    // Notificar al componente padre
    onAnswer(players[currentPlayerIndex], false)
  }

  const nextRound = () => {
    if (round >= maxRounds) {
      onComplete()
      return
    }
    
    setRound(prev => prev + 1)
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
    startNewRound()
  }

  const handlePenaltyComplete = () => {
    setShowPenalty(false)
    setShowResult(false)
    nextRound()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'previa': return 'from-green-500 to-emerald-500'
      case 'fiesta': return 'from-blue-500 to-indigo-500'
      case 'hot': return 'from-red-500 to-pink-500'
      case 'bolivia': return 'from-yellow-500 to-orange-500'
      case 'descontrol': return 'from-purple-500 to-violet-500'
      case 'trivia': return 'from-cyan-500 to-teal-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'previa': return 'PREVIA'
      case 'fiesta': return 'FIESTA'
      case 'hot': return 'HOT'
      case 'bolivia': return 'BOLIVIA'
      case 'descontrol': return 'DESCONTROL'
      case 'trivia': return 'TRIVIA'
      default: return 'MIXTO'
    }
  }

  const getTimeColor = () => {
    if (timeLeft > 10) return 'text-green-500'
    if (timeLeft > 5) return 'text-yellow-500'
    return 'text-red-500'
  }

  // Inicializar primera ronda
  useEffect(() => {
    startNewRound()
  }, [])

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>



        <div className="text-center relative z-10">
          {/* Título */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isBolivian ? '🧠 ¡Cultura Cañera!' : '🧠 ¡Cultura Chupística!'}
          </motion.h1>

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
                <span className="font-semibold">Ronda {round} de {maxRounds}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-semibold">{players[currentPlayerIndex]}</span>
            </div>
            </div>
          </motion.div>

          {/* Timer */}
          {isTimerActive && timeLeft > 0 && (
            <motion.div 
              className={`text-4xl font-bold mb-4 ${getTimeColor()}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Clock className="inline-block w-8 h-8 mr-2" />
              {timeLeft}s
            </motion.div>
          )}

          {/* Reto actual */}
          {currentChallenge && gamePhase === 'waiting' && (
            <motion.div 
              className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-white mr-2" />
                <span className="text-2xl font-bold text-white">¡RETO!</span>
              </div>
              
              {/* Dificultad */}
              <div className={`inline-block bg-gradient-to-r ${getDifficultyColor(currentChallenge.difficulty)} text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                {getDifficultyText(currentChallenge.difficulty)}
              </div>
              
              <div className="text-xl font-bold text-white mb-6">
                {currentChallenge.content}
              </div>
              
              {/* Opciones para trivia */}
              {currentChallenge.type === 'trivia' && currentChallenge.options && (
                <div className="space-y-3 mb-4">
                  {currentChallenge.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/20"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
                </div>
              )}
              
              {/* Botones de acción */}
              <div className="flex space-x-4">
                <motion.button
                  onClick={skipChallenge}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XCircle className="inline-block w-5 h-5 mr-2" />
                  ¡Saltar!
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Resultado */}
          <AnimatePresence>
            {showResult && (
              <motion.div 
                className={`backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-green-600/90 to-emerald-600/90' 
                    : 'bg-gradient-to-r from-red-600/90 to-orange-600/90'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-white mr-2" />
                  ) : (
                    <XCircle className="w-8 h-8 text-white mr-2" />
                  )}
                  <span className="text-2xl font-bold text-white">
                    {isCorrect ? '¡CORRECTO!' : '¡INCORRECTO!'}
                  </span>
                </div>
                <div className="text-xl font-bold text-white mb-4">
                  {isCorrect 
                    ? `¡${players[currentPlayerIndex]} acertó!`
                    : `¡${players[currentPlayerIndex]} se equivocó!`
                  }
                </div>
                {currentChallenge?.type === 'trivia' && (
                <div className="text-white/80 text-sm">
                    Respuesta correcta: <span className="font-bold">{currentChallenge.correct}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Penalización */}
          <AnimatePresence>
            {showPenalty && currentPenalty && (
              <motion.div 
                className="bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
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
                <div className="text-white/80 text-sm mb-4">
                  ¡{players[currentPlayerIndex]} debe cumplir la penalización!
                </div>
                <motion.button
                  onClick={handlePenaltyComplete}
                  className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all border border-white/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ¡Cumplido!
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-4">
            {showResult && !showPenalty && (
              <motion.button
                onClick={nextRound}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {round >= maxRounds ? '¡Ver Resultados!' : '¡Siguiente Ronda!'}
              </motion.button>
            )}
          </div>

          {/* Puntuación */}
          {/* Eliminado - solo tragos importan */}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CulturaChupisticaGame
