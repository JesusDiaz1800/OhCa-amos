import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Users, X, Play, Zap, Target, AlertTriangle } from 'lucide-react'

interface RouletteGameProps {
  players: string[]
  onSpin: (playerName: string, action: string) => void
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

const RouletteGame: React.FC<RouletteGameProps> = ({ 
  players, 
  onSpin, 
  onComplete, 
  isBolivian = false,
  gameMode = 'mixed'
}) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [selectedAction, setSelectedAction] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [spinAngle, setSpinAngle] = useState(0)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const rouletteRef = useRef<HTMLDivElement>(null)

  // Generar acciones basadas en el modo de juego
  const generateActions = () => {
    const actions = {
      pre: [
        "Cuenta un chiste",
        "Imita a alguien",
        "Canta una canción",
        "Baila 30 segundos",
        "Cuenta una historia graciosa",
        "Haz una mueca",
        "Imita un animal",
        "Cuenta un secreto"
      ],
      peda: [
        "1 trago",
        "Medio vaso",
        "Vaso entero",
        "Un shot",
        "2 tragos",
        "Fondo blanco",
        "3 tragos",
        "Shot doble"
      ],
      hot: [
        "Besa a alguien",
        "Quítate una prenda",
        "Cuenta una fantasía",
        "Imita una posición",
        "Di algo picante",
        "Besa el cuello",
        "Muestra tu mejor cara sexy",
        "Cuenta un fetiche"
      ],
      pareja: [
        "Besa a tu pareja",
        "Abraza a tu pareja",
        "Di algo romántico",
        "Mira a los ojos",
        "Tócale la mano",
        "Susúrrale algo",
        "Acaricia su pelo",
        "Dile que la amas"
      ],
      charades: [
        "Actúa una película",
        "Imita un personaje",
        "Actúa un deporte",
        "Imita un animal",
        "Actúa una profesión",
        "Imita una emoción",
        "Actúa una canción",
        "Imita un objeto"
      ],
      mixed: [
        "1 trago",
        "Cuenta un chiste",
        "Medio vaso",
        "Canta una canción",
        "Vaso entero",
        "Baila 30 segundos",
        "Un shot",
        "Imita a alguien"
      ]
    }

    const modeActions = actions[gameMode as keyof typeof actions] || actions.mixed
    return modeActions
  }

  const actions = generateActions()

  const spinRoulette = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setShowResult(false)
    
    // Ángulo aleatorio para la ruleta
    const randomAngle = Math.floor(Math.random() * 360) + 720 // Mínimo 2 vueltas completas
    setSpinAngle(randomAngle)
    
    // Calcular qué acción fue seleccionada
    setTimeout(() => {
      const finalAngle = randomAngle % 360
      const actionIndex = Math.floor((360 - finalAngle) / (360 / actions.length))
      const selected = actions[actionIndex]
      setSelectedAction(selected)
      setSelectedPlayer(players[currentPlayerIndex])
      setShowResult(true)
      setIsSpinning(false)
      
      // Notificar al componente padre
      onSpin(players[currentPlayerIndex], selected)
    }, 3000)
  }

  const handleComplete = () => {
    setShowResult(false)
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
    onComplete()
  }

  const getActionColor = (action: string) => {
    if (action.includes('trago') || action.includes('vaso') || action.includes('shot')) {
      return 'from-red-500 to-orange-500'
    }
    if (action.includes('besa') || action.includes('quítate') || action.includes('picante')) {
      return 'from-pink-500 to-purple-500'
    }
    if (action.includes('pareja') || action.includes('romántico')) {
      return 'from-purple-500 to-pink-500'
    }
    return 'from-blue-500 to-cyan-500'
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>

        <div className="text-center relative z-10">
          {/* Título */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isBolivian ? '🎰 ¡Ruleta Cañera!' : '🎰 ¡Ruleta Drink!'}
          </motion.h1>

          {/* Jugador actual */}
          <motion.div 
            className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-white mr-2" />
              <span className="text-white font-semibold">Turno de:</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {players[currentPlayerIndex]}
            </div>
          </motion.div>

          {/* Ruleta animada */}
          <motion.div 
            className="relative mb-8 flex justify-center"
            ref={rouletteRef}
          >
            <motion.div
              className="text-8xl"
              animate={{ rotate: isSpinning ? spinAngle : 0 }}
              transition={{ 
                duration: isSpinning ? 3 : 0,
                ease: "easeOut"
              }}
            >
              🎰
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
            {showResult && selectedAction && (
              <motion.div 
                className={`backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 bg-gradient-to-r ${getActionColor(selectedAction)}/90`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">¡ACCIÓN!</span>
                </div>
                <div className="text-xl font-bold text-white mb-4">
                  {selectedAction}
                </div>
                <div className="text-white/80 text-sm">
                  ¡{selectedPlayer} debe cumplir la acción!
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-4">
            {!isSpinning && !showResult && (
              <motion.button
                onClick={spinRoulette}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSpinning}
              >
                <RotateCcw className="inline-block w-6 h-6 mr-2" />
                {isBolivian ? '¡Girar la Ruleta, Cumpa!' : '¡Girar la Ruleta!'}
              </motion.button>
            )}

            {showResult && (
              <motion.button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Siguiente Jugador!
              </motion.button>
            )}
          </div>

          {/* Lista de acciones */}
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-3">Acciones posibles:</h3>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {actions.map((action, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-xs text-center transition-all ${
                    showResult && action === selectedAction
                      ? `bg-gradient-to-r ${getActionColor(action)} text-white font-bold shadow-lg scale-105`
                      : 'bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/20'
                  }`}
                >
                  {action}
                </div>
              ))}
            </div>
          </div>

          {/* Lista de jugadores */}
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-3">Jugadores:</h3>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player, index) => (
                <div
                  key={player}
                  className={`p-3 rounded-lg text-sm text-center transition-all ${
                    index === currentPlayerIndex && !showResult
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg scale-105'
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

export default RouletteGame