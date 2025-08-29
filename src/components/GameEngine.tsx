import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { 
  Play, 
  SkipForward, 
  RotateCcw, 
  Trophy, 
  Users, 
  Zap,
  Heart,
  Brain,
  Target,
  Crown,
  Star,
  X,
  Check,
  Timer,
  ArrowLeft,
  Home,
  Gamepad2,
  Sparkles,
  Flame,
  Beer,
  Wine,
  GlassWater,
  Shuffle,
  Volume2,
  VolumeX,
  Settings
} from 'lucide-react'
import { 
  neverHaveIEverQuestions, 
  truthOrDareQuestions, 
  truthOrDareChallenges,
  bolivianSlang,
  bolivianDrinks,
  gameTypes
} from '../data/gameData'
import {
  wouldYouRatherQuestions,
  mostLikelyQuestions,
  tomanjiQuestions,
  tomanjiChallenges,
  preguntadosQuestions,
  queWasoBlackCards,
  queWasoWhiteCards,
  peorEsNadaWhiteCards,
  peorEsNadaRedCards,
  psychQuestions,
  trivia360Questions,
  unoQuestions,
  charadesWords,
  papiroPicoQuestions,
  chimboleo3000Questions
} from '../data/extraGameData'
import BombaGame from './BombaGame'
import BottleGame from './BottleGame'
import RouletteGame from './RouletteGame'
import CulturaChupisticaGame from './CulturaChupisticaGame'
import YoNuncaGame from './YoNuncaGame'

interface GameRound {
  id: number
  gameType: string
  title: string
  description: string
  icon: string
  color: string
  completed: boolean
  content: string
  challenge?: string
  selectedPlayers?: string[]
  isGroupGame?: boolean
  penalty?: number
  rules?: string[]
}

interface GameState {
  currentRound: number
  totalRounds: number
  rounds: GameRound[]
  isPlaying: boolean
  isModeSelection: boolean
  selectedMode: string | null
  timeLeft: number
  players: string[]

  drinks: Record<string, number>
  currentPlayer: number
  selectedPlayer: string | null
  gameHistory: string[]
  penalties: Record<string, number>
  isBolivian: boolean
  soundEnabled: boolean
  showSettings: boolean
  subMode: string | null
  currentGameComponent: string | null
  showGameComponent: boolean
}

const GameEngine: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // Obtener parámetros de la URL
  const mode = searchParams.get('mode') || 'classic'
  const subMode = searchParams.get('subMode') || null
  const playersParam = searchParams.get('players') || ''
  const players = playersParam ? playersParam.split(',') : []

  const [gameState, setGameState] = useState<GameState>({
    currentRound: 0,
    totalRounds: 10,
    rounds: [],
    isPlaying: false,
    isModeSelection: false,
    selectedMode: mode,
    timeLeft: 30,
    players: players,

    drinks: {},
    currentPlayer: 0,
    selectedPlayer: null,
    gameHistory: [],
    penalties: {},
    isBolivian: mode === 'bolivia',
    soundEnabled: true,
    showSettings: false,
    subMode: subMode,
    currentGameComponent: null,
    showGameComponent: false
  })

  // Función para actualizar el número de rondas
  const updateRounds = (newRounds: number) => {
    setGameState(prev => ({
      ...prev,
      totalRounds: newRounds,
      configurableRounds: newRounds
    }))
  }

  // Memoizar getGameTypesForSubMode para evitar recreaciones
  const getGameTypesForSubMode = useCallback((subMode: string) => {
    // Filtrar tipos de juego según el sub-mode usando los IDs correctos de gameTypes
    switch (subMode) {
      case 'previa':
      case 'previa-boliviana':
        return gameTypes.filter(game => ['verdad-o-reto', 'yo-nunca-he', 'picolo'].includes(game.id))
      case 'fiesta':
      case 'joda':
        return gameTypes.filter(game => ['verdad-o-reto', 'yo-nunca-he', 'picolo', 'heads-up', 'bomba-drink'].includes(game.id))
      case 'after':
        return gameTypes.filter(game => ['verdad-o-reto', 'yo-nunca-he', 'bomba-drink', 'el-rey'].includes(game.id))
      case 'hot':
      case 'relacion-toxi':
        return gameTypes.filter(game => ['verdad-o-reto', 'yo-nunca-he', 'heads-up'].includes(game.id))
      case 'pareja':
        return gameTypes.filter(game => ['verdad-o-reto', 'heads-up'].includes(game.id))
      case 'trivia':
      case 'bolivia-profunda':
        return gameTypes.filter(game => ['paco', 'heads-up'].includes(game.id))
      default:
        return gameTypes
    }
  }, [])

  // Memoizar generateGameRounds para evitar recreaciones
  const generateGameRounds = useCallback(() => {
    if (!subMode || players.length === 0) return

    const rounds: GameRound[] = []
    const gameTypesForMode = getGameTypesForSubMode(subMode)
    
    // Verificar que hay tipos de juego disponibles
    if (gameTypesForMode.length === 0) {
      console.warn('No hay tipos de juego disponibles para el sub-mode:', subMode)
      return
    }
    
    for (let i = 0; i < gameState.totalRounds; i++) {
      const randomIndex = Math.floor(Math.random() * gameTypesForMode.length)
      const randomGameType = gameTypesForMode[randomIndex]
      
      // Verificar que el tipo de juego existe
      if (!randomGameType) {
        console.warn('Tipo de juego undefined en índice:', randomIndex)
        continue
      }
      
      const round: GameRound = {
        id: i + 1,
        gameType: randomGameType.id,
        title: randomGameType.name,
        description: randomGameType.description,
        icon: randomGameType.icon,
        color: randomGameType.color,
        completed: false,
        content: '',
        isGroupGame: false
      }
      rounds.push(round)
    }
    
    setGameState(prev => ({
      ...prev,
      rounds
    }))
  }, [subMode, players.length, gameState.totalRounds, getGameTypesForSubMode])

  // Inicializar jugadores y tragos
  useEffect(() => {
    if (players.length > 0) {
      const initialDrinks: Record<string, number> = {}
      
      players.forEach(player => {
        initialDrinks[player] = 0
      })
      
      setGameState(prev => ({
        ...prev,
        players,
        drinks: initialDrinks
      }))
    }
  }, [players])

  const startCurrentRound = useCallback(() => {
    const currentRound = gameState.rounds[gameState.currentRound - 1]
    if (!currentRound) return

    // Mapear el tipo de juego a un componente específico con distribución aleatoria
    let gameComponent: string | null = null
    
    // Distribuir aleatoriamente entre todos los juegos disponibles
    const availableGames = ['bomba', 'botella', 'ruleta', 'cultura', 'yo-nunca']
    gameComponent = availableGames[Math.floor(Math.random() * availableGames.length)]
    
    console.log(`Ronda ${gameState.currentRound}: Seleccionado juego ${gameComponent}`)

    setGameState(prev => ({
      ...prev,
      currentGameComponent: gameComponent
    }))
  }, [gameState.currentRound, gameState.rounds])

  // Generar rondas de juego basadas en el sub-mode - solo una vez al inicializar
  useEffect(() => {
    if (subMode && players.length > 0 && gameState.rounds.length === 0) {
      generateGameRounds()
    }
  }, [subMode, players.length, generateGameRounds])

  // Manejar el cambio de ronda y mostrar el componente de juego correspondiente
  useEffect(() => {
    if (gameState.isPlaying && gameState.showGameComponent && gameState.rounds.length > 0) {
      startCurrentRound()
    }
  }, [gameState.isPlaying, gameState.showGameComponent, gameState.currentRound, gameState.rounds.length, startCurrentRound])

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      currentRound: 1,
      showGameComponent: true
    }))
  }

  const handleGameComplete = (result?: any) => {
    console.log(`Juego completado. Ronda ${gameState.currentRound} de ${gameState.totalRounds}`)
    
    // Marcar la ronda como completada
    setGameState(prev => ({
      ...prev,
      rounds: prev.rounds.map(round => 
        round.id === prev.currentRound 
          ? { ...round, completed: true }
          : round
      ),
      showGameComponent: false
    }))

    // Pausa antes de la siguiente ronda
    setTimeout(() => {
      nextRound()
    }, 2000)
  }

  const nextRound = () => {
    if (gameState.currentRound < gameState.totalRounds) {
      console.log(`Pasando a la siguiente ronda: ${gameState.currentRound + 1}`)
      setGameState(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        showGameComponent: true
      }))
    } else {
      console.log('Juego terminado - todas las rondas completadas')
      endGame()
    }
  }

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      showGameComponent: false
    }))
  }

  const selectRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * gameState.players.length)
    const selectedPlayer = gameState.players[randomIndex]
    setGameState(prev => ({
      ...prev,
      selectedPlayer
    }))
    return selectedPlayer
  }



  const updateDrinks = (player: string, drinks: number) => {
    setGameState(prev => ({
      ...prev,
      drinks: {
        ...prev.drinks,
        [player]: (prev.drinks[player] || 0) + drinks
      }
    }))
  }

  const toggleSound = () => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }))
  }

  const toggleSettings = () => {
    setGameState(prev => ({
      ...prev,
      showSettings: !prev.showSettings
    }))
  }

  const handleBack = () => {
    navigate('/game-sub-mode-selector')
  }

  const handleHome = () => {
    navigate('/home')
  }

  // Si no hay jugadores, mostrar pantalla de configuración
  if (players.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-800 to-pink-600 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Configuración Requerida</h1>
          <p className="text-white/80 mb-6">Necesitas configurar jugadores para empezar</p>
          <button
            onClick={() => navigate('/player-setup')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
          >
            Configurar Jugadores
          </button>
        </div>
      </div>
    )
  }

  // Si no hay sub-mode seleccionado, mostrar selector
  if (!subMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-800 to-pink-600 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Selecciona un Modo</h1>
          <p className="text-white/80 mb-6">Necesitas elegir un modo de juego</p>
          <button
            onClick={() => navigate('/game-sub-mode-selector')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
          >
            Seleccionar Modo
          </button>
        </div>
      </div>
    )
  }

  // Renderizar componente de juego específico
  const renderGameComponent = () => {
    if (!gameState.showGameComponent || !gameState.currentGameComponent) return null

    const baseProps = {
      players: gameState.players,
      onComplete: handleGameComplete,
      isBolivian: gameState.isBolivian,
      gameMode: gameState.selectedMode || 'mixed'
    }

    switch (gameState.currentGameComponent) {
      case 'bomba':
        return <BombaGame {...baseProps} onExplode={(player) => updateDrinks(player, 1)} />
      case 'botella':
        return <BottleGame {...baseProps} onSpin={(player) => updateDrinks(player, 1)} />
      case 'ruleta':
        return <RouletteGame {...baseProps} onSpin={(player, action) => updateDrinks(player, 1)} />
      case 'cultura':
        return <CulturaChupisticaGame {...baseProps} onAnswer={(player, isCorrect) => updateDrinks(player, isCorrect ? 0 : 1)} />
      case 'yo-nunca':
        return <YoNuncaGame {...baseProps} />
      default:
        return <CulturaChupisticaGame {...baseProps} onAnswer={(player, isCorrect) => updateDrinks(player, isCorrect ? 0 : 1)} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-200"
          >
            <ArrowLeft size={24} />
            <span className="text-lg font-semibold">Volver</span>
          </button>
          
          <button
            onClick={handleHome}
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-200"
          >
            <Home size={24} />
            <span className="text-lg font-semibold">Inicio</span>
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-1">
            {gameState.isBolivian ? '🇧🇴 Modo Bolivia' : '🎮 Modo Clásico'}
          </h1>
          <p className="text-white/80 text-sm">
            {subMode} • {players.length} jugadores
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            {gameState.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button
            onClick={toggleSettings}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto">
        {!gameState.isPlaying ? (
          // Pantalla de inicio
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¡Listo para Jugar!
              </h2>
              <p className="text-white/80 mb-6">
                Modo: <strong>{subMode}</strong> • Jugadores: <strong>{players.join(', ')}</strong>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">Jugadores</h3>
                  {/* Lista de jugadores - ELIMINADO */}
                  {/* Ya no es necesario mostrar contadores de puntuación */}
                </div>
                
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">Configuración</h3>
                  <div className="space-y-2 text-white/80">
                    <div>Rondas: {gameState.totalRounds}</div>
                    <div>Sonido: {gameState.soundEnabled ? 'Activado' : 'Desactivado'}</div>
                    <div>Modo: {gameState.isBolivian ? 'Bolivia' : 'Clásico'}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl hover:from-green-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <Play size={24} />
                ¡Empezar la Fiesta!
              </button>
            </div>
          </motion.div>
        ) : (
          // Juego en progreso
          <div>
            {/* Información de la ronda */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Ronda {gameState.currentRound} de {gameState.totalRounds}
                </h2>
                <div className="text-white/80">
                  {gameState.rounds[gameState.currentRound - 1]?.title}
                </div>
                {gameState.currentGameComponent && (
                  <div className="text-yellow-300 text-sm mt-2">
                    🎮 Juego: {gameState.currentGameComponent.toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(gameState.currentRound / gameState.totalRounds) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Componente de juego específico */}
            <AnimatePresence mode="wait">
              {gameState.showGameComponent && (
                <motion.div
                  key={gameState.currentRound}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderGameComponent()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {gameState.showSettings && (
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
                      gameState.soundEnabled ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      gameState.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white">Rondas</span>
                  <select 
                    value={gameState.totalRounds}
                    onChange={(e) => setGameState(prev => ({ ...prev, totalRounds: parseInt(e.target.value) }))}
                    className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={toggleSettings}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-xl mt-6"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GameEngine
