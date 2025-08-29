import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Users, Volume2, X, Play, Zap, AlertTriangle, Target, Settings, VolumeX, Heart, Star, Crown, Bomb, Flame, Zap as Lightning, Skull, Trophy, Clock, Check, XCircle, Beer, Wine, GlassWater, Award, Gamepad2 } from 'lucide-react'

interface BombaGameProps {
  players: string[]
  onExplode: (playerName: string) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

interface Penalty {
  type: 'drink' | 'action' | 'truth' | 'dare' | 'bolivia' | 'group' | 'conditional'
  content: string
  intensity: 'mild' | 'medium' | 'extreme' | 'bolivia'
  description: string
  drinks?: number
  groupAction?: boolean
  conditional?: {
    phrase: string
    penalty: number
    duration: number // rondas que dura la condición
  }
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
  const [currentPenalty, setCurrentPenalty] = useState<Penalty | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [bombIntensity, setBombIntensity] = useState(1)
  const [explosionCount, setExplosionCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [round, setRound] = useState(1)

  const [showExplosionEffect, setShowExplosionEffect] = useState(false)
  const [showShockwave, setShowShockwave] = useState(false)
  const [gamePhase, setGamePhase] = useState<'waiting' | 'active' | 'exploded' | 'penalty' | 'penaltyResult'>('waiting')
  const [penaltyCompleted, setPenaltyCompleted] = useState(false)
  const [activeConditionals, setActiveConditionals] = useState<Array<{
    phrase: string
    penalty: number
    roundsLeft: number
    description: string
  }>>([])
  const [totalDrinks, setTotalDrinks] = useState<{[key: string]: number}>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const explosionRef = useRef<HTMLAudioElement | null>(null)
  const tickRef = useRef<HTMLAudioElement | null>(null)

  // Base de datos de preguntas súper divertidas
  const questions = {
    previa: [
      "Nombres de marcas de cerveza que empiecen con 'C'",
      "Nombres de frutas que sean de color rojo",
      "Nombres de colores que tengan 4 letras",
      "Nombres de países que terminen en 'ia'",
      "Nombres de animales que vivan en el mar",
      "Nombres de ciudades que tengan 'a' y 'o'",
      "Nombres de deportes que se jueguen con pelota",
      "Nombres de profesiones que empiecen con 'D'",
      "Nombres de comidas que contengan queso",
      "Nombres de bebidas que sean gaseosas"
    ],
    fiesta: [
      "Nombres de canciones que tengan 'amor' en el título",
      "Nombres de películas de acción de los 90s",
      "Nombres de cócteles que contengan vodka",
      "Nombres de lugares para bailar en la ciudad",
      "Nombres de shots que sean de colores",
      "Nombres de juegos de beber que conozcas",
      "Nombres de fiestas temáticas populares",
      "Nombres de discotecas famosas",
      "Nombres de canciones de reggaeton",
      "Nombres de bebidas que sean dulces"
    ],
    hot: [
      "Nombres de posiciones del Kamasutra",
      "Nombres de fetiches que conozcas",
      "Nombres de fantasías románticas",
      "Nombres de lugares románticos para citas",
      "Nombres de actividades íntimas",
      "Nombres de juegos de pareja",
      "Nombres de palabras picantes en español",
      "Nombres de experiencias hot que hayas tenido",
      "Nombres de partes del cuerpo atractivas",
      "Nombres de situaciones románticas"
    ],
    bolivia: [
      "Nombres de platos típicos bolivianos",
      "Nombres de bebidas alcohólicas bolivianas",
      "Nombres de danzas folklóricas",
      "Nombres de departamentos de Bolivia",
      "Nombres de lugares turísticos bolivianos",
      "Nombres de palabras en quechua",
      "Nombres de palabras en aymara",
      "Nombres de festividades bolivianas",
      "Nombres de comidas callejeras",
      "Nombres de bebidas tradicionales"
    ],
    descontrol: [
      "Nombres de cosas que te hagan reír hasta llorar",
      "Nombres de situaciones embarazosas",
      "Nombres de cosas que te den vergüenza",
      "Nombres de secretos que nunca contarías",
      "Nombres de cosas que te hagan enojar",
      "Nombres de miedos irracionales",
      "Nombres de cosas que te hagan llorar",
      "Nombres de situaciones incómodas",
      "Nombres de cosas que te hagan sentir vulnerable",
      "Nombres de experiencias traumáticas"
    ],
    mixed: [
      "Nombres de marcas de cerveza",
      "Nombres de frutas",
      "Nombres de colores",
      "Nombres de países",
      "Nombres de animales",
      "Nombres de ciudades",
      "Nombres de deportes",
      "Nombres de profesiones",
      "Nombres de comidas",
      "Nombres de bebidas"
    ]
  }

  // Base de datos de penalizaciones súper mejoradas
  const penalties = {
    mild: [
      { type: 'drink', content: "1 trago", intensity: 'mild', description: "¡Un trago para calentar!", drinks: 1 },
      { type: 'drink', content: "Medio vaso", intensity: 'mild', description: "¡Mitad de camino!", drinks: 1 },
      { type: 'action', content: "Baila 10 segundos", intensity: 'mild', description: "¡Muévete un poco!" },
      { type: 'truth', content: "Cuenta un chiste", intensity: 'mild', description: "¡Haznos reír!" },
      { type: 'dare', content: "Imita a alguien del grupo", intensity: 'mild', description: "¡Actúa como ellos!" },
      { type: 'conditional', content: "Di 'mi amor' después de cada frase", intensity: 'mild', description: "¡Romántico por 3 rondas!", conditional: { phrase: "mi amor", penalty: 2, duration: 3 } },
      { type: 'conditional', content: "Di 'cumpa' al final de cada frase", intensity: 'mild', description: "¡Boliviano por 2 rondas!", conditional: { phrase: "cumpa", penalty: 1, duration: 2 } }
    ],
    medium: [
      { type: 'drink', content: "Vaso entero", intensity: 'medium', description: "¡Vaso completo!", drinks: 2 },
      { type: 'drink', content: "2 shots", intensity: 'medium', description: "¡Doble dosis!", drinks: 2 },
      { type: 'action', content: "Besa a alguien del grupo", intensity: 'medium', description: "¡Un besito!" },
      { type: 'truth', content: "Cuenta tu mayor secreto", intensity: 'medium', description: "¡Confiesa!" },
      { type: 'dare', content: "Quítate una prenda", intensity: 'medium', description: "¡Despójate!" },
      { type: 'group', content: "Todos toman 1 trago", intensity: 'medium', description: "¡Sufrimiento grupal!", groupAction: true, drinks: 1 },
      { type: 'conditional', content: "Di '¡Oh cañamos!' antes de hablar", intensity: 'medium', description: "¡Expresivo por 4 rondas!", conditional: { phrase: "¡Oh cañamos!", penalty: 3, duration: 4 } }
    ],
    extreme: [
      { type: 'drink', content: "3 shots seguidos", intensity: 'extreme', description: "¡Triple golpe!", drinks: 3 },
      { type: 'drink', content: "Fondo blanco", intensity: 'extreme', description: "¡Todo de una vez!", drinks: 4 },
      { type: 'action', content: "Llama a tu ex", intensity: 'extreme', description: "¡Llamada incómoda!" },
      { type: 'truth', content: "Cuenta tu mayor vergüenza", intensity: 'extreme', description: "¡Máxima confesión!" },
      { type: 'dare', content: "El grupo elige tu castigo", intensity: 'extreme', description: "¡Decisión grupal!" },
      { type: 'group', content: "Todos toman 2 tragos", intensity: 'extreme', description: "¡Descontrol total!", groupAction: true, drinks: 2 },
      { type: 'conditional', content: "Di '¡Qué waso!' después de cada palabra", intensity: 'extreme', description: "¡Waso por 5 rondas!", conditional: { phrase: "¡Qué waso!", penalty: 5, duration: 5 } }
    ],
    bolivia: [
      { type: 'bolivia', content: "Un trago de Singani", intensity: 'medium', description: "¡Sabor boliviano!", drinks: 1 },
      { type: 'bolivia', content: "Fondo blanco de Paceña", intensity: 'extreme', description: "¡Cerveza nacional!", drinks: 3 },
      { type: 'bolivia', content: "Baila folklore", intensity: 'mild', description: "¡Danza tradicional!" },
      { type: 'bolivia', content: "Habla en quechua", intensity: 'medium', description: "¡Idioma ancestral!" },
      { type: 'bolivia', content: "Cuenta un chisme boliviano", intensity: 'mild', description: "¡Chisme local!" },
      { type: 'conditional', content: "Di '¡A la mierda!' cuando te equivoques", intensity: 'medium', description: "¡Boliviano auténtico por 3 rondas!", conditional: { phrase: "¡A la mierda!", penalty: 2, duration: 3 } },
      { type: 'group', content: "Todos toman Singani", intensity: 'medium', description: "¡Tradición boliviana!", groupAction: true, drinks: 1 }
    ]
  }

  // Generar pregunta basada en el modo de juego
  const generateQuestion = () => {
    const modeQuestions = questions[gameMode as keyof typeof questions] || questions.mixed
    return modeQuestions[Math.floor(Math.random() * modeQuestions.length)]
  }

  // Generar penalización aleatoria
  const generatePenalty = (): Penalty => {
    const intensity = isBolivian ? 'bolivia' : 
      timeLeft > 15 ? 'mild' : 
      timeLeft > 8 ? 'medium' : 'extreme'
    
    const penaltyList = penalties[intensity as keyof typeof penalties]
    return penaltyList[Math.floor(Math.random() * penaltyList.length)] as Penalty
  }

  // Inicializar tragos
  useEffect(() => {
    const initialDrinks: {[key: string]: number} = {}
    players.forEach(player => {
      initialDrinks[player] = 0
    })
    setTotalDrinks(initialDrinks)
  }, [players])

  // Inicializar pregunta al montar el componente
  useEffect(() => {
    setCurrentQuestion(generateQuestion())
  }, [])

  // Actualizar condiciones activas
  useEffect(() => {
    setActiveConditionals(prev => 
      prev.map(conditional => ({
        ...conditional,
        roundsLeft: conditional.roundsLeft - 1
      })).filter(conditional => conditional.roundsLeft > 0)
    )
  }, [round])

  const startBomb = () => {
    setIsActive(true)
    setIsExploded(false)
    setShowQuestion(false)
    setShowPenalty(false)
    setCurrentPlayerIndex(0)
    setExplosionCount(0)
    setGamePhase('active')
    
    // Tiempo aleatorio entre 8-25 segundos
    const randomTime = Math.floor(Math.random() * 17) + 8
    setTimeLeft(randomTime)
    console.log(`Bomba iniciada con ${randomTime} segundos`)
    
    // Sonido de tictac
    if (soundEnabled && tickRef.current) {
      tickRef.current.play()
    }
  }

  const passBomb = () => {
    if (!isActive || isExploded) return
    
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
    setCurrentPlayerIndex(nextPlayerIndex)
    
    // Añadir tiempo extra al pasar (1-4 segundos)
    const extraTime = Math.floor(Math.random() * 4) + 1
    setTimeLeft(prev => prev + extraTime)
    
    // Aumentar intensidad de la bomba
    setBombIntensity(prev => Math.min(prev + 0.2, 2))
    
    // Efecto visual de paso
    setExplosionCount(prev => prev + 1)
  }

  const handlePenaltyComplete = (completed: boolean) => {
    setPenaltyCompleted(completed)
    setGamePhase('penaltyResult')
    
    if (completed && currentPenalty) {
      // Aplicar penalización si se completó
      if (currentPenalty.type === 'drink' && currentPenalty.drinks) {
        setTotalDrinks(prev => ({
          ...prev,
          [explosionPlayer]: prev[explosionPlayer] + currentPenalty.drinks!
        }))
      } else if (currentPenalty.type === 'group' && currentPenalty.groupAction && currentPenalty.drinks) {
        // Aplicar a todos los jugadores
        const newDrinks = { ...totalDrinks }
        players.forEach(player => {
          newDrinks[player] = (newDrinks[player] || 0) + currentPenalty.drinks!
        })
        setTotalDrinks(newDrinks)
      } else if (currentPenalty.type === 'conditional' && currentPenalty.conditional) {
        // Agregar condición activa
        setActiveConditionals(prev => [...prev, {
          phrase: currentPenalty.conditional!.phrase,
          penalty: currentPenalty.conditional!.penalty,
          roundsLeft: currentPenalty.conditional!.duration,
          description: currentPenalty.description
        }])
      }
    } else if (!completed && currentPenalty) {
      // Penalización por no completar (doble castigo)
      const penaltyDrinks = currentPenalty.drinks ? currentPenalty.drinks * 2 : 2
      setTotalDrinks(prev => ({
        ...prev,
        [explosionPlayer]: prev[explosionPlayer] + penaltyDrinks
      }))
    }

    // Continuar después de 3 segundos
    setTimeout(() => {
      setShowPenalty(false)
      setGamePhase('waiting')
      setRound(prev => prev + 1)
      setBombIntensity(1)
      setPenaltyCompleted(false)
      onComplete()
    }, 3000)
  }

  useEffect(() => {
    if (isActive && timeLeft > 0 && !isExploded) {
      console.log(`Tiempo restante: ${timeLeft}`)
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (isActive && timeLeft <= 0 && !isExploded) {
      // ¡BOOM! La bomba explotó
      setIsExploded(true)
      setExplosionPlayer(players[currentPlayerIndex])
      setGamePhase('exploded')
      
      // Sonido de explosión
      if (soundEnabled && explosionRef.current) {
        explosionRef.current.play()
        if (tickRef.current) {
          tickRef.current.pause()
        }
      }
      
      // Efectos visuales de explosión
      setShowExplosionEffect(true)
      setShowShockwave(true)
      
      // Generar penalización
      const penalty = generatePenalty()
      setCurrentPenalty(penalty)
      setShowPenalty(true)
      setGamePhase('penalty')
      
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
    const baseSize = 1 + (bombIntensity - 1) * 0.3
    if (timeLeft > 15) return `scale-${Math.round(baseSize * 100)}`
    if (timeLeft > 8) return `scale-${Math.round(baseSize * 110)}`
    return `scale-${Math.round(baseSize * 125)}`
  }

  const getBombShake = () => {
    if (timeLeft > 15) return 0
    if (timeLeft > 8) return 2
    return 5
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

        {/* Efectos de fondo virales */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-orange-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-orange-400"></div>
        
        {/* Partículas flotantes */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
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
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}

        {/* Audio para efectos de sonido */}
        <audio ref={audioRef} loop>
          <source src="/sounds/tick-tock.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={explosionRef}>
          <source src="/sounds/explosion.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={tickRef} loop>
          <source src="/sounds/bomb-tick.mp3" type="audio/mpeg" />
        </audio>

        {/* Efecto de explosión */}
        <AnimatePresence>
          {showExplosionEffect && (
            <motion.div
              className="absolute inset-0 bg-yellow-400/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Onda expansiva */}
        <AnimatePresence>
          {showShockwave && (
            <motion.div
              className="absolute inset-0 border-4 border-yellow-400 rounded-full z-20"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1 }}
            />
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
            {isBolivian ? '💣 ¡Bomba Cañera!' : '💣 ¡Bomba Explosiva!'}
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
                <Bomb className="w-5 h-5 mr-2" />
                <span className="font-semibold">{explosionCount} pasos</span>
              </div>
            </div>
          </motion.div>

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
                  ? '¡Empieza ' + players[0] + ' y continúa en orden, cumpa!'
                  : '¡Empieza ' + players[0] + ' y continúa en orden!'
                }
              </div>
            </motion.div>
          )}

          {/* Bomba animada */}
          <motion.div 
            className="relative mb-8"
            animate={isActive ? { 
              rotate: [0, getBombShake(), -getBombShake(), 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <motion.div
              className={`${getBombSize()} transition-transform duration-300`}
              animate={isExploded ? { 
                scale: [1, 2, 0],
                rotate: [0, 360]
              } : {}}
              transition={{ duration: 0.8 }}
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
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-8xl">💥</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Efectos de intensidad */}
            <AnimatePresence>
              {isActive && bombIntensity > 1.5 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.7 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <div className="text-6xl">🔥</div>
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
                {isBolivian 
                  ? '¡Responde rápido y pasa la bomba, cumpa!'
                  : '¡Responde rápido y pasa la bomba!'
                }
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
            {showPenalty && currentPenalty && gamePhase === 'penalty' && (
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
                  {currentPenalty.content}
                </div>
                <div className="text-white/80 text-sm mb-4">
                  {currentPenalty.description}
                </div>
                {currentPenalty.drinks && (
                  <div className="text-white/80 text-sm mb-4">
                    <Beer className="inline-block w-4 h-4 mr-1" />
                    Tragos: {currentPenalty.drinks}
                  </div>
                )}
                <div className="text-white/80 text-sm">
                  {isBolivian 
                    ? `¡${explosionPlayer} debe cumplir la penalización, cumpa!`
                    : `¡${explosionPlayer} debe cumplir la penalización!`
                  }
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resultado de penalización */}
          <AnimatePresence>
            {gamePhase === 'penaltyResult' && (
              <motion.div 
                className={`backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 ${
                  penaltyCompleted 
                    ? 'bg-gradient-to-r from-green-600/90 to-emerald-600/90' 
                    : 'bg-gradient-to-r from-red-600/90 to-pink-600/90'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  {penaltyCompleted ? (
                    <Check className="w-8 h-8 text-white mr-2" />
                  ) : (
                    <XCircle className="w-8 h-8 text-white mr-2" />
                  )}
                  <span className="text-2xl font-bold text-white">
                    {penaltyCompleted ? '¡RETO CUMPLIDO!' : '¡RETO FALLIDO!'}
                  </span>
                </div>
                <div className="text-xl text-white">
                  {penaltyCompleted 
                    ? '¡Excelente trabajo!'
                    : `¡Doble castigo! +${currentPenalty?.drinks ? currentPenalty.drinks * 2 : 2} tragos`
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

            {showPenalty && gamePhase === 'penalty' && (
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => handlePenaltyComplete(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check className="inline-block w-6 h-6 mr-2" />
                  ¡Cumplido!
                </motion.button>
                <motion.button
                  onClick={() => handlePenaltyComplete(false)}
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

export default BombaGame
