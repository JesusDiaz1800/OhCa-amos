import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  SkipForward, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Users,
  Trophy,
  Timer,
  Play,
  Pause,
  Shuffle,
  Target,
  Heart,
  Zap,
  Crown,
  Star
} from 'lucide-react'
import { useGameStore } from '../stores/gameStore'
import { gameTypes, neverHaveIEverQuestions, truthOrDareQuestions, truthOrDareChallenges } from '../data/gameData'
import toast from 'react-hot-toast'

const GamePlay = () => {
  const { gameType } = useParams()
  const navigate = useNavigate()
  const { 
    players, 
    currentPlayerIndex, 
    nextPlayer, 
    addDrink, 
    addToHistory,
    settings,
    currentMode 
  } = useGameStore()
  
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [gameState, setGameState] = useState<'question' | 'answer' | 'transition'>('question')
  const [timer, setTimer] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentRound, setCurrentRound] = useState(1)
  const [totalRounds, setTotalRounds] = useState(5)
  const [roundHistory, setRoundHistory] = useState<any[]>([])
  const [currentGameType, setCurrentGameType] = useState('')

  const currentGame = gameTypes.find(g => g.id === gameType)
  const currentPlayer = players[currentPlayerIndex]

  useEffect(() => {
    if (!currentGame || players.length === 0) {
      navigate('/')
      return
    }
    generateNewRound()
  }, [currentGame, players])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (!isPaused && gameState === 'question' && settings.showTimer) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPaused, gameState, settings.showTimer])

  const generateNewRound = () => {
    if (!currentGame) return

    // Seleccionar juego aleatorio para esta ronda
    const availableGames = [
      'yo-nunca-he',
      'verdad-o-reto', 
      'el-rey',
      'paco',
      'picolo',
      'heads-up',
      'bomba-drink',
      'que-prefieres',
      'dados',
      'preguntados',
      'shot-roulette',
      'beer-pong'
    ]
    
    const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)]
    setCurrentGameType(randomGame)

    let question: any = null

    switch (randomGame) {
      case 'yo-nunca-he':
        const filteredQuestions = neverHaveIEverQuestions.filter(q => 
          q.tags.includes(currentMode || 'pre')
        )
        question = {
          type: 'yo-nunca-he',
          ...filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
        }
        break
      
      case 'verdad-o-reto':
        const isTruth = Math.random() > 0.5
        if (isTruth) {
          const filteredTruths = truthOrDareQuestions.filter(q => 
            q.tags.includes(currentMode || 'pre')
          )
          question = {
            type: 'verdad-o-reto',
            subType: 'truth',
            ...filteredTruths[Math.floor(Math.random() * filteredTruths.length)]
          }
        } else {
          const filteredDares = truthOrDareChallenges.filter(q => 
            q.tags.includes(currentMode || 'pre')
          )
          question = {
            type: 'verdad-o-reto',
            subType: 'dare',
            ...filteredDares[Math.floor(Math.random() * filteredDares.length)]
          }
        }
        break
      
      case 'cultura-chupistica':
        // Juego removido - usar alternativa
        question = {
          type: 'preguntados',
          category: 'General',
          question: '¿Cuál es la capital de Bolivia?'
        }
        break

      case 'el-rey':
        const cards = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        const randomCard = cards[Math.floor(Math.random() * cards.length)]
        question = {
          type: 'el-rey',
          card: randomCard,
          rule: getKingCardRule(randomCard)
        }
        break

      case 'cacho':
        // Juego removido - usar alternativa
        question = {
          type: 'dados',
          dice: generateDiceRoll(),
          rule: getDiceRule()
        }
        break

      case 'que-waso':
        // Juego removido - usar alternativa
        question = {
          type: 'que-prefieres',
          options: generateQuePrefieresOptions()
        }
        break

      case 'paco':
        question = {
          type: 'paco',
          challenge: generatePacoChallenge()
        }
        break

      case 'picolo':
        question = {
          type: 'picolo',
          target: generatePicoloTarget()
        }
        break

      case 'heads-up':
        question = {
          type: 'heads-up',
          category: ['Películas', 'Personajes', 'Acciones', 'Boliviano'][Math.floor(Math.random() * 4)],
          word: generateHeadsUpWord()
        }
        break

      case 'bomba-drink':
        question = {
          type: 'bomba-drink',
          time: Math.floor(Math.random() * 30) + 10,
          challenge: generateBombaChallenge()
        }
        break

      case 'que-prefieres':
        question = {
          type: 'que-prefieres',
          options: generateQuePrefieresOptions()
        }
        break

      case 'dados':
        question = {
          type: 'dados',
          dice: generateDiceRoll(),
          rule: getDiceRule()
        }
        break

      case 'preguntados':
        question = {
          type: 'preguntados',
          category: ['General', 'Bolivia', 'Música', 'Deportes'][Math.floor(Math.random() * 4)],
          question: generatePreguntadosQuestion()
        }
        break
      
      default:
        question = { text: 'Juego no implementado aún' }
    }

    setCurrentQuestion(question)
    setShowAnswer(false)
    setGameState('question')
    setTimer(0)
  }

  const getKingCardRule = (card: string) => {
    const rules: { [key: string]: string } = {
      'As': 'Cascada - todos beben',
      '2': 'Tú bebes',
      '3': 'Yo bebo',
      '4': 'Toca el suelo',
      '5': 'Chicos beben',
      '6': 'Chicas beben',
      '7': 'Levanta la mano',
      '8': 'Compañero',
      '9': 'Rima',
      '10': 'Categorías',
      'J': 'Crea una regla',
      'Q': 'Maestro de preguntas',
      'K': 'Vaso del Rey'
    }
    return rules[card] || 'Regla especial'
  }

  const generateDiceRoll = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)
  }

  const getCachoDenomination = () => {
    const denominations = ['Bala', 'Duque', 'Tren', 'Cuadra', 'Quina', 'Cena']
    return denominations[Math.floor(Math.random() * denominations.length)]
  }

  const generateQueWasoContent = () => {
    const qualities = ['Inteligente', 'Divertido', 'Atractivo', 'Misterioso', 'Aventurero']
    const defects = ['Perezoso', 'Tacaño', 'Mentiroso', 'Enojón', 'Desordenado']
    return {
      quality: qualities[Math.floor(Math.random() * qualities.length)],
      defect: defects[Math.floor(Math.random() * defects.length)]
    }
  }

  const generatePacoChallenge = () => {
    const challenges = [
      'Adivina qué número estoy pensando (1-10)',
      'Dime el nombre de 3 países que empiecen con B',
      'Canta 10 segundos de una canción',
      'Haz 5 flexiones',
      'Dime 3 palabras que rimen con "amor"'
    ]
    return challenges[Math.floor(Math.random() * challenges.length)]
  }

  const generatePicoloTarget = () => {
    const targets = ['la mesa', 'la pared', 'tu nariz', 'el techo', 'tu pie', 'la silla', 'la ventana']
    return targets[Math.floor(Math.random() * targets.length)]
  }

  const generateHeadsUpWord = () => {
    const words = ['Película', 'Cantar', 'Bailar', 'Cocinar', 'Dormir', 'Correr', 'Saltar', 'Reír']
    return words[Math.floor(Math.random() * words.length)]
  }

  const generateBombaChallenge = () => {
    const challenges = [
      'Dime 5 frutas',
      'Cuenta hasta 20',
      'Dime 3 colores',
      'Haz el baile del pollito',
      'Dime 4 animales'
    ]
    return challenges[Math.floor(Math.random() * challenges.length)]
  }

  const generateQuePrefieresOptions = () => {
    const options = [
      ['Ser rico pero feo', 'Ser pobre pero guapo'],
      ['No poder hablar', 'No poder ver'],
      ['Comer solo pizza toda la vida', 'Comer solo ensalada toda la vida'],
      ['Vivir en el pasado', 'Vivir en el futuro'],
      ['Ser famoso pero odiado', 'Ser desconocido pero amado']
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  const getDiceRule = () => {
    const rules = [
      'Suma los dados - si es par, bebes',
      'Cuenta los números pares - bebes esa cantidad',
      'El número más alto bebe',
      'El número más bajo bebe',
      'Si hay dos números iguales, todos beben'
    ]
    return rules[Math.floor(Math.random() * rules.length)]
  }

  const generatePreguntadosQuestion = () => {
    const questions = [
      '¿Cuál es la capital de Bolivia?',
      '¿Quién pintó la Mona Lisa?',
      '¿Cuántos planetas hay en el sistema solar?',
      '¿Cuál es el río más largo del mundo?',
      '¿En qué año terminó la Segunda Guerra Mundial?'
    ]
    return questions[Math.floor(Math.random() * questions.length)]
  }

  const handleNext = () => {
    if (gameState === 'question') {
      setGameState('answer')
      setShowAnswer(true)
    } else {
      // Guardar ronda en historial
      setRoundHistory(prev => [...prev, {
        round: currentRound,
        gameType: currentGameType,
        question: currentQuestion,
        player: currentPlayer?.name
      }])

      // Verificar si terminamos las rondas
      if (currentRound >= totalRounds) {
        // Juego terminado
        toast.success('¡Juego completado! 🎉')
        navigate('/')
        return
      }

      setCurrentRound(prev => prev + 1)
      nextPlayer()
      generateNewRound()
    }
  }

  const handleSkip = () => {
    generateNewRound()
  }

  const handleDrink = (playerId: string, amount = 1) => {
    addDrink(playerId, amount)
    addToHistory(`${players.find(p => p.id === playerId)?.name} bebió ${amount} trago${amount > 1 ? 's' : ''}`)
    toast.success(`${players.find(p => p.id === playerId)?.name} bebió ${amount} trago${amount > 1 ? 's' : ''}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const renderGameContent = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case 'yo-nunca-he':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🤫</div>
            <h2 className="text-3xl font-bold mb-4">Yo Nunca He</h2>
            <p className="text-xl mb-6">{currentQuestion.text}</p>
            <div className="text-sm text-gray-300">
              Si has hecho esto, ¡bebe!
            </div>
          </div>
        )

      case 'verdad-o-reto':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">
              {currentQuestion.subType === 'truth' ? '🎯' : '🔥'}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {currentQuestion.subType === 'truth' ? 'Verdad' : 'Reto'}
            </h2>
            <p className="text-xl mb-6">{currentQuestion.text}</p>
            <div className="text-sm text-gray-300">
              {currentQuestion.subType === 'truth' ? '¡Responde honestamente!' : '¡Completa el desafío!'}
            </div>
          </div>
        )

      case 'cultura-chupistica':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🧠</div>
            <h2 className="text-3xl font-bold mb-4">Cultura Chupística</h2>
            <p className="text-xl mb-6">Categoría: <span className="font-bold text-yellow-400">{currentQuestion.category}</span></p>
            <div className="text-sm text-gray-300 mb-4">
              Nombra algo de esta categoría. Si te equivocas o repites, ¡bebes!
            </div>
            <div className="text-xs text-gray-400">
              Ejemplos: {currentQuestion.items.slice(0, 3).join(', ')}...
            </div>
          </div>
        )

      case 'el-rey':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">👑</div>
            <h2 className="text-3xl font-bold mb-4">El Rey</h2>
            <div className="text-8xl mb-6 font-bold text-yellow-400">{currentQuestion.card}</div>
            <p className="text-xl mb-6">{currentQuestion.rule}</p>
          </div>
        )

      case 'cacho':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🎲</div>
            <h2 className="text-3xl font-bold mb-4">Cacho</h2>
            <div className="text-2xl mb-4">
              Dados: {currentQuestion.dice.join(' - ')}
            </div>
            <p className="text-xl mb-6">Denominación: <span className="font-bold text-yellow-400">{currentQuestion.denomination}</span></p>
          </div>
        )

      case 'que-waso':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">😄</div>
            <h2 className="text-3xl font-bold mb-4">Que Waso</h2>
            <p className="text-xl mb-6">
              {currentQuestion.variant === 'peor-es-nada' 
                ? `${currentQuestion.content.quality} pero ${currentQuestion.content.defect}`
                : 'Completa la frase con contexto boliviano'
              }
            </p>
          </div>
        )

      case 'paco':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">👮</div>
            <h2 className="text-3xl font-bold mb-4">Paco</h2>
            <p className="text-xl mb-6">{currentQuestion.challenge}</p>
            <div className="text-sm text-gray-300">
              Si fallas, ¡el Paco te hace beber!
            </div>
          </div>
        )

      case 'picolo':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">⚡</div>
            <h2 className="text-3xl font-bold mb-4">Picolo</h2>
            <p className="text-xl mb-6">¡Toca {currentQuestion.target}!</p>
            <div className="text-sm text-gray-300">
              El último en tocar bebe
            </div>
          </div>
        )

      case 'heads-up':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🎭</div>
            <h2 className="text-3xl font-bold mb-4">Heads Up!</h2>
            <p className="text-xl mb-6">Categoría: {currentQuestion.category}</p>
            <p className="text-2xl font-bold text-yellow-400 mb-6">{currentQuestion.word}</p>
            <div className="text-sm text-gray-300">
              Actúa o describe para que adivinen
            </div>
          </div>
        )

      case 'bomba-drink':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">💣</div>
            <h2 className="text-3xl font-bold mb-4">Bomba Drink</h2>
            <p className="text-xl mb-6">{currentQuestion.challenge}</p>
            <div className="text-2xl font-bold text-red-400 mb-4">
              Tiempo: {currentQuestion.time}s
            </div>
            <div className="text-sm text-gray-300">
              ¡Completa antes de que explote!
            </div>
          </div>
        )

      case 'que-prefieres':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🤔</div>
            <h2 className="text-3xl font-bold mb-4">¿Qué Prefieres?</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="text-lg">A) {currentQuestion.options[0]}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="text-lg">B) {currentQuestion.options[1]}</p>
              </div>
            </div>
            <div className="text-sm text-gray-300 mt-4">
              ¡Elige una opción!
            </div>
          </div>
        )

      case 'dados':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🎲</div>
            <h2 className="text-3xl font-bold mb-4">Juego de Dados</h2>
            <div className="text-2xl mb-4">
              Dados: {currentQuestion.dice.join(' - ')}
            </div>
            <p className="text-xl mb-6">{currentQuestion.rule}</p>
          </div>
        )

      case 'preguntados':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">❓</div>
            <h2 className="text-3xl font-bold mb-4">Preguntados</h2>
            <p className="text-lg mb-4">Categoría: {currentQuestion.category}</p>
            <p className="text-xl mb-6">{currentQuestion.question}</p>
            <div className="text-sm text-gray-300">
              ¡Responde correctamente o bebes!
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center">
            <p className="text-xl">Juego no implementado aún</p>
          </div>
        )
    }
  }

  if (!currentGame || !currentPlayer) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Salir</span>
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Ronda {currentRound}/{totalRounds}</h1>
          <p className="text-white/80">
            Turno de: <span className="font-semibold text-yellow-400">{currentPlayer.name}</span>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {settings.showTimer && (
            <div className="flex items-center space-x-2 text-white/80">
              <Timer size={20} />
              <span>{formatTime(timer)}</span>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Game Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card min-h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id || currentRound}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {renderGameContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Game Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-4 mt-8"
          >
            <button
              onClick={handleSkip}
              className="btn-secondary flex items-center space-x-2"
            >
              <SkipForward size={20} />
              <span>Saltar</span>
            </button>
            
            <button
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              {gameState === 'question' ? (
                <>
                  <Target size={20} />
                  <span>Mostrar</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  <span>Siguiente</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Current Game Type */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Shuffle className="text-purple-400" size={24} />
              <h3 className="text-lg font-semibold">Juego Actual</h3>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
              <div className="text-3xl mb-2">
                {gameTypes.find(g => g.id === currentGameType)?.icon}
              </div>
              <p className="font-semibold">
                {gameTypes.find(g => g.id === currentGameType)?.name}
              </p>
            </div>
          </div>

          {/* Players */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="text-blue-400" size={24} />
              <h3 className="text-lg font-semibold">Jugadores</h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    index === currentPlayerIndex
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50'
                      : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === currentPlayerIndex ? 'bg-yellow-500' : 'bg-white/20'
                    }`}>
                      {index === currentPlayerIndex ? <Crown size={16} className="text-white" /> : <span className="text-sm font-bold">{index + 1}</span>}
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-yellow-400">{player.drinks}</span>
                    <button
                      onClick={() => handleDrink(player.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      🍺
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Round Progress */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold">Progreso</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Ronda {currentRound}</span>
                <span>{Math.round((currentRound / totalRounds) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentRound / totalRounds) * 100}%` }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GamePlay
