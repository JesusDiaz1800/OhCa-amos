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
  Settings,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  Pause,
  Volume1,
  PartyPopper,
  Camera,
  Globe,
  MapPin,
  Flag,
  GamepadIcon,
  Clock,
  Award,
  TrendingUp,
  BarChart3,
  Palette
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
import CharadesGame from './CharadesGame'
import AchievementSystem from './AchievementSystem'
import AdvancedStats from './AdvancedStats'
import CustomizationPanel from './CustomizationPanel'

interface GameCard {
  id: string
  type: 'yo-nunca' | 'verdad-reto' | 'charadas' | 'que-prefieres' | 'quien-probable' | 'trivia' | 'accion-rapida' | 'bomba' | 'botella' | 'ruleta'
  title: string
  content: string
  difficulty: 'suave' | 'medio' | 'alto' | 'picante'
  category: string
  penalty: number
  instructions?: string
  options?: string[]
  correctAnswer?: string
  timeLimit?: number
  isGroupGame?: boolean
  selectedPlayer?: string
}

interface GameState {
  currentCardIndex: number
  totalCards: number
  cards: GameCard[]
  isPlaying: boolean
  isPaused: boolean
  timeLeft: number
  players: string[]
  currentPlayer: string
  drinks: Record<string, number>
  gameMode: string
  subMode: string
  isBolivian: boolean
  soundEnabled: boolean
  showSettings: boolean
  showCard: boolean
  showBottleGame: boolean
  showBombaGame: boolean
  showRouletteGame: boolean
  showYoNuncaGame: boolean
  showCulturaChupisticaGame: boolean
  showCharadesGame: boolean
  cardDirection: 'left' | 'right' | 'up' | 'down'
  showConfetti: boolean
  showSparkles: boolean
  penalty: number
  skipCount: number
  round: number
  maxRounds: number
  achievements: any[]
  showAchievements: boolean
  showStats: boolean
  showCustomization: boolean
  sessionStartTime: Date
  sessionDuration: number
}

const GameEngine: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [gameState, setGameState] = useState<GameState>({
    currentCardIndex: 0,
    totalCards: 0,
    cards: [],
    isPlaying: false,
    isPaused: false,
    timeLeft: 0,
    players: [],
    currentPlayer: '',
    drinks: {},
    gameMode: '',
    subMode: '',
    isBolivian: false,
    soundEnabled: true,
    showSettings: false,
    showCard: false,
    showBottleGame: false,
    showBombaGame: false,
    showRouletteGame: false,
    showYoNuncaGame: false,
    showCulturaChupisticaGame: false,
    showCharadesGame: false,
    cardDirection: 'right',
    showConfetti: false,
    showSparkles: false,
    penalty: 1,
    skipCount: 0,
    round: 1,
    maxRounds: 20,
    achievements: [],
    showAchievements: false,
    showStats: false,
    showCustomization: false,
    sessionStartTime: new Date(),
    sessionDuration: 0
  })

  // Cargar configuración inicial
  useEffect(() => {
    const mode = searchParams.get('mode') || 'classic'
    const subMode = searchParams.get('subMode') || 'mixed'
    const playersParam = searchParams.get('players') || ''
    
    let players: string[] = []
    
    // Intentar parsear jugadores desde URL
    if (playersParam) {
      try {
        players = JSON.parse(decodeURIComponent(playersParam))
      } catch (error) {
        console.error('Error parsing players from URL:', error)
      }
    }
    
    // Si no hay jugadores en URL, intentar desde localStorage
    if (!players || players.length === 0) {
      try {
        const storedPlayers = localStorage.getItem('gamePlayers')
        players = storedPlayers ? JSON.parse(storedPlayers) : []
      } catch (localError) {
        console.error('Error parsing players from localStorage:', localError)
      }
    }
    
    // Si aún no hay jugadores, usar valores por defecto
    if (!players || players.length === 0) {
      players = ['Jugador 1', 'Jugador 2', 'Jugador 3']
    }

    console.log('Players loaded:', players) // Debug

    const isBolivian = mode === 'bolivia'
    
    // Inicializar tragos
    const initialDrinks: Record<string, number> = {}
    players.forEach(player => {
      initialDrinks[player] = 0
    })

    setGameState(prev => ({
      ...prev,
      players,
      gameMode: mode,
      subMode,
      isBolivian,
      drinks: initialDrinks,
      currentPlayer: players[Math.floor(Math.random() * players.length)] || '',
      maxRounds: players.length * 5
    }))

    // Generar mazo de tarjetas
    generateCardDeck(mode, subMode, players)
  }, [searchParams])

  const generateCardDeck = useCallback((mode: string, subMode: string, players: string[]) => {
    const cards: GameCard[] = []
    const cardTypes = [
      'yo-nunca', 'verdad-reto', 'charadas', 'que-prefieres', 
      'quien-probable', 'trivia', 'accion-rapida', 'bomba', 'botella', 'ruleta'
    ]

    // Generar tarjetas basadas en el modo y sub-modo
    for (let i = 0; i < gameState.maxRounds; i++) {
      const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)]
      const selectedPlayer = players[Math.floor(Math.random() * players.length)]
      
      const card = generateCard(cardType, mode, subMode, selectedPlayer, i)
      if (card) {
        cards.push(card)
      }
    }

    setGameState(prev => ({
      ...prev,
      cards,
      totalCards: cards.length
    }))
  }, [gameState.maxRounds])

  const generateCard = (type: string, mode: string, subMode: string, player: string, index: number): GameCard | null => {
    const isBolivian = mode === 'bolivia'
    
    switch (type) {
      case 'yo-nunca':
        return generateYoNuncaCard(mode, subMode, player, index)
      case 'verdad-reto':
        return generateVerdadRetoCard(mode, subMode, player, index)
      case 'charadas':
        return generateCharadasCard(mode, subMode, player, index)
      case 'que-prefieres':
        return generateQuePrefieresCard(mode, subMode, player, index)
      case 'quien-probable':
        return generateQuienProbableCard(mode, subMode, player, index)
      case 'trivia':
        return generateTriviaCard(mode, subMode, player, index)
      case 'accion-rapida':
        return generateAccionRapidaCard(mode, subMode, player, index)
      case 'bomba':
        return generateBombaCard(mode, subMode, player, index)
      case 'botella':
        return generateBotellaCard(mode, subMode, player, index)
      case 'ruleta':
        return generateRuletaCard(mode, subMode, player, index)
      default:
        return null
    }
  }

  const generateYoNuncaCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    const questions = neverHaveIEverQuestions
    
    const question = questions[Math.floor(Math.random() * questions.length)]
    
    return {
      id: `yo-nunca-${index}`,
      type: 'yo-nunca',
      title: mode === 'bolivia' ? '🍺 ¡Yo Nunca… Cañero!' : '🍺 ¡Yo Nunca… La Pura Verdad!',
      content: question.text,
      difficulty: question.difficulty as any,
      category: 'confesión',
      penalty: 1,
      instructions: 'Si lo has hecho, toma un trago. Si no, todos los demás toman.',
      isGroupGame: true
    }
  }

  const generateVerdadRetoCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    const isTruth = Math.random() > 0.5
    const questions = isTruth ? truthOrDareQuestions : truthOrDareChallenges
    const question = questions[Math.floor(Math.random() * questions.length)]
    
    return {
      id: `verdad-reto-${index}`,
      type: 'verdad-reto',
      title: isTruth ? '🤔 Verdad' : '🎯 Reto',
      content: question.text,
      difficulty: question.difficulty as any,
      category: isTruth ? 'verdad' : 'reto',
      penalty: 1,
      instructions: isTruth ? 'Responde con la verdad o toma 2 tragos' : 'Completa el reto o toma 2 tragos',
      selectedPlayer: player
    }
  }

  const generateCharadasCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    const words = charadesWords
    const word = words[Math.floor(Math.random() * words.length)]
    
    return {
      id: `charadas-${index}`,
      type: 'charadas',
      title: '🎭 Charadas',
      content: word,
      difficulty: 'medio',
      category: 'mímica',
      penalty: 1,
      instructions: 'Imita o describe sin hablar. Si no adivinan en 30 segundos, todos toman.',
      selectedPlayer: player,
      timeLimit: 30
    }
  }

  const generateQuePrefieresCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    const questions = wouldYouRatherQuestions
    const question = questions[Math.floor(Math.random() * questions.length)]
    
    return {
      id: `que-prefieres-${index}`,
      type: 'que-prefieres',
      title: '🤷 ¿Qué Prefieres?',
      content: question.text,
      difficulty: question.difficulty as any,
      category: 'dilema',
      penalty: 1,
      instructions: 'Elige una opción. Los que elijan la opción menos popular toman.',
      selectedPlayer: player
    }
  }

  const generateQuienProbableCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    const questions = mostLikelyQuestions
    const question = questions[Math.floor(Math.random() * questions.length)]
    
    return {
      id: `quien-probable-${index}`,
      type: 'quien-probable',
      title: '👥 ¿Quién Es Más Probable?',
      content: question.text,
      difficulty: 'medio',
      category: 'votación',
      penalty: 1,
      instructions: 'Todos votan por quién es más probable. El más votado toma.',
      isGroupGame: true
    }
  }

  const generateTriviaCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    const questions = preguntadosQuestions
    const question = questions[Math.floor(Math.random() * questions.length)]
    
    return {
      id: `trivia-${index}`,
      type: 'trivia',
      title: mode === 'bolivia' ? '🧠 Cultura Chupística' : '🧠 Trivia',
      content: question.text,
      difficulty: question.difficulty as any,
      category: 'conocimiento',
      penalty: 1,
      instructions: 'Responde correctamente o toma un trago',
      selectedPlayer: player
    }
  }

  const generateAccionRapidaCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    const actions = [
      'Toca tu nariz con la lengua',
      'Haz 10 sentadillas',
      'Canta una canción completa',
      'Imita a un animal',
      'Dile algo bonito a la persona de tu derecha',
      'Baila durante 30 segundos',
      'Cuenta hasta 10 en otro idioma',
      'Haz una pose de yoga',
      'Recita un trabalenguas',
      'Haz una imitación de alguien famoso'
    ]
    
    const action = actions[Math.floor(Math.random() * actions.length)]
    
    return {
      id: `accion-rapida-${index}`,
      type: 'accion-rapida',
      title: '⚡ Acción Rápida',
      content: action,
      difficulty: 'medio',
      category: 'acción',
      penalty: 2,
      instructions: 'Completa la acción en 15 segundos o toma 2 tragos',
      selectedPlayer: player,
      timeLimit: 15
    }
  }

  const generateBombaCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    return {
      id: `bomba-${index}`,
      type: 'bomba',
      title: '💣 Bomba Drink',
      content: '¡La bomba está activa!',
      difficulty: 'alto',
      category: 'tiempo',
      penalty: 2,
      instructions: 'Pasa la bomba antes de que explote o toma 2 tragos',
      selectedPlayer: player,
      timeLimit: 30
    }
  }

  const generateBotellaCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    return {
      id: `botella-${index}`,
      type: 'botella',
      title: '🍺 Gira la Botella',
      content: '¡Gira la botella virtual!',
      difficulty: 'medio',
      category: 'azar',
      penalty: 1,
      instructions: 'La botella elegirá al jugador que debe completar el reto',
      isGroupGame: true
    }
  }

  const generateRuletaCard = (mode: string, subMode: string, player: string, index: number): GameCard => {
    return {
      id: `ruleta-${index}`,
      type: 'ruleta',
      title: '🎰 Ruleta Mágica',
      content: '¡Gira la ruleta!',
      difficulty: 'medio',
      category: 'azar',
      penalty: 1,
      instructions: 'La ruleta decidirá tu destino',
      selectedPlayer: player
    }
  }

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      showCard: true,
      currentCardIndex: 0
    }))
  }

  const pauseGame = () => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }))
  }

  const nextCard = (direction: 'left' | 'right' | 'up' | 'down' = 'right') => {
    // Verificar si es el final del juego
    if (gameState.currentCardIndex >= gameState.totalCards - 1) {
      endGame()
      return
    }

    // Determinar qué juego abrir basado en el tipo de tarjeta
    const gameType = currentCard?.type
    let gameToShow: string | null = null

    switch (gameType) {
      case 'botella':
        gameToShow = 'showBottleGame'
        break
      case 'bomba':
        gameToShow = 'showBombaGame'
        break
      case 'ruleta':
        gameToShow = 'showRouletteGame'
        break
      case 'yo-nunca':
        gameToShow = 'showYoNuncaGame'
        break
      case 'trivia':
        gameToShow = 'showCulturaChupisticaGame'
        break
      case 'charadas':
        gameToShow = 'showCharadesGame'
        break
      default:
        // Para otros tipos, avanzar normalmente
        setGameState(prev => ({
          ...prev,
          currentCardIndex: prev.currentCardIndex + 1,
          cardDirection: direction,
          showCard: false
        }))

        // Mostrar nueva tarjeta después de la animación
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            showCard: true,
            currentPlayer: prev.players[Math.floor(Math.random() * prev.players.length)]
          }))
        }, 300)
        return
    }

    // Abrir el juego específico
    if (gameToShow) {
      setGameState(prev => ({
        ...prev,
        [gameToShow]: true,
        showCard: false
      }))
    }
  }

  const skipCard = () => {
    setGameState(prev => ({
      ...prev,
      skipCount: prev.skipCount + 1
    }))
    
    // Actualizar logros
    updateAchievements('skip-card')
    
    nextCard()
  }

  const handleBottleSpin = (playerName: string) => {
    // Actualizar tragos del jugador seleccionado
    setGameState(prev => ({
      ...prev,
      drinks: {
        ...prev.drinks,
        [playerName]: (prev.drinks[playerName] || 0) + 1
      }
    }))
  }

  const handleBottleComplete = () => {
    // Avanzar a la siguiente tarjeta
    setGameState(prev => ({
      ...prev,
      showBottleGame: false,
      currentCardIndex: prev.currentCardIndex + 1,
      showCard: true,
      currentPlayer: prev.players[Math.floor(Math.random() * prev.players.length)]
    }))
  }

  const handleBombaComplete = () => {
    setGameState(prev => ({
      ...prev,
      showBombaGame: false,
      currentCardIndex: prev.currentCardIndex + 1,
      showCard: true,
      currentPlayer: prev.players[Math.floor(Math.random() * prev.players.length)]
    }))
  }

  const handleRouletteComplete = () => {
    setGameState(prev => ({
      ...prev,
      showRouletteGame: false,
      currentCardIndex: prev.currentCardIndex + 1,
      showCard: true,
      currentPlayer: prev.players[Math.floor(Math.random() * prev.players.length)]
    }))
  }

  const handleYoNuncaComplete = () => {
    setGameState(prev => ({
      ...prev,
      showYoNuncaGame: false,
      currentCardIndex: prev.currentCardIndex + 1,
      showCard: true,
      currentPlayer: prev.players[Math.floor(Math.random() * prev.players.length)]
    }))
  }

  const handleCulturaChupisticaComplete = () => {
    setGameState(prev => ({
      ...prev,
      showCulturaChupisticaGame: false,
      currentCardIndex: prev.currentCardIndex + 1,
      showCard: true,
      currentPlayer: prev.players[Math.floor(Math.random() * prev.players.length)]
    }))
  }

  const handleCharadesComplete = () => {
    setGameState(prev => ({
      ...prev,
      showCharadesGame: false,
      currentCardIndex: prev.currentCardIndex + 1,
      showCard: true,
      currentPlayer: prev.players[Math.floor(Math.random() * prev.players.length)]
    }))
  }

  const updateAchievements = (action: string) => {
    setGameState(prev => {
      const updatedAchievements = [...prev.achievements]
      
      // Lógica para actualizar logros basada en acciones
      switch (action) {
        case 'drink':
          // Actualizar logro "Primer Trago"
          const firstDrinkAchievement = updatedAchievements.find(a => a.id === 'first-drink')
          if (firstDrinkAchievement && !firstDrinkAchievement.unlocked) {
            firstDrinkAchievement.progress = 1
            firstDrinkAchievement.unlocked = true
            firstDrinkAchievement.unlockedAt = new Date()
          }
          
          // Actualizar logro "Maestro del Trago"
          const totalDrinks = Object.values(prev.drinks).reduce((sum, drink) => sum + drink, 0)
          const drinkingMasterAchievement = updatedAchievements.find(a => a.id === 'drinking-master')
          if (drinkingMasterAchievement && !drinkingMasterAchievement.unlocked) {
            drinkingMasterAchievement.progress = Math.min(totalDrinks, drinkingMasterAchievement.maxProgress)
            if (drinkingMasterAchievement.progress >= drinkingMasterAchievement.maxProgress) {
              drinkingMasterAchievement.unlocked = true
              drinkingMasterAchievement.unlockedAt = new Date()
            }
          }
          break
          
        case 'game-complete':
          // Actualizar logro "Maestro del Juego"
          const gameMasterAchievement = updatedAchievements.find(a => a.id === 'game-master')
          if (gameMasterAchievement && !gameMasterAchievement.unlocked) {
            gameMasterAchievement.progress = Math.min(prev.round, gameMasterAchievement.maxProgress)
            if (gameMasterAchievement.progress >= gameMasterAchievement.maxProgress) {
              gameMasterAchievement.unlocked = true
              gameMasterAchievement.unlockedAt = new Date()
            }
          }
          break
          
        case 'perfect-game':
          // Actualizar logro "Juego Perfecto"
          const perfectGameAchievement = updatedAchievements.find(a => a.id === 'perfect-game')
          if (perfectGameAchievement && !perfectGameAchievement.unlocked && prev.skipCount === 0) {
            perfectGameAchievement.progress = 1
            perfectGameAchievement.unlocked = true
            perfectGameAchievement.unlockedAt = new Date()
          }
          break
      }
      
      return {
        ...prev,
        achievements: updatedAchievements
      }
    })
  }



  const toggleAchievements = () => {
    setGameState(prev => ({
      ...prev,
      showAchievements: !prev.showAchievements
    }))
  }

  const toggleStats = () => {
    setGameState(prev => ({
      ...prev,
      showStats: !prev.showStats
    }))
  }

  const toggleCustomization = () => {
    setGameState(prev => ({
      ...prev,
      showCustomization: !prev.showCustomization
    }))
  }

  const applyPenalty = (player: string, amount: number = 1) => {
    setGameState(prev => ({
      ...prev,
      drinks: {
        ...prev.drinks,
        [player]: (prev.drinks[player] || 0) + amount
      }
    }))

    // Efecto de confeti
    setGameState(prev => ({ ...prev, showConfetti: true }))
    setTimeout(() => {
      setGameState(prev => ({ ...prev, showConfetti: false }))
    }, 2000)
  }

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      showCard: false
    }))
    
    // Navegar a resultados
    navigate('/game-results')
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

  const getCurrentCard = () => {
    return gameState.cards[gameState.currentCardIndex]
  }

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
      default: return '🎮'
    }
  }

  if (!gameState.isPlaying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full border border-white/20 text-center"
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎮
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            ¡Preparados para la Fiesta!
          </h1>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/80 text-sm">Modo</div>
              <div className="text-white font-semibold">
                {gameState.gameMode === 'bolivia' ? '🇧🇴 Bolivia' : '🎮 Clásico'}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/80 text-sm">Jugadores</div>
              <div className="text-white font-semibold">{gameState.players.length}</div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/80 text-sm">Tarjetas</div>
              <div className="text-white font-semibold">{gameState.totalCards}</div>
            </div>
          </div>
          
          <motion.button
            onClick={startGame}
            className="viral-button w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="inline-block w-6 h-6 mr-2" />
            ¡Empezar Juego!
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const currentCard = getCurrentCard()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Confeti */}
      <AnimatePresence>
        {gameState.showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate('/')}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-6 h-6" />
          </motion.button>

          <div className="text-center">
            <div className="text-white/80 text-sm">Tarjeta</div>
            <div className="text-white font-bold text-xl">
              {gameState.currentCardIndex + 1} / {gameState.totalCards}
            </div>
          </div>

          <motion.button
            onClick={toggleSettings}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Información del jugador actual */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20 text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white/80 text-sm mb-1">Turno de</div>
          <div className="text-white font-bold text-2xl">{gameState.currentPlayer}</div>
          <div className="text-white/60 text-sm">
            {gameState.drinks[gameState.currentPlayer] || 0} 🍺
          </div>
        </motion.div>

        {/* Tarjeta principal */}
        <AnimatePresence mode="wait">
          {gameState.showCard && currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ 
                opacity: 0,
                x: gameState.cardDirection === 'right' ? 300 : -300,
                y: gameState.cardDirection === 'down' ? 300 : gameState.cardDirection === 'up' ? -300 : 0,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0,
                x: gameState.cardDirection === 'right' ? -300 : 300,
                y: gameState.cardDirection === 'down' ? -300 : gameState.cardDirection === 'up' ? 300 : 0,
                scale: 0.8
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mb-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
                {/* Header de la tarjeta */}
                <div className="text-center mb-6">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {getCardIcon(currentCard.type)}
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
                    {currentCard.title}
                  </motion.h2>
                  
                  <div className={`inline-block bg-gradient-to-r ${getDifficultyColor(currentCard.difficulty)} text-white px-4 py-2 rounded-full font-bold text-sm`}>
                    {currentCard.difficulty.toUpperCase()}
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <motion.div
                  className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-white mb-4 text-center">
                    {currentCard.content}
                  </div>
                  
                  {currentCard.instructions && (
                    <div className="text-white/80 text-lg text-center">
                      {currentCard.instructions}
                    </div>
                  )}
                </motion.div>

                {/* Controles */}
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={() => skipCard()}
                    className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipForward className="inline-block w-5 h-5 mr-2" />
                    Saltar
                  </motion.button>

                  <motion.button
                    onClick={() => nextCard()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight className="inline-block w-5 h-5 mr-2" />
                    Siguiente
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controles de navegación */}
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => nextCard('left')}
            className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>

          <motion.button
            onClick={pauseGame}
            className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {gameState.isPaused ? <Play className="w-8 h-8" /> : <Pause className="w-8 h-8" />}
          </motion.button>

          <motion.button
            onClick={() => nextCard('right')}
            className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>

        {/* Botones de funcionalidades avanzadas */}
        <div className="fixed bottom-4 left-4 flex gap-3">
          <motion.button
            onClick={toggleAchievements}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trophy className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={toggleStats}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BarChart3 className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={toggleCustomization}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Palette className="w-6 h-6" />
          </motion.button>
        </div>
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
                  <span className="text-white">Penalización</span>
                  <select 
                    value={gameState.penalty}
                    onChange={(e) => setGameState(prev => ({ ...prev, penalty: parseInt(e.target.value) }))}
                    className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2"
                  >
                    <option value={1}>1 Trago</option>
                    <option value={2}>2 Tragos</option>
                    <option value={3}>3 Tragos</option>
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

    {/* Sistema de Logros */}
    <AchievementSystem />

    {/* Sistema de Estadísticas */}
    {gameState.showStats && (
      <AdvancedStats
        sessions={[]}
        players={[]}
        showDetailed={true}
        onExport={() => console.log('Exportar estadísticas')}
        onShare={() => console.log('Compartir estadísticas')}
      />
    )}

    {/* Panel de Personalización */}
    {gameState.showCustomization && (
      <CustomizationPanel
        isOpen={gameState.showCustomization}
        onClose={toggleCustomization}
        onThemeChange={(theme) => console.log('Tema cambiado:', theme)}
        onSettingsChange={(settings) => console.log('Configuración cambiada:', settings)}
        currentTheme={{
          id: 'default',
          name: 'Clásico',
          description: 'Tema original',
          icon: Star,
          colors: {
            primary: '#FF6B6B',
            secondary: '#4ECDC4',
            accent: '#45B7D1',
            background: '#1a1a2e',
            surface: '#16213e',
            text: '#ffffff',
            textSecondary: '#a0a0a0'
          },
          gradients: {
            primary: 'from-red-500 to-pink-500',
            secondary: 'from-blue-500 to-cyan-500',
            accent: 'from-purple-500 to-indigo-500'
          },
          effects: {
            particles: true,
            animations: true,
            glow: true,
            blur: true
          }
        }}
        currentSettings={{}}
      />
    )}

    {/* Juego de Botella */}
    {gameState.showBottleGame && (
      <BottleGame
        players={gameState.players}
        onSpin={handleBottleSpin}
        onComplete={handleBottleComplete}
        isBolivian={gameState.isBolivian}
        gameMode={gameState.gameMode}
      />
    )}

    {/* Juego de Bomba */}
    {gameState.showBombaGame && (
      <BombaGame
        players={gameState.players}
        onExplode={(playerName) => {
          setGameState(prev => ({
            ...prev,
            drinks: {
              ...prev.drinks,
              [playerName]: (prev.drinks[playerName] || 0) + 2
            }
          }))
        }}
        onComplete={handleBombaComplete}
        isBolivian={gameState.isBolivian}
        gameMode={gameState.gameMode}
      />
    )}

    {/* Juego de Ruleta */}
    {gameState.showRouletteGame && (
      <RouletteGame
        players={gameState.players}
        onSpin={(playerName) => {
          setGameState(prev => ({
            ...prev,
            drinks: {
              ...prev.drinks,
              [playerName]: (prev.drinks[playerName] || 0) + 1
            }
          }))
        }}
        onComplete={handleRouletteComplete}
        isBolivian={gameState.isBolivian}
        gameMode={gameState.gameMode}
      />
    )}

    {/* Juego Yo Nunca */}
    {gameState.showYoNuncaGame && (
      <YoNuncaGame
        players={gameState.players}
        onComplete={handleYoNuncaComplete}
        isBolivian={gameState.isBolivian}
        gameMode={gameState.gameMode}
      />
    )}

    {/* Juego Cultura Chupística */}
    {gameState.showCulturaChupisticaGame && (
      <CulturaChupisticaGame
        players={gameState.players}
        onAnswer={(playerName: string, isCorrect: boolean) => {
          if (!isCorrect) {
            setGameState(prev => ({
              ...prev,
              drinks: {
                ...prev.drinks,
                [playerName]: (prev.drinks[playerName] || 0) + 1
              }
            }))
          }
        }}
        onComplete={handleCulturaChupisticaComplete}
        isBolivian={gameState.isBolivian}
        gameMode={gameState.gameMode}
      />
    )}

    {/* Juego de Charadas */}
    {gameState.showCharadesGame && (
      <CharadesGame
        players={gameState.players}
        onComplete={handleCharadesComplete}
        isBolivian={gameState.isBolivian}
        gameMode={gameState.gameMode}
      />
    )}
  </div>
)
}

export default GameEngine
