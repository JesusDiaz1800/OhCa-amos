import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RotateCcw, 
  Users, 
  X, 
  Volume2, 
  VolumeX, 
  Settings, 
  Check, 
  XCircle, 
  Beer, 
  Sparkles, 
  Zap, 
  Crown, 
  Star, 
  Heart, 
  Trophy, 
  Play, 
  Pause, 
  SkipForward,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  Target,
  Flame,
  Wine,
  GlassWater,
  PartyPopper,
  Camera,
  Globe,
  MapPin,
  Brain,
  Gamepad2,
  Flag
} from 'lucide-react'

interface YoNuncaGameProps {
  players: string[]
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

interface Question {
  id: number
  text: string
  difficulty: 'suave' | 'atrevido' | 'picante' | 'bolivia'
  category: string
}

const YoNuncaGame: React.FC<YoNuncaGameProps> = ({ 
  players, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [gamePhase, setGamePhase] = useState<'waiting' | 'question' | 'result' | 'penalty'>('waiting')
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [playersWhoDrank, setPlayersWhoDrank] = useState<string[]>([])
  const [totalDrinks, setTotalDrinks] = useState<{[key: string]: number}>({})
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [round, setRound] = useState(1)
  const [maxRounds, setMaxRounds] = useState(players.length * 3)
  const [usedQuestions, setUsedQuestions] = useState<number[]>([])
  const [intensity, setIntensity] = useState<'suave' | 'atrevido' | 'picante'>('suave')
  const [showParticles, setShowParticles] = useState(false)
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const drinkRef = useRef<HTMLAudioElement | null>(null)
  const cheerRef = useRef<HTMLAudioElement | null>(null)
  const penaltyRef = useRef<HTMLAudioElement | null>(null)

  // Base de datos masiva de preguntas "Yo Nunca"
  const questions: Question[] = [
    // Modo Clásico - Suave
    { id: 1, text: "Yo nunca se me ha caído el móvil al váter", difficulty: 'suave', category: 'general' },
    { id: 2, text: "Yo nunca me he metido en una pelea a puñetazos", difficulty: 'suave', category: 'general' },
    { id: 3, text: "Yo nunca he jugado al juego de la botella", difficulty: 'suave', category: 'general' },
    { id: 4, text: "Yo nunca he saludado a alguien que pensaba que era otra persona", difficulty: 'suave', category: 'general' },
    { id: 5, text: "Yo nunca envié un mensaje de texto a la persona equivocada", difficulty: 'suave', category: 'general' },
    { id: 6, text: "Yo nunca he fingido que un chiste me hace gracia", difficulty: 'suave', category: 'general' },
    { id: 7, text: "Yo nunca he fingido ir borracho/a para quitarme de encima a una persona", difficulty: 'suave', category: 'general' },
    { id: 8, text: "Yo nunca he tenido un sueño erótico con alguien que no debería", difficulty: 'suave', category: 'general' },
    { id: 9, text: "Yo nunca he deseado a alguien que está hoy aquí", difficulty: 'suave', category: 'general' },
    { id: 10, text: "Yo nunca he pasado más de una hora seguida usando una app para ligar", difficulty: 'suave', category: 'general' },
    
    // Modo Clásico - Atrevido
    { id: 11, text: "Yo nunca he tenido sexo en un lugar público", difficulty: 'atrevido', category: 'picante' },
    { id: 12, text: "Yo nunca he enviado una foto comprometedora", difficulty: 'atrevido', category: 'picante' },
    { id: 13, text: "Yo nunca he tenido una aventura con alguien comprometido", difficulty: 'atrevido', category: 'picante' },
    { id: 14, text: "Yo nunca he fingido un orgasmo", difficulty: 'atrevido', category: 'picante' },
    { id: 15, text: "Yo nunca he tenido sexo con más de una persona a la vez", difficulty: 'atrevido', category: 'picante' },
    { id: 16, text: "Yo nunca he tenido sexo en el trabajo", difficulty: 'atrevido', category: 'picante' },
    { id: 17, text: "Yo nunca he tenido sexo con un amigo/a", difficulty: 'atrevido', category: 'picante' },
    { id: 18, text: "Yo nunca he tenido sexo con alguien del mismo sexo", difficulty: 'atrevido', category: 'picante' },
    { id: 19, text: "Yo nunca he tenido sexo con alguien mucho mayor que yo", difficulty: 'atrevido', category: 'picante' },
    { id: 20, text: "Yo nunca he tenido sexo con alguien mucho menor que yo", difficulty: 'atrevido', category: 'picante' },
    
    // Modo Clásico - Picante
    { id: 21, text: "Yo nunca he tenido sexo con un familiar", difficulty: 'picante', category: 'extremo' },
    { id: 22, text: "Yo nunca he tenido sexo con un animal", difficulty: 'picante', category: 'extremo' },
    { id: 23, text: "Yo nunca he tenido sexo con un muerto", difficulty: 'picante', category: 'extremo' },
    { id: 24, text: "Yo nunca he tenido sexo con un extraterrestre", difficulty: 'picante', category: 'extremo' },
    { id: 25, text: "Yo nunca he tenido sexo con un fantasma", difficulty: 'picante', category: 'extremo' },
    
    // Modo Bolivia - Suave
    { id: 26, text: "Yo nunca he tenido una 'chaki' tan fuerte que no pude levantarme", difficulty: 'bolivia', category: 'bolivia' },
    { id: 27, text: "Yo nunca he 'cañado' hasta el amanecer y luego he tenido que ir a trabajar", difficulty: 'bolivia', category: 'bolivia' },
    { id: 28, text: "Yo nunca le he dicho a mi 'cumpa': 'nove?' para que me dé la razón aunque no la tenga", difficulty: 'bolivia', category: 'bolivia' },
    { id: 29, text: "Yo nunca me he puesto 'waaa' por alguna noticia inesperada", difficulty: 'bolivia', category: 'bolivia' },
    { id: 30, text: "Yo nunca he 'pirañeado' en una fiesta y me ha salido bien", difficulty: 'bolivia', category: 'bolivia' },
    { id: 31, text: "Yo nunca he sentido que la gente me tacha de 'bolita borracho' solo por ir de fiesta", difficulty: 'bolivia', category: 'bolivia' },
    { id: 32, text: "Yo nunca he usado un 'diminutivo' para todo, como 'unito', 'poquito' o 'chiquito'", difficulty: 'bolivia', category: 'bolivia' },
    { id: 33, text: "Yo nunca he comido 'salteña' a las 3 de la mañana", difficulty: 'bolivia', category: 'bolivia' },
    { id: 34, text: "Yo nunca he bailado 'morenada' completamente borracho", difficulty: 'bolivia', category: 'bolivia' },
    { id: 35, text: "Yo nunca he dicho '¡Qué calor, cumpa!' en pleno invierno", difficulty: 'bolivia', category: 'bolivia' },
    
    // Modo Bolivia - Atrevido
    { id: 36, text: "Yo nunca he tenido sexo en el 'Teleférico'", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 37, text: "Yo nunca he 'cañado' con mi 'cumpa' y luego nos hemos besado", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 38, text: "Yo nunca he tenido sexo en el 'Prado'", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 39, text: "Yo nunca he 'pirañeado' con mi 'tía'", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 40, text: "Yo nunca he tenido sexo en el 'Valle de la Luna'", difficulty: 'bolivia', category: 'bolivia-picante' },
    
    // Más preguntas generales
    { id: 41, text: "Yo nunca he robado algo de una tienda", difficulty: 'suave', category: 'general' },
    { id: 42, text: "Yo nunca he mentido en mi CV", difficulty: 'suave', category: 'general' },
    { id: 43, text: "Yo nunca he copiado en un examen", difficulty: 'suave', category: 'general' },
    { id: 44, text: "Yo nunca he tenido una cuenta falsa en redes sociales", difficulty: 'suave', category: 'general' },
    { id: 45, text: "Yo nunca he stalkeado a mi ex en redes sociales", difficulty: 'suave', category: 'general' },
    { id: 46, text: "Yo nunca he tenido sexo con mi jefe", difficulty: 'atrevido', category: 'picante' },
    { id: 47, text: "Yo nunca he tenido sexo con mi profesor", difficulty: 'atrevido', category: 'picante' },
    { id: 48, text: "Yo nunca he tenido sexo con mi médico", difficulty: 'atrevido', category: 'picante' },
    { id: 49, text: "Yo nunca he tenido sexo con mi abogado", difficulty: 'atrevido', category: 'picante' },
    { id: 50, text: "Yo nunca he tenido sexo con mi psicólogo", difficulty: 'atrevido', category: 'picante' },
    
    // Preguntas más extremas
    { id: 51, text: "Yo nunca he tenido sexo con un policía", difficulty: 'picante', category: 'extremo' },
    { id: 52, text: "Yo nunca he tenido sexo con un bombero", difficulty: 'picante', category: 'extremo' },
    { id: 53, text: "Yo nunca he tenido sexo con un militar", difficulty: 'picante', category: 'extremo' },
    { id: 54, text: "Yo nunca he tenido sexo con un sacerdote", difficulty: 'picante', category: 'extremo' },
    { id: 55, text: "Yo nunca he tenido sexo con un político", difficulty: 'picante', category: 'extremo' },
    
    // Más preguntas bolivianas
    { id: 56, text: "Yo nunca he 'cañado' con mi 'mama'", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 57, text: "Yo nunca he tenido sexo en el 'Illimani'", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 58, text: "Yo nunca he 'pirañeado' con mi 'papa'", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 59, text: "Yo nunca he tenido sexo en el 'Titicaca'", difficulty: 'bolivia', category: 'bolivia-picante' },
    { id: 60, text: "Yo nunca he 'cañado' con mi 'hermano'", difficulty: 'bolivia', category: 'bolivia-picante' }
  ]

  // Partículas para efectos virales
  const particles = [
    { icon: Beer, delay: 0, duration: 8 },
    { icon: Wine, delay: 1, duration: 10 },
    { icon: Sparkles, delay: 2, duration: 12 },
    { icon: Heart, delay: 3, duration: 9 },
    { icon: Star, delay: 4, duration: 11 },
    { icon: Crown, delay: 5, duration: 7 },
    { icon: Flame, delay: 6, duration: 13 },
    { icon: PartyPopper, delay: 7, duration: 8 },
    { icon: Camera, delay: 8, duration: 10 },
    { icon: Gamepad2, delay: 9, duration: 9 },
    { icon: Globe, delay: 10, duration: 11 },
    { icon: MapPin, delay: 11, duration: 10 },
            { icon: Zap, delay: 12, duration: 9 },
    { icon: Brain, delay: 13, duration: 12 },
    { icon: Flag, delay: 14, duration: 8 }
  ]

  // Inicializar tragos
  useEffect(() => {
    const initialDrinks: {[key: string]: number} = {}
    players.forEach(player => {
      initialDrinks[player] = 0
    })
    setTotalDrinks(initialDrinks)
  }, [players])

  // Cargar sonidos
  useEffect(() => {
    audioRef.current = new Audio('/sounds/question-reveal.mp3')
    drinkRef.current = new Audio('/sounds/drink.mp3')
    cheerRef.current = new Audio('/sounds/cheer.mp3')
    penaltyRef.current = new Audio('/sounds/penalty.mp3')
  }, [])

  const getFilteredQuestions = () => {
    if (isBolivian) {
      return questions.filter(q => q.difficulty === 'bolivia' || q.difficulty === intensity)
    }
    return questions.filter(q => q.difficulty === intensity && q.difficulty !== 'bolivia')
  }

  const getRandomQuestion = () => {
    const filteredQuestions = getFilteredQuestions()
    const availableQuestions = filteredQuestions.filter(q => !usedQuestions.includes(q.id))
    
    if (availableQuestions.length === 0) {
      // Si no hay preguntas disponibles, resetear las usadas
      setUsedQuestions([])
      return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  }

  const startNewRound = () => {
    const question = getRandomQuestion()
    setCurrentQuestion(question)
    setUsedQuestions(prev => [...prev, question.id])
    setPlayersWhoDrank([])
    setShowQuestion(false)
    setGamePhase('waiting')
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 3000)
  }

  const revealQuestion = () => {
    setShowQuestion(true)
    setGamePhase('question')
    
    // Sonido de revelación
    if (soundEnabled && audioRef.current) {
      audioRef.current.play()
    }
    
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2000)
  }

  const handlePlayerDrink = (playerName: string) => {
    setPlayersWhoDrank(prev => [...prev, playerName])
    setTotalDrinks(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + 1
    }))
    
    // Sonido de trago
    if (soundEnabled && drinkRef.current) {
      drinkRef.current.play()
    }

    // Efecto de confeti para el que bebe
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const handlePlayerNotDrink = (playerName: string) => {
    // Penalización por mentir (doble trago)
    setTotalDrinks(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + 2
    }))
    
    // Sonido de penalización
    if (soundEnabled && penaltyRef.current) {
      penaltyRef.current.play()
    }
  }

  const nextTurn = () => {
    if (round >= maxRounds) {
      onComplete()
      return
    }
    
    setRound(prev => prev + 1)
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
    startNewRound()
  }

  const skipQuestion = () => {
    startNewRound()
  }

  const toggleSound = () => {
    setSoundEnabled(prev => !prev)
  }

  const toggleSettings = () => {
    setShowSettings(prev => !prev)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'suave': return 'from-green-500 to-emerald-500'
      case 'atrevido': return 'from-blue-500 to-indigo-500'
      case 'picante': return 'from-red-500 to-pink-500'
      case 'bolivia': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'suave': return 'SUAVE'
      case 'atrevido': return 'ATREVIDO'
      case 'picante': return 'PICANTE'
      case 'bolivia': return 'BOLIVIA'
      default: return 'MIXTO'
    }
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
      {/* Efectos de fondo dinámicos */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Partículas flotantes */}
      <AnimatePresence>
        {showParticles && particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute text-white/20 pointer-events-none"
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

      <motion.div 
        className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 rounded-3xl p-8 max-w-2xl w-full relative overflow-hidden"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Botón de cerrar */}
        <motion.button
          onClick={onComplete}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>

        {/* Botón de configuración */}
        <motion.button
          onClick={toggleSettings}
          className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20"
          whileHover={{ scale: 1.1, rotate: -90 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={24} />
        </motion.button>

        {/* Efectos de partículas virales */}
        <AnimatePresence>
          {showSparkles && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
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
              {[...Array(50)].map((_, i) => (
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
                  {['🎉', '🎊', '🎈', '🎁', '⭐', '💫', '🌟', '✨', '🍺', '🥂', '🧠', '🔥', '💋', '💕', '💘'][Math.floor(Math.random() * 15)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>

        <div className="text-center relative z-10">
          {/* Título */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isBolivian ? '🍺 ¡Yo Nunca… Cañero!' : '🍺 ¡Yo Nunca… La Pura Verdad!'}
          </motion.h1>

          {/* Información de la ronda */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between text-white mb-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Target className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold">Ronda {round}/{maxRounds}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Users className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold">{players[currentPlayerIndex]}</span>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(round / maxRounds) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Contenido principal */}
          <AnimatePresence mode="wait">
            {gamePhase === 'waiting' && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-white text-xl">
                  <motion.div 
                    className="font-bold mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ¡Turno de {players[currentPlayerIndex]}!
                  </motion.div>
                  <div className="opacity-80">Presiona el botón para revelar la pregunta</div>
                </div>

                <motion.button
                  onClick={revealQuestion}
                  className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-2xl transition-all shadow-lg text-xl overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Play className="w-8 h-8" />
                    </motion.div>
                    ¡Revelar Pregunta!
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            )}

            {gamePhase === 'question' && currentQuestion && (
              <motion.div
                key="question"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-6"
              >
                {/* Dificultad */}
                <motion.div 
                  className={`inline-block bg-gradient-to-r ${getDifficultyColor(currentQuestion.difficulty)} text-white px-4 py-2 rounded-full font-bold text-sm`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {getDifficultyText(currentQuestion.difficulty)}
                </motion.div>

                {/* Pregunta */}
                <motion.div
                  className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="text-3xl font-bold text-white mb-4"
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.6)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {currentQuestion.text}
                  </motion.div>
                  <div className="text-white/80 text-lg">
                    ¡Si lo hiciste, toma un trago! 🍺
                  </div>
                </motion.div>

                {/* Lista de jugadores */}
                <div className="grid grid-cols-2 gap-3">
                  {players.map((player) => (
                    <motion.button
                      key={player}
                      onClick={() => {
                        if (playersWhoDrank.includes(player)) {
                          handlePlayerNotDrink(player)
                        } else {
                          handlePlayerDrink(player)
                        }
                      }}
                      onHoverStart={() => setHoveredPlayer(player)}
                      onHoverEnd={() => setHoveredPlayer(null)}
                      className={`p-4 rounded-xl text-center transition-all ${
                        playersWhoDrank.includes(player)
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg scale-105'
                          : 'bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/20 hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="font-bold text-lg">{player}</div>
                      <div className="text-sm opacity-80">
                        {playersWhoDrank.includes(player) ? '¡Bebió!' : 'No bebió'}
                      </div>
                      <div className="text-xs opacity-60">
                        {totalDrinks[player] || 0} 🍺
                      </div>
                      
                      {/* Efecto de partículas en hover */}
                      <AnimatePresence>
                        {hoveredPlayer === player && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                initial={{
                                  x: "50%",
                                  y: "50%",
                                  scale: 0
                                }}
                                animate={{
                                  x: `${Math.random() * 100}%`,
                                  y: `${Math.random() * 100}%`,
                                  scale: [0, 1, 0],
                                  opacity: [0, 0.8, 0]
                                }}
                                transition={{
                                  duration: 1,
                                  delay: i * 0.1
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>

                {/* Controles */}
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={skipQuestion}
                    className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipForward className="inline-block w-5 h-5 mr-2" />
                    Saltar
                  </motion.button>

                  <motion.button
                    onClick={nextTurn}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight className="inline-block w-5 h-5 mr-2" />
                    Siguiente
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={toggleSettings}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Configuración</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Sonido</span>
                  <button
                    onClick={toggleSound}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      soundEnabled ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white">Intensidad</span>
                  <select 
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value as 'suave' | 'atrevido' | 'picante')}
                    className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2"
                  >
                    <option value="suave">Suave</option>
                    <option value="atrevido">Atrevido</option>
                    <option value="picante">Picante</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={toggleSettings}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl mt-6"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default YoNuncaGame
