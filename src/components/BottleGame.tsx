import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Users, X, Play, Zap, Wine, Target, Volume2, VolumeX, Settings, Award, Heart, Star, Crown } from 'lucide-react'

interface BottleGameProps {
  players: string[]
  onSpin: (playerName: string) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

interface Challenge {
  type: 'verdad' | 'reto' | 'yo_nunca' | 'que_prefieres' | 'dinamica' | 'shot'
  difficulty: 'suave' | 'atrevido' | 'picante'
  content: string
  penalty?: string
}

const BottleGame: React.FC<BottleGameProps> = ({ 
  players, 
  onSpin, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [spinAngle, setSpinAngle] = useState(0)
  const [showChallenge, setShowChallenge] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [showPenalty, setShowPenalty] = useState(false)
  const [currentPenalty, setCurrentPenalty] = useState('')
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [round, setRound] = useState(1)
  const [scores, setScores] = useState<{[key: string]: number}>({})
  const bottleRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Base de datos de retos y preguntas
  const challenges = {
    clásico: {
      verdad: [
        { type: 'verdad', difficulty: 'suave', content: "¿Cuál es la cosa más extraña que tienes en tu refrigerador ahora mismo?" },
        { type: 'verdad', difficulty: 'suave', content: "¿Cuál es la cosa más embarazosa que tus padres te han pillado haciendo?" },
        { type: 'verdad', difficulty: 'atrevido', content: "¿Qué pensaste de mí la primera vez que me viste?" },
        { type: 'verdad', difficulty: 'picante', content: "¿Cuál es tu mayor fantasía romántica?" },
        { type: 'verdad', difficulty: 'suave', content: "¿Cuál es tu mayor miedo?" },
        { type: 'verdad', difficulty: 'atrevido', content: "¿Alguna vez te has enamorado de alguien del mismo grupo de amigos?" }
      ],
      reto: [
        { type: 'reto', difficulty: 'suave', content: "Baila como si nadie te estuviera viendo durante 30 segundos" },
        { type: 'reto', difficulty: 'suave', content: "Imita a alguien del grupo durante 1 minuto" },
        { type: 'reto', difficulty: 'atrevido', content: "Llama a tu ex y dile que aún la/lo extrañas" },
        { type: 'reto', difficulty: 'picante', content: "Besa a la persona de tu derecha en el cuello" },
        { type: 'reto', difficulty: 'suave', content: "Canta tu canción favorita a capella" },
        { type: 'reto', difficulty: 'atrevido', content: "Deja que alguien del grupo te haga cosquillas durante 1 minuto" }
      ],
      yo_nunca: [
        { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he jugado al juego de la botella" },
        { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he enviado un mensaje de texto a la persona equivocada" },
        { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he cantado en la ducha con todas mis fuerzas" },
        { type: 'yo_nunca', difficulty: 'atrevido', content: "Yo nunca he besado a alguien del mismo sexo" },
        { type: 'yo_nunca', difficulty: 'picante', content: "Yo nunca he tenido sexo en un lugar público" },
        { type: 'yo_nunca', difficulty: 'atrevido', content: "Yo nunca he robado algo de una tienda" }
      ],
      que_prefieres: [
        { type: 'que_prefieres', difficulty: 'suave', content: "¿Preferirías ser rico e infeliz o pobre y feliz?" },
        { type: 'que_prefieres', difficulty: 'suave', content: "¿Preferirías ser invisible por un día o poder volar por una hora?" },
        { type: 'que_prefieres', difficulty: 'atrevido', content: "¿Preferirías besar a tu mejor amigo/a o a tu ex?" },
        { type: 'que_prefieres', difficulty: 'picante', content: "¿Preferirías tener sexo con alguien feo pero con mucho dinero o con alguien guapo pero pobre?" },
        { type: 'que_prefieres', difficulty: 'suave', content: "¿Preferirías vivir en el pasado o en el futuro?" },
        { type: 'que_prefieres', difficulty: 'atrevido', content: "¿Preferirías que todos lean tus pensamientos o que puedas leer los de todos?" }
      ],
      dinamica: [
        { type: 'dinamica', difficulty: 'suave', content: "Haz un brindis espontáneo por la persona de tu izquierda, mencionando una cualidad que admiras de ella" },
        { type: 'dinamica', difficulty: 'suave', content: "Cuenta un chiste que te haga reír a ti mismo" },
        { type: 'dinamica', difficulty: 'atrevido', content: "Deja que el grupo te haga una pregunta y debes responder con la verdad" },
        { type: 'dinamica', difficulty: 'picante', content: "Deja que alguien del grupo te toque donde quiera durante 10 segundos" },
        { type: 'dinamica', difficulty: 'suave', content: "Cuenta la historia más graciosa que te haya pasado" },
        { type: 'dinamica', difficulty: 'atrevido', content: "Deja que el grupo decida qué debes hacer durante el próximo minuto" }
      ],
      shot: [
        { type: 'shot', difficulty: 'suave', content: "¡1 shot para el valiente!", penalty: "1 shot" },
        { type: 'shot', difficulty: 'atrevido', content: "¡2 shots para animar la noche!", penalty: "2 shots" },
        { type: 'shot', difficulty: 'picante', content: "¡3 shots de 'caña' por no atreverse!", penalty: "3 shots" },
        { type: 'shot', difficulty: 'suave', content: "¡Medio vaso de tu bebida al fondo!", penalty: "Medio vaso" },
        { type: 'shot', difficulty: 'atrevido', content: "¡Una bebida de fondo para animar la noche!", penalty: "Vaso entero" },
        { type: 'shot', difficulty: 'picante', content: "¡Shot doble de lo más fuerte que haya!", penalty: "Shot doble" }
      ]
    },
    bolivia: {
      verdad: [
        { type: 'verdad', difficulty: 'suave', content: "¿Alguna vez te has puesto un calzón al revés (rojo o amarillo) para Año Nuevo?" },
        { type: 'verdad', difficulty: 'atrevido', content: "¿Alguna vez 'te cargaron' (la policía te llevó a la estación por beber en la calle)?" },
        { type: 'verdad', difficulty: 'picante', content: "¿Alguna vez 'te fuiste de la joda con alguien a su casa'?" },
        { type: 'verdad', difficulty: 'suave', content: "¿Alguna vez has bailado folklore después de un par de cervezas?" },
        { type: 'verdad', difficulty: 'atrevido', content: "¿Cuál es la cosa más 'waso' que has hecho en una fiesta boliviana?" },
        { type: 'verdad', difficulty: 'picante', content: "¿Alguna vez te pusiste 'yema' hasta el punto de perder la memoria?" }
      ],
      reto: [
        { type: 'reto', difficulty: 'suave', content: "Baila folklore boliviano durante 1 minuto" },
        { type: 'reto', difficulty: 'suave', content: "Imita a alguien 'mandado' o 'pichi'. Si el grupo no adivina quién es, tomas 2 shots" },
        { type: 'reto', difficulty: 'atrevido', content: "Cuenta la experiencia más 'shockeante' que viviste en una fiesta en Bolivia" },
        { type: 'reto', difficulty: 'picante', content: "El que sea el más 'waso' del grupo, elige a alguien para que tome 3 shots" },
        { type: 'reto', difficulty: 'suave', content: "Haz un brindis como lo harías en Bolivia" },
        { type: 'reto', difficulty: 'atrevido', content: "Describe tu peor 'chaki' y el remedio más insólito que probaste" }
      ],
      yo_nunca: [
        { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he 'cañado' tanto que me pusiera 'yema'" },
        { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he tenido un 'chaki' terrible" },
        { type: 'yo_nunca', difficulty: 'atrevido', content: "Yo nunca he hecho algo 'waso' en una fiesta" },
        { type: 'yo_nunca', difficulty: 'picante', content: "Yo nunca he estado 'mandado' o 'pichi'" },
        { type: 'yo_nunca', difficulty: 'suave', content: "Yo nunca he bebido pisco boliviano" },
        { type: 'yo_nunca', difficulty: 'atrevido', content: "Yo nunca he 'cañado' hasta el amanecer" }
      ],
      que_prefieres: [
        { type: 'que_prefieres', difficulty: 'suave', content: "¿Preferirías 'cañar' con Paceña o con Corona?" },
        { type: 'que_prefieres', difficulty: 'suave', content: "¿Preferirías tener un 'chaki' terrible o no poder 'cañar' nunca más?" },
        { type: 'que_prefieres', difficulty: 'atrevido', content: "¿Preferirías ser 'waso' por una noche o ser aburrido para siempre?" },
        { type: 'que_prefieres', difficulty: 'picante', content: "¿Preferirías estar 'yema' con alguien feo o sobrio con alguien guapo?" },
        { type: 'que_prefieres', difficulty: 'suave', content: "¿Preferirías bailar folklore o cumbia?" },
        { type: 'que_prefieres', difficulty: 'atrevido', content: "¿Preferirías que te 'carguen' o que te 'mandes'?" }
      ],
      dinamica: [
        { type: 'dinamica', difficulty: 'suave', content: "Haz un brindis 'cañero' por Bolivia" },
        { type: 'dinamica', difficulty: 'suave', content: "Enseña al grupo una palabra en quechua o aymara" },
        { type: 'dinamica', difficulty: 'atrevido', content: "Cuenta la historia más 'waso' de tu vida" },
        { type: 'dinamica', difficulty: 'picante', content: "Deja que el grupo decida cuánto debes 'cañar' esta noche" },
        { type: 'dinamica', difficulty: 'suave', content: "Canta una canción boliviana" },
        { type: 'dinamica', difficulty: 'atrevido', content: "Imita a alguien 'yema' del grupo" }
      ],
      shot: [
        { type: 'shot', difficulty: 'suave', content: "¡1 trago de 'caña'!", penalty: "1 trago" },
        { type: 'shot', difficulty: 'atrevido', content: "¡2 tragos para el 'waso'!", penalty: "2 tragos" },
        { type: 'shot', difficulty: 'picante', content: "¡3 shots de pisco boliviano!", penalty: "3 shots" },
        { type: 'shot', difficulty: 'suave', content: "¡Medio vaso de Paceña!", penalty: "Medio vaso" },
        { type: 'shot', difficulty: 'atrevido', content: "¡Vaso entero de 'caña'!", penalty: "Vaso entero" },
        { type: 'shot', difficulty: 'picante', content: "¡Shot doble de lo más fuerte!", penalty: "Shot doble" }
      ]
    }
  }

  // Generar reto aleatorio
  const generateChallenge = (): Challenge => {
    const mode = isBolivian ? 'bolivia' : 'clásico'
    const challengeTypes = Object.keys(challenges[mode]) as Array<keyof typeof challenges[typeof mode]>
    const randomType = challengeTypes[Math.floor(Math.random() * challengeTypes.length)]
    const typeChallenges = challenges[mode][randomType]
    return typeChallenges[Math.floor(Math.random() * typeChallenges.length)]
  }

  // Inicializar puntuaciones
  useEffect(() => {
    const initialScores: {[key: string]: number} = {}
    players.forEach(player => {
      initialScores[player] = 0
    })
    setScores(initialScores)
  }, [players])

  const spinBottle = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setShowResult(false)
    setShowChallenge(false)
    setShowPenalty(false)
    setChallengeCompleted(false)
    
    // Sonido de giro
    if (soundEnabled && audioRef.current) {
      audioRef.current.play()
    }
    
    // Ángulo aleatorio para la botella
    const randomAngle = Math.floor(Math.random() * 360) + 720 // Mínimo 2 vueltas completas
    setSpinAngle(randomAngle)
    
    // Calcular qué jugador fue seleccionado
    setTimeout(() => {
      const finalAngle = randomAngle % 360
      const playerIndex = Math.floor((360 - finalAngle) / (360 / players.length))
      const selected = players[playerIndex]
      setSelectedPlayer(selected)
      setCurrentPlayer(selected)
      setShowResult(true)
      setIsSpinning(false)
      
      // Generar reto
      const challenge = generateChallenge()
      setCurrentChallenge(challenge)
      
      // Notificar al componente padre
      onSpin(selected)
    }, 3000)
  }

  const showChallengeCard = () => {
    setShowChallenge(true)
    setShowResult(false)
  }

  const acceptChallenge = () => {
    setChallengeCompleted(true)
    setShowChallenge(false)
    setShowPenalty(false)
    
    // Añadir puntos por completar el reto
    setScores(prev => ({
      ...prev,
      [selectedPlayer]: prev[selectedPlayer] + 1
    }))
  }

  const declineChallenge = () => {
    if (currentChallenge?.penalty) {
      setCurrentPenalty(currentChallenge.penalty)
      setShowPenalty(true)
      setShowChallenge(false)
    } else {
      // Penalización por defecto
      const penalties = isBolivian ? [
        "¡1 trago de 'caña' por no atreverse!",
        "¡2 shots de pisco boliviano!",
        "¡Medio vaso de Paceña!"
      ] : [
        "¡1 shot para el valiente!",
        "¡2 shots para animar la noche!",
        "¡Medio vaso de tu bebida al fondo!"
      ]
      setCurrentPenalty(penalties[Math.floor(Math.random() * penalties.length)])
      setShowPenalty(true)
      setShowChallenge(false)
    }
  }

  const handlePenaltyComplete = () => {
    setShowPenalty(false)
    setShowChallenge(false)
    setShowResult(false)
    setRound(prev => prev + 1)
    onComplete()
  }

  const getBottleEmoji = () => {
    return isBolivian ? '🍺' : '🍾' // Paceña vs Corona
  }

  const getBottleColor = () => {
    return isBolivian ? 'from-amber-600 to-amber-800' : 'from-blue-600 to-cyan-600'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'suave': return 'from-green-500 to-emerald-500'
      case 'atrevido': return 'from-yellow-500 to-orange-500'
      case 'picante': return 'from-red-500 to-pink-500'
      default: return 'from-blue-500 to-indigo-500'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'suave': return 'SUAVE'
      case 'atrevido': return 'ATREVIDO'
      case 'picante': return 'PICANTE'
      default: return 'MIXTO'
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
        className={`bg-gradient-to-br ${getBottleColor()} rounded-3xl p-8 max-w-lg w-full relative overflow-hidden`}
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
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/50 to-transparent"></div>

        {/* Audio para efectos de sonido */}
        <audio ref={audioRef} loop>
          <source src="/sounds/bottle-spin.mp3" type="audio/mpeg" />
        </audio>

        <div className="text-center relative z-10">
          {/* Título */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isBolivian ? '🍺 ¡Botella Cañera!' : '🍾 ¡Botella Drink!'}
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
                <Award className="w-5 h-5 mr-2" />
                <span className="font-semibold">Ronda {round}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-semibold">{players.length} jugadores</span>
              </div>
            </div>
          </motion.div>

          {/* Botella animada */}
          <motion.div 
            className="relative mb-8 flex justify-center"
            ref={bottleRef}
          >
            <motion.div
              className="text-8xl"
              animate={{ rotate: isSpinning ? spinAngle : 0 }}
              transition={{ 
                duration: isSpinning ? 3 : 0,
                ease: "easeOut"
              }}
            >
              {getBottleEmoji()}
            </motion.div>
            
            {/* Efectos de giro */}
            <AnimatePresence>
              {isSpinning && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <div className="text-4xl animate-spin">🌀</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Resultado del giro */}
          <AnimatePresence>
            {showResult && selectedPlayer && (
              <motion.div 
                className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">¡SELECCIONADO!</span>
                </div>
                <div className="text-3xl font-bold text-white mb-4">
                  {selectedPlayer}
                </div>
                <div className="text-white/80 text-sm mb-4">
                  ¡Es tu turno de enfrentar el reto!
                </div>
                <motion.button
                  onClick={showChallengeCard}
                  className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all border border-white/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Target className="inline-block w-5 h-5 mr-2" />
                  ¡Ver Reto!
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tarjeta de reto */}
          <AnimatePresence>
            {showChallenge && currentChallenge && (
              <motion.div 
                className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">¡RETO!</span>
                </div>
                
                {/* Dificultad */}
                <div className={`inline-block bg-gradient-to-r ${getDifficultyColor(currentChallenge.difficulty)} text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                  {getDifficultyText(currentChallenge.difficulty)}
                </div>
                
                <div className="text-xl font-bold text-white mb-6">
                  {currentChallenge.content}
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    onClick={acceptChallenge}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="inline-block w-5 h-5 mr-2" />
                    ¡Acepto!
                  </motion.button>
                  
                  <motion.button
                    onClick={declineChallenge}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="inline-block w-5 h-5 mr-2" />
                    ¡Beber!
                  </motion.button>
                </div>
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
                  <Wine className="w-8 h-8 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">¡PENALIZACIÓN!</span>
                </div>
                <div className="text-xl font-bold text-white mb-4">
                  {currentPenalty}
                </div>
                <div className="text-white/80 text-sm mb-4">
                  ¡{selectedPlayer} debe cumplir la penalización!
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
            {!showResult && !showChallenge && !showPenalty && (
              <motion.button
                onClick={spinBottle}
                className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-white/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSpinning}
              >
                <RotateCcw className="inline-block w-6 h-6 mr-2" />
                {isBolivian ? '¡Girar la Botella, Cumpa!' : '¡Girar la Botella!'}
              </motion.button>
            )}
          </div>

          {/* Lista de jugadores con puntuación */}
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-3">Jugadores:</h3>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player) => (
                <div
                  key={player}
                  className={`p-3 rounded-lg text-sm text-center transition-all ${
                    showResult && player === selectedPlayer
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg scale-105'
                      : 'bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/20'
                  }`}
                >
                  <div className="font-bold">{player}</div>
                  <div className="text-xs opacity-80">{scores[player] || 0} pts</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BottleGame
