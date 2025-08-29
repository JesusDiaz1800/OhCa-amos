import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Users, X, Play, Zap, Brain, Target, Trophy } from 'lucide-react'

interface CulturaChupisticaGameProps {
  players: string[]
  onAnswer: (playerName: string, isCorrect: boolean) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

const CulturaChupisticaGame: React.FC<CulturaChupisticaGameProps> = ({ 
  players, 
  onAnswer, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentOptions, setCurrentOptions] = useState<string[]>([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState<{[key: string]: number}>({})
  const [round, setRound] = useState(1)
  const [maxRounds, setMaxRounds] = useState(players.length * 2)

  // Generar pregunta basada en el modo de juego
  const generateQuestion = () => {
    const questions = {
      pre: [
        {
          question: "¿Cuál es la capital de Francia?",
          options: ["Londres", "París", "Madrid", "Roma"],
          correct: "París"
        },
        {
          question: "¿Cuántos planetas hay en el sistema solar?",
          options: ["7", "8", "9", "10"],
          correct: "8"
        },
        {
          question: "¿Cuál es el color del cielo?",
          options: ["Verde", "Azul", "Rojo", "Amarillo"],
          correct: "Azul"
        },
        {
          question: "¿Qué animal dice 'miau'?",
          options: ["Perro", "Gato", "Pollo", "Vaca"],
          correct: "Gato"
        }
      ],
      peda: [
        {
          question: "¿Cuál es la bebida nacional de México?",
          options: ["Cerveza", "Tequila", "Vino", "Whisky"],
          correct: "Tequila"
        },
        {
          question: "¿Qué significa 'salud' cuando brindas?",
          options: ["Gracias", "Buen provecho", "Que tengas salud", "Adiós"],
          correct: "Que tengas salud"
        },
        {
          question: "¿Cuál es el ingrediente principal del vodka?",
          options: ["Uva", "Cebada", "Papa", "Maíz"],
          correct: "Papa"
        },
        {
          question: "¿Qué significa 'fondo blanco'?",
          options: ["Beber rápido", "Beber despacio", "No beber", "Beber agua"],
          correct: "Beber rápido"
        }
      ],
      hot: [
        {
          question: "¿Cuál es el órgano más grande del cuerpo?",
          options: ["Corazón", "Cerebro", "Piel", "Hígado"],
          correct: "Piel"
        },
        {
          question: "¿Cuántos huesos tiene el cuerpo humano?",
          options: ["156", "206", "256", "306"],
          correct: "206"
        },
        {
          question: "¿Qué significa 'libido'?",
          options: ["Energía", "Deseo sexual", "Fuerza", "Salud"],
          correct: "Deseo sexual"
        },
        {
          question: "¿Cuál es la hormona del amor?",
          options: ["Adrenalina", "Oxitocina", "Insulina", "Testosterona"],
          correct: "Oxitocina"
        }
      ],
      pareja: [
        {
          question: "¿Cuál es el símbolo del amor?",
          options: ["Estrella", "Corazón", "Luna", "Sol"],
          correct: "Corazón"
        },
        {
          question: "¿Cuántos años de bodas de plata?",
          options: ["15", "20", "25", "30"],
          correct: "25"
        },
        {
          question: "¿Qué significa 'amor platónico'?",
          options: ["Amor físico", "Amor espiritual", "Amor temporal", "Amor falso"],
          correct: "Amor espiritual"
        },
        {
          question: "¿Cuál es el color del amor?",
          options: ["Azul", "Verde", "Rojo", "Amarillo"],
          correct: "Rojo"
        }
      ],
      charades: [
        {
          question: "¿Quién pintó la Mona Lisa?",
          options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"],
          correct: "Da Vinci"
        },
        {
          question: "¿Cuál es el planeta más grande?",
          options: ["Tierra", "Marte", "Júpiter", "Saturno"],
          correct: "Júpiter"
        },
        {
          question: "¿Qué significa 'hola'?",
          options: ["Adiós", "Gracias", "Saludo", "Por favor"],
          correct: "Saludo"
        },
        {
          question: "¿Cuántos días tiene un año?",
          options: ["365", "366", "360", "370"],
          correct: "365"
        }
      ],
      mixed: [
        {
          question: "¿Cuál es la capital de España?",
          options: ["Barcelona", "Madrid", "Valencia", "Sevilla"],
          correct: "Madrid"
        },
        {
          question: "¿Qué color es el sol?",
          options: ["Amarillo", "Naranja", "Rojo", "Blanco"],
          correct: "Amarillo"
        },
        {
          question: "¿Cuántos dedos tiene una mano?",
          options: ["4", "5", "6", "7"],
          correct: "5"
        },
        {
          question: "¿Qué animal vuela?",
          options: ["Pez", "Pájaro", "Perro", "Gato"],
          correct: "Pájaro"
        }
      ]
    }

    const modeQuestions = questions[gameMode as keyof typeof questions] || questions.mixed
    return modeQuestions[Math.floor(Math.random() * modeQuestions.length)]
  }

  // Inicializar pregunta al montar el componente
  useEffect(() => {
    const questionData = generateQuestion()
    setCurrentQuestion(questionData.question)
    setCurrentOptions(questionData.options)
    setCorrectAnswer(questionData.correct)
    
    // Inicializar puntuación
    const initialScore: {[key: string]: number} = {}
    players.forEach(player => {
      initialScore[player] = 0
    })
    setScore(initialScore)
  }, [])

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    // Actualizar puntuación
    const currentPlayer = players[currentPlayerIndex]
    setScore(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + (correct ? 1 : 0)
    }))
    
    // Notificar al componente padre
    onAnswer(currentPlayer, correct)
  }

  const nextQuestion = () => {
    if (round >= maxRounds) {
      onComplete()
      return
    }
    
    setShowResult(false)
    setSelectedAnswer('')
    setRound(prev => prev + 1)
    
    const questionData = generateQuestion()
    setCurrentQuestion(questionData.question)
    setCurrentOptions(questionData.options)
    setCorrectAnswer(questionData.correct)
    
    // Siguiente jugador
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
  }

  const getWinner = () => {
    let maxScore = 0
    let winner = ''
    
    Object.entries(score).forEach(([player, points]) => {
      if (points > maxScore) {
        maxScore = points
        winner = player
      }
    })
    
    return winner
  }

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
            {isBolivian ? '🧠 ¡Cultura Cañera!' : '🧠 ¡Cultura Drink!'}
          </motion.h1>

          {/* Información de ronda */}
          <motion.div 
            className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-white mr-2" />
              <span className="text-white font-semibold">Ronda {round} de {maxRounds}</span>
            </div>
            <div className="text-white/80 text-sm">
              Turno de: <span className="font-bold">{players[currentPlayerIndex]}</span>
            </div>
          </motion.div>

          {/* Pregunta */}
          {!showResult && (
            <motion.div 
              className="bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-white mr-2" />
                <span className="text-2xl font-bold text-white">¡PREGUNTA!</span>
              </div>
              <div className="text-xl font-bold text-white mb-6">
                {currentQuestion}
              </div>
              
              {/* Opciones */}
              <div className="space-y-3">
                {currentOptions.map((option, index) => (
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
                  <Target className="w-8 h-8 text-white mr-2" />
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
                <div className="text-white/80 text-sm">
                  Respuesta correcta: <span className="font-bold">{correctAnswer}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-4">
            {showResult && (
              <motion.button
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {round >= maxRounds ? '¡Ver Resultados!' : '¡Siguiente Pregunta!'}
              </motion.button>
            )}
          </div>

          {/* Puntuación */}
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-3">Puntuación:</h3>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player) => (
                <div
                  key={player}
                  className={`p-3 rounded-lg text-sm text-center transition-all ${
                    currentPlayerIndex === players.indexOf(player) && !showResult
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg scale-105'
                      : 'bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/20'
                  }`}
                >
                  <div className="font-bold">{player}</div>
                  <div className="text-lg">{score[player] || 0} pts</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CulturaChupisticaGame
