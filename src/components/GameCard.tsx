import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  SkipForward, 
  Check, 
  X, 
  Timer, 
  Users, 
  Star,
  Heart,
  Zap,
  Crown,
  Trophy,
  Beer,
  Wine,
  GlassWater,
  Sparkles,
  PartyPopper,
  Camera,
  Globe,
  MapPin,
  Zap,
  Brain,
  Gamepad2,
  Flag,
  Dice,
  Cards,
  Clock,
  Award,
  TrendingUp,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Target,
  Flame,
  Music,
  Shuffle,
  RotateCcw,
  Play,
  Pause,
  SkipBack,
  Volume1
} from 'lucide-react'

interface GameCardProps {
  card: {
    id: string
    type: string
    title: string
    content: string
    difficulty: string
    category: string
    penalty: number
    instructions?: string
    options?: string[]
    correctAnswer?: string
    timeLimit?: number
    isGroupGame?: boolean
    selectedPlayer?: string
    imageUrl?: string
    soundUrl?: string
    animationType?: string
  }
  currentPlayer: string
  players: string[]
  drinks: Record<string, number>
  onNext: () => void
  onSkip: () => void
  onApplyPenalty: (player: string, amount: number) => void
  onAnswer: (player: string, isCorrect?: boolean) => void
  soundEnabled: boolean
}

const GameCard: React.FC<GameCardProps> = ({
  card,
  currentPlayer,
  players,
  drinks,
  onNext,
  onSkip,
  onApplyPenalty,
  onAnswer,
  soundEnabled
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(card.timeLimit || 0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [showParticles, setShowParticles] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const [showHint, setShowHint] = useState(false)

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
    { icon: Lightning, delay: 12, duration: 9 },
    { icon: Brain, delay: 13, duration: 12 },
    { icon: Flag, delay: 14, duration: 8 }
  ]

  useEffect(() => {
    // Mostrar partículas al cargar la tarjeta
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 3000)

    // Animación automática para ciertos tipos de tarjetas
    if (card.animationType === 'auto') {
      const interval = setInterval(() => {
        setCurrentAnimation(prev => (prev + 1) % 4)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [card.id, card.animationType])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'suave': return 'from-green-500 to-emerald-500'
      case 'medio': return 'from-blue-500 to-indigo-500'
      case 'alto': return 'from-orange-500 to-red-500'
      case 'picante': return 'from-pink-500 to-rose-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'yo-nunca': return '🍺'
      case 'verdad-reto': return '🎯'
      case 'charadas': return '🎭'
      case 'que-prefieres': return '🤷'
      case 'quien-probable': return '👥'
      case 'trivia': return '🧠'
      case 'accion-rapida': return '⚡'
      case 'bomba': return '💣'
      case 'botella': return '🍺'
      case 'ruleta': return '🎰'
      case 'karaoke': return '🎤'
      case 'dibujo': return '🎨'
      case 'meme': return '😂'
      case 'baile': return '💃'
      case 'selfie': return '📸'
      case 'chiste': return '😄'
      case 'historia': return '📖'
      case 'poema': return '📝'
      case 'rap': return '🎵'
      case 'improv': return '🎬'
      default: return '🎮'
    }
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setShowResult(true)
    
    // Efecto de confeti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const handleDrink = (player: string) => {
    onApplyPenalty(player, 1)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 1000)
  }

  const handleCorrectAnswer = () => {
    onAnswer(currentPlayer, true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const handleWrongAnswer = () => {
    onAnswer(currentPlayer, false)
    onApplyPenalty(currentPlayer, 1)
  }

  const startTimer = () => {
    if (card.timeLimit) {
      setIsTimerActive(true)
      setTimeLeft(card.timeLimit)
      
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsTimerActive(false)
            onApplyPenalty(currentPlayer, card.penalty)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setRecordedAudio(blob)
        setIsRecording(false)
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Detener después de 10 segundos
      setTimeout(() => {
        mediaRecorder.stop()
        stream.getTracks().forEach(track => track.stop())
      }, 10000)
    } catch (error) {
      console.error('Error al grabar audio:', error)
      setIsRecording(false)
    }
  }

  const playRecordedAudio = () => {
    if (recordedAudio) {
      const audio = new Audio(URL.createObjectURL(recordedAudio))
      audio.play()
    }
  }

  const renderCardContent = () => {
    switch (card.type) {
      case 'yo-nunca':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Si lo has hecho, toma un trago!
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {players.map((player) => (
                <motion.button
                  key={player}
                  onClick={() => handleDrink(player)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="font-bold text-lg">{player}</div>
                  <div className="text-sm opacity-80">
                    {drinks[player] || 0} 🍺
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 'verdad-reto':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                {card.instructions}
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, 2)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="inline-block w-5 h-5 mr-2" />
                No lo hago
              </motion.button>
              
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, 1)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="inline-block w-5 h-5 mr-2" />
                Lo hago
              </motion.button>
            </div>
          </div>
        )

      case 'charadas':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Imita o describe sin hablar!
              </div>
            </div>
            
            {card.timeLimit && (
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {timeLeft}s
                </motion.div>
                <button
                  onClick={startTimer}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
                >
                  <Timer className="inline-block w-5 h-5 mr-2" />
                  Iniciar Timer
                </button>
              </div>
            )}
          </div>
        )

      case 'karaoke':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Canta una canción completa!
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={startRecording}
                className={`font-bold py-4 px-8 rounded-xl transition-all shadow-lg ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRecording ? (
                  <>
                    <MicOff className="inline-block w-5 h-5 mr-2" />
                    Grabando...
                  </>
                ) : (
                  <>
                    <Mic className="inline-block w-5 h-5 mr-2" />
                    Grabar Karaoke
                  </>
                )}
              </motion.button>
              
              {recordedAudio && (
                <motion.button
                  onClick={playRecordedAudio}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Volume2 className="inline-block w-5 h-5 mr-2" />
                  Reproducir
                </motion.button>
              )}
            </div>
          </div>
        )

      case 'dibujo':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Dibuja en el aire o en papel!
              </div>
            </div>
            
            <div className="bg-white/20 rounded-2xl p-4 min-h-32 flex items-center justify-center">
              <div className="text-white/60 text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div>Área de dibujo</div>
                <div className="text-sm">(Usa tu imaginación)</div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, card.penalty)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="inline-block w-5 h-5 mr-2" />
                No lo hago
              </motion.button>
              
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, 1)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="inline-block w-5 h-5 mr-2" />
                ¡Lo hice!
              </motion.button>
            </div>
          </div>
        )

      case 'baile':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Baila durante 30 segundos!
              </div>
            </div>
            
            <motion.div
              className="text-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-6xl mb-4">💃</div>
              <div className="text-white/80">¡Muévete al ritmo!</div>
            </motion.div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, card.penalty)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="inline-block w-5 h-5 mr-2" />
                No bailo
              </motion.button>
              
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, 1)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="inline-block w-5 h-5 mr-2" />
                ¡Bailé!
              </motion.button>
            </div>
          </div>
        )

      case 'selfie':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Tómate una selfie con el grupo!
              </div>
            </div>
            
            <div className="bg-white/20 rounded-2xl p-4 min-h-32 flex items-center justify-center">
              <div className="text-white/60 text-center">
                <div className="text-4xl mb-2">📸</div>
                <div>Área de selfie</div>
                <div className="text-sm">(Usa tu cámara)</div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, card.penalty)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="inline-block w-5 h-5 mr-2" />
                No quiero
              </motion.button>
              
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, 1)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera className="inline-block w-5 h-5 mr-2" />
                ¡Selfie tomada!
              </motion.button>
            </div>
          </div>
        )

      case 'que-prefieres':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
            </div>
            
            {card.options && (
              <div className="grid grid-cols-1 gap-4">
                {card.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-xl transition-all shadow-lg text-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )

      case 'quien-probable':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Vota por quién es más probable!
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {players.map((player) => (
                <motion.button
                  key={player}
                  onClick={() => onApplyPenalty(player, 1)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="font-bold text-lg">{player}</div>
                  <div className="text-sm opacity-80">Votar</div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 'trivia':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
            </div>
            
            {card.options && (
              <div className="grid grid-cols-1 gap-4">
                {card.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      const isCorrect = option === card.correctAnswer
                      if (isCorrect) {
                        handleCorrectAnswer()
                      } else {
                        handleWrongAnswer()
                      }
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )

      case 'accion-rapida':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                ¡Completa la acción en {card.timeLimit} segundos!
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, card.penalty)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="inline-block w-5 h-5 mr-2" />
                No lo hago
              </motion.button>
              
              <motion.button
                onClick={() => onApplyPenalty(currentPlayer, 1)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="inline-block w-5 h-5 mr-2" />
                ¡Lo hice!
              </motion.button>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                {card.content}
              </div>
              <div className="text-white/80 text-lg">
                {card.instructions}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto relative overflow-hidden"
    >
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

      {/* Confeti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                }}
                initial={{ y: -10, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 10, 
                  opacity: [1, 1, 0],
                  rotate: [0, 360, 720]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut"
                }}
              >
                {['🎉', '🎊', '✨', '🌟', '💫', '⭐', '🍺', '🥂'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Sparkles */}
      <AnimatePresence>
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none z-40">
            {[...Array(20)].map((_, i) => (
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
          </div>
        )}
      </AnimatePresence>

      {/* Header de la tarjeta */}
      <div className="text-center mb-6">
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {getCardIcon(card.type)}
        </motion.div>
        
        <motion.h2 
          className="text-3xl font-bold text-white mb-2"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(255,255,255,0.3)",
              "0 0 20px rgba(255,255,255,0.6)",
              "0 0 10px rgba(255,255,255,0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {card.title}
        </motion.h2>
        
        <div className={`inline-block bg-gradient-to-r ${getDifficultyColor(card.difficulty)} text-white px-4 py-2 rounded-full font-bold text-sm`}>
          {card.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <motion.div
        className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6"
        whileHover={{ scale: 1.02 }}
      >
        {renderCardContent()}
      </motion.div>

      {/* Controles */}
      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={onSkip}
          className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SkipForward className="inline-block w-5 h-5 mr-2" />
          Saltar
        </motion.button>

        <motion.button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight className="inline-block w-5 h-5 mr-2" />
          Siguiente
        </motion.button>
      </div>
    </motion.div>
  )
}

export default GameCard
