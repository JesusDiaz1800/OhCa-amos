import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Users, X, Play, Zap, Wine, Target } from 'lucide-react'

interface BottleGameProps {
  players: string[]
  onSpin: (playerName: string) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
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
  const [showQuestion, setShowQuestion] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const bottleRef = useRef<HTMLDivElement>(null)

  // Generar pregunta basada en el modo de juego
  const generateQuestion = () => {
    const questions = {
      pre: [
        "¿Cuál es tu color favorito?",
        "¿Cuál es tu comida favorita?",
        "¿Cuál es tu película favorita?",
        "¿Cuál es tu canción favorita?",
        "¿Cuál es tu lugar favorito?",
        "¿Cuál es tu animal favorito?",
        "¿Cuál es tu deporte favorito?",
        "¿Cuál es tu hobby favorito?"
      ],
      peda: [
        "¿Cuál es tu bebida favorita?",
        "¿Cuál es tu lugar de fiesta favorito?",
        "¿Cuál es tu canción de fiesta favorita?",
        "¿Cuál es tu shot favorito?",
        "¿Cuál es tu cóctel favorito?",
        "¿Cuál es tu juego de beber favorito?",
        "¿Cuál es tu fiesta favorita?",
        "¿Cuál es tu discoteca favorita?"
      ],
      hot: [
        "¿Cuál es tu fantasía más grande?",
        "¿Cuál es tu posición favorita?",
        "¿Cuál es tu fetiche más raro?",
        "¿Cuál es tu lugar más romántico?",
        "¿Cuál es tu actividad íntima favorita?",
        "¿Cuál es tu juego de pareja favorito?",
        "¿Cuál es tu palabra picante favorita?",
        "¿Cuál es tu experiencia hot favorita?"
      ],
      pareja: [
        "¿Cuál es tu actividad romántica favorita?",
        "¿Cuál es tu lugar de cita favorito?",
        "¿Cuál es tu regalo romántico favorito?",
        "¿Cuál es tu canción de amor favorita?",
        "¿Cuál es tu película romántica favorita?",
        "¿Cuál es tu gesto romántico favorito?",
        "¿Cuál es tu palabra de amor favorita?",
        "¿Cuál es tu momento especial favorito?"
      ],
      charades: [
        "¿Cuál es tu película favorita?",
        "¿Cuál es tu serie de TV favorita?",
        "¿Cuál es tu personaje famoso favorito?",
        "¿Cuál es tu deportista favorito?",
        "¿Cuál es tu cantante favorito?",
        "¿Cuál es tu animal favorito?",
        "¿Cuál es tu profesión favorita?",
        "¿Cuál es tu emoción favorita?"
      ],
      mixed: [
        "¿Cuál es tu color favorito?",
        "¿Cuál es tu comida favorita?",
        "¿Cuál es tu película favorita?",
        "¿Cuál es tu canción favorita?",
        "¿Cuál es tu lugar favorito?",
        "¿Cuál es tu animal favorito?",
        "¿Cuál es tu deporte favorito?",
        "¿Cuál es tu hobby favorito?"
      ]
    }

    const modeQuestions = questions[gameMode as keyof typeof questions] || questions.mixed
    return modeQuestions[Math.floor(Math.random() * modeQuestions.length)]
  }

  // Inicializar pregunta al montar el componente
  useEffect(() => {
    setCurrentQuestion(generateQuestion())
  }, [])

  const spinBottle = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setShowResult(false)
    
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
      
      // Notificar al componente padre
      onSpin(selected)
    }, 3000)
  }

  const handleComplete = () => {
    setShowResult(false)
    setShowQuestion(true)
    setCurrentQuestion(generateQuestion())
    onComplete()
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>

        <div className="text-center relative z-10">
          {/* Título */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isBolivian ? '🍾 ¡Botella Cañera!' : '🍾 ¡Botella Drink!'}
          </motion.h1>

          {/* Pregunta inicial */}
          {showQuestion && !isSpinning && !showResult && (
            <motion.div 
              className="bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
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
                ¡Gira la botella y responde la pregunta!
              </div>
            </motion.div>
          )}

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
              🍾
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

          {/* Resultado */}
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
                  <Wine className="w-8 h-8 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">¡SELECCIONADO!</span>
                </div>
                <div className="text-2xl font-bold text-white mb-4">
                  {selectedPlayer}
                </div>
                <div className="text-white/80 text-sm">
                  ¡Responde la pregunta!
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-4">
            {showQuestion && !isSpinning && !showResult && (
              <motion.button
                onClick={spinBottle}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSpinning}
              >
                <RotateCcw className="inline-block w-6 h-6 mr-2" />
                {isBolivian ? '¡Girar la Botella, Cumpa!' : '¡Girar la Botella!'}
              </motion.button>
            )}

            {showResult && (
              <motion.button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Siguiente!
              </motion.button>
            )}
          </div>

          {/* Lista de jugadores */}
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

export default BottleGame
