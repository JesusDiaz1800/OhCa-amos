import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Clock, Trophy, ArrowUp, ArrowDown, SkipForward, Check, Play, 
  Volume2, VolumeX, Settings, Team, Star, Zap, Heart, Crown, Target, 
  Award, X, Pause, RotateCcw, Sparkles, Lightbulb, Timer, TrendingUp,
  Activity, Medal, Flame, Rocket, Diamond, Gift, Music, Eye, EyeOff
} from 'lucide-react'

interface CharadesGameProps {
  players: string[]
  onComplete: () => void
  isBolivian?: boolean
  gameMode?: string
}

interface Team {
  name: string
  players: string[]
  score: number
  color: string
  streak: number
  bestStreak: number
  totalWords: number
  accuracy: number
}

interface Word {
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  hints: string[]
}

interface GameStats {
  totalRounds: number
  averageScore: number
  bestRound: number
  totalPlayTime: number
  perfectRounds: number
}

const CharadesGame: React.FC<CharadesGameProps> = ({ players, onComplete, isBolivian = false }) => {
  // Estados principales del juego
  const [gamePhase, setGamePhase] = useState<'setup' | 'team1' | 'team2' | 'results' | 'pause'>('setup')
  const [teams, setTeams] = useState<Team[]>([])
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  const [currentGuesser, setCurrentGuesser] = useState<string>('')
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wordsGuessed, setWordsGuessed] = useState(0)
  const [currentCategory, setCurrentCategory] = useState('')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  
  // Estados de UI/UX
  const [showInstructions, setShowInstructions] = useState(true)
  const [showTips, setShowTips] = useState(false)
  const [currentTip, setCurrentTip] = useState('')
  const [wordsSkipped, setWordsSkipped] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [tiltDirection, setTiltDirection] = useState<'up' | 'down' | null>(null)
  
  // Estados de animación y efectos
  const [timerPulse, setTimerPulse] = useState(false)
  const [wordReveal, setWordReveal] = useState(false)
  const [scoreAnimation, setScoreAnimation] = useState(false)
  const [streakAnimation, setStreakAnimation] = useState(false)
  
  // Referencias
  const timerRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement>()
  const cheerRef = useRef<HTMLAudioElement>()
  const skipRef = useRef<HTMLAudioElement>()
  const tickRef = useRef<HTMLAudioElement>()
  
  // Estadísticas del juego
  const [gameStats, setGameStats] = useState<GameStats>({
    totalRounds: 0,
    averageScore: 0,
    bestRound: 0,
    totalPlayTime: 0,
    perfectRounds: 0
  })

  // Base de datos mejorada de palabras con estructura profesional
  const charadeWords: Record<string, Word[]> = {
    '🎬 Películas y Series': [
      { text: 'Titanic', category: 'Películas y Series', difficulty: 'easy', points: 10, hints: ['Barco', 'Leonardo DiCaprio', '1997'] },
      { text: 'Star Wars', category: 'Películas y Series', difficulty: 'easy', points: 10, hints: ['Guerra de las Galaxias', 'Darth Vader', 'La Fuerza'] },
      { text: 'Avengers', category: 'Películas y Series', difficulty: 'medium', points: 15, hints: ['Superhéroes', 'Marvel', 'Iron Man'] },
      { text: 'Friends', category: 'Películas y Series', difficulty: 'easy', points: 10, hints: ['Serie', 'Café Central', 'Ross y Rachel'] },
      { text: 'Breaking Bad', category: 'Películas y Series', difficulty: 'hard', points: 20, hints: ['Walter White', 'Metanfetaminas', 'Heisenberg'] }
    ],
    '🎵 Canciones Famosas': [
      { text: 'Bohemian Rhapsody', category: 'Canciones Famosas', difficulty: 'medium', points: 15, hints: ['Queen', 'Freddie Mercury', 'Ópera Rock'] },
      { text: 'Imagine', category: 'Canciones Famosas', difficulty: 'easy', points: 10, hints: ['John Lennon', 'Paz', 'Beatles'] },
      { text: 'Hotel California', category: 'Canciones Famosas', difficulty: 'medium', points: 15, hints: ['Eagles', 'California', 'Hotel'] }
    ],
    '👑 Personajes Históricos': [
      { text: 'Albert Einstein', category: 'Personajes Históricos', difficulty: 'easy', points: 10, hints: ['Física', 'Relatividad', 'E=mc²'] },
      { text: 'Cleopatra', category: 'Personajes Históricos', difficulty: 'medium', points: 15, hints: ['Egipto', 'Reina', 'Marco Antonio'] }
    ],
    '🏃 Verbos de Acción': [
      { text: 'Bailar', category: 'Verbos de Acción', difficulty: 'easy', points: 10, hints: ['Música', 'Ritmo', 'Movimiento'] },
      { text: 'Nadar', category: 'Verbos de Acción', difficulty: 'easy', points: 10, hints: ['Agua', 'Piscina', 'Brazos'] }
    ],
    '📱 Objetos Cotidianos': [
      { text: 'Teléfono', category: 'Objetos Cotidianos', difficulty: 'easy', points: 10, hints: ['Comunicación', 'Pantalla', 'Llamar'] },
      { text: 'Llaves', category: 'Objetos Cotidianos', difficulty: 'easy', points: 10, hints: ['Puerta', 'Metal', 'Abrir'] }
    ],
    '⚽ Deportes': [
      { text: 'Fútbol', category: 'Deportes', difficulty: 'easy', points: 10, hints: ['Pelota', 'Gol', '11 jugadores'] },
      { text: 'Baloncesto', category: 'Deportes', difficulty: 'easy', points: 10, hints: ['Canasta', 'Pelota naranja', 'NBA'] }
    ],
    '🦁 Animales': [
      { text: 'León', category: 'Animales', difficulty: 'easy', points: 10, hints: ['Rey', 'Melena', 'África'] },
      { text: 'Tigre', category: 'Animales', difficulty: 'easy', points: 10, hints: ['Rayas', 'Naranja', 'Selva'] }
    ],
    '👨‍⚕️ Profesiones': [
      { text: 'Médico', category: 'Profesiones', difficulty: 'easy', points: 10, hints: ['Salud', 'Hospital', 'Estetoscopio'] },
      { text: 'Profesor', category: 'Profesiones', difficulty: 'easy', points: 10, hints: ['Educación', 'Escuela', 'Pizarra'] }
    ]
  }

  const boliviaWords: Record<string, Word[]> = {
    '🇧🇴 Cultura Boliviana': [
      { text: 'Carnaval de Oruro', category: 'Cultura Boliviana', difficulty: 'medium', points: 15, hints: ['Oruro', 'Danza', 'Febrero'] },
      { text: 'Tinku', category: 'Cultura Boliviana', difficulty: 'hard', points: 20, hints: ['Danza', 'Potosí', 'Ritual'] },
      { text: 'Cholita', category: 'Cultura Boliviana', difficulty: 'easy', points: 10, hints: ['Mujer', 'Pollera', 'La Paz'] }
    ],
    '🗣️ Modismos Bolivianos': [
      { text: 'Waso', category: 'Modismos Bolivianos', difficulty: 'medium', points: 15, hints: ['Bueno', 'Excelente', 'Chévere'] },
      { text: 'Chimbo', category: 'Modismos Bolivianos', difficulty: 'hard', points: 20, hints: ['Malo', 'Falso', 'Impostor'] }
    ],
    '🏔️ Lugares Bolivianos': [
      { text: 'La Paz', category: 'Lugares Bolivianos', difficulty: 'easy', points: 10, hints: ['Capital', 'Alto', 'Teleférico'] },
      { text: 'Salar de Uyuni', category: 'Lugares Bolivianos', difficulty: 'medium', points: 15, hints: ['Sal', 'Espejo', 'Uyuni'] }
    ]
  }

  // Configuración del juego
  const gameConfig = {
    easy: { timeLimit: 90, points: 10, hints: 3 },
    medium: { timeLimit: 60, points: 15, hints: 2 },
    hard: { timeLimit: 45, points: 20, hints: 1 }
  }

  // Efectos de sonido
  const playSound = useCallback((type: 'cheer' | 'skip' | 'tick' | 'success') => {
    if (!soundEnabled) return
    
    const sounds = {
      cheer: '/sounds/cheer.mp3',
      skip: '/sounds/skip.mp3',
      tick: '/sounds/tick.mp3',
      success: '/sounds/success.mp3'
    }
    
    try {
      const audio = new Audio(sounds[type])
      audio.volume = 0.5
      audio.play()
    } catch (error) {
      console.log('Sonido no disponible:', type)
    }
  }, [soundEnabled])

  // Inicialización del juego
  useEffect(() => {
    if (players.length >= 2) {
      initializeTeams()
    }
  }, [players])

  // Timer del juego
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeOut()
            return 0
          }
          
          // Efectos visuales del timer
          if (prev <= 10) {
            setTimerPulse(true)
            playSound('tick')
          }
          
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, timeLeft, playSound])

  // Detección de orientación del dispositivo
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta && event.gamma) {
        const beta = event.beta
        if (beta > 45) setTiltDirection('up')
        else if (beta < -45) setTiltDirection('down')
        else setTiltDirection(null)
      }
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation)
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  }, [])

  // Funciones del juego
  const initializeTeams = useCallback(() => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5)
    const midPoint = Math.ceil(shuffledPlayers.length / 2)
    
    const team1: Team = {
      name: 'Equipo 1',
      players: shuffledPlayers.slice(0, midPoint),
      score: 0,
      color: '#ef4444',
      streak: 0,
      bestStreak: 0,
      totalWords: 0,
      accuracy: 0
    }
    
    const team2: Team = {
      name: 'Equipo 2',
      players: shuffledPlayers.slice(midPoint),
      score: 0,
      color: '#3b82f6',
      streak: 0,
      bestStreak: 0,
      totalWords: 0,
      accuracy: 0
    }
    
    setTeams([team1, team2])
    setCurrentTeam(team1)
  }, [players])

  const startGame = useCallback(() => {
    setGamePhase('team1')
    setShowInstructions(false)
    startTurn()
  }, [])

  const startTurn = useCallback(() => {
    const categories = Object.keys(isBolivian ? boliviaWords : charadeWords)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const words = isBolivian ? boliviaWords[randomCategory] : charadeWords[randomCategory]
    const randomWord = words[Math.floor(Math.random() * words.length)]
    
    setCurrentCategory(randomCategory)
    setCurrentWord(randomWord)
    setTimeLeft(gameConfig[difficulty].timeLimit)
    setIsPlaying(true)
    setWordReveal(false)
    
    // Seleccionar jugador aleatorio del equipo actual
    if (currentTeam) {
      const randomPlayer = currentTeam.players[Math.floor(Math.random() * currentTeam.players.length)]
      setCurrentGuesser(randomPlayer)
    }
    
    playSound('tick')
  }, [currentTeam, difficulty, isBolivian, playSound])

  const handleCorrectGuess = useCallback(() => {
    if (!currentWord || !currentTeam) return
    
    playSound('success')
    setShowConfetti(true)
    setScoreAnimation(true)
    
    // Actualizar puntuación del equipo
    const updatedTeams = teams.map(team => {
      if (team.name === currentTeam.name) {
        const newScore = team.score + currentWord.points
        const newStreak = team.streak + 1
        const newBestStreak = Math.max(team.bestStreak, newStreak)
        
        return {
          ...team,
          score: newScore,
          streak: newStreak,
          bestStreak: newBestStreak,
          totalWords: team.totalWords + 1,
          accuracy: ((team.totalWords + 1) / (team.totalWords + 1)) * 100
        }
      }
      return team
    })
    
    setTeams(updatedTeams)
    setWordsGuessed(prev => prev + 1)
    setStreak(prev => prev + 1)
    setBestStreak(prev => Math.max(prev, streak + 1))
    
    // Efectos visuales
    setTimeout(() => {
      setShowConfetti(false)
      setScoreAnimation(false)
    }, 2000)
    
    // Siguiente turno
    setTimeout(() => {
      if (gamePhase === 'team1') {
        setGamePhase('team2')
        setCurrentTeam(teams[1])
      } else {
        setGamePhase('team1')
        setCurrentTeam(teams[0])
      }
      startTurn()
    }, 1500)
  }, [currentWord, currentTeam, teams, gamePhase, streak, playSound])

  const handleSkip = useCallback(() => {
    if (!currentWord) return
    
    playSound('skip')
    setWordsSkipped(prev => prev + 1)
    
    // Penalización por saltar
    if (currentTeam) {
      const updatedTeams = teams.map(team => {
        if (team.name === currentTeam.name) {
          return {
            ...team,
            streak: 0,
            accuracy: (team.totalWords / (team.totalWords + 1)) * 100
          }
        }
        return team
      })
      setTeams(updatedTeams)
    }
    
    setStreak(0)
    
    // Siguiente palabra
    setTimeout(() => {
      startTurn()
    }, 1000)
  }, [currentWord, currentTeam, teams, playSound])

  const handleTimeOut = useCallback(() => {
    setIsPlaying(false)
    setWordReveal(true)
    
    // Penalización por tiempo
    if (currentTeam) {
      const updatedTeams = teams.map(team => {
        if (team.name === currentTeam.name) {
          return {
            ...team,
            streak: 0,
            accuracy: (team.totalWords / (team.totalWords + 1)) * 100
          }
        }
        return team
      })
      setTeams(updatedTeams)
    }
    
    setStreak(0)
    
    // Siguiente turno después de mostrar la palabra
    setTimeout(() => {
      if (gamePhase === 'team1') {
        setGamePhase('team2')
        setCurrentTeam(teams[1])
      } else {
        setGamePhase('team1')
        setCurrentTeam(teams[0])
      }
      startTurn()
    }, 3000)
  }, [currentTeam, teams, gamePhase])

  const getRandomTip = useCallback(() => {
    if (!currentWord) return ''
    const hints = currentWord.hints
    return hints[Math.floor(Math.random() * hints.length)]
  }, [currentWord])

  const showTip = useCallback(() => {
    if (!currentWord) return
    const tip = getRandomTip()
    setCurrentTip(tip)
    setShowTips(true)
    
    setTimeout(() => {
      setShowTips(false)
    }, 3000)
  }, [currentWord, getRandomTip])

  const pauseGame = useCallback(() => {
    setIsPlaying(false)
    setGamePhase('pause')
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  const resumeGame = useCallback(() => {
    setIsPlaying(true)
    setGamePhase(gamePhase === 'team1' ? 'team1' : 'team2')
  }, [gamePhase])

  const endGame = useCallback(() => {
    setIsPlaying(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    // Calcular estadísticas finales
    const totalScore = teams.reduce((sum, team) => sum + team.score, 0)
    const bestScore = Math.max(...teams.map(team => team.score))
    const perfectRounds = teams.filter(team => team.accuracy === 100).length
    
    setGameStats({
      totalRounds: teams.reduce((sum, team) => sum + team.totalWords, 0),
      averageScore: totalScore / teams.length,
      bestRound: bestScore,
      totalPlayTime: 0, // Implementar si es necesario
      perfectRounds
    })
    
    setGamePhase('results')
  }, [teams])

  // Componentes de UI
  const TimerDisplay = () => (
    <motion.div 
      className={`relative text-6xl font-bold text-center ${
        timeLeft <= 10 ? 'text-red-500' : timeLeft <= 30 ? 'text-yellow-500' : 'text-white'
      }`}
      animate={timerPulse ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
    >
      <Clock className="absolute -top-2 -left-2 w-8 h-8 text-white/50" />
      {timeLeft}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-red-500 rounded-full"
        style={{ width: `${(timeLeft / gameConfig[difficulty].timeLimit) * 100}%` }}
        initial={{ width: '100%' }}
        animate={{ width: `${(timeLeft / gameConfig[difficulty].timeLimit) * 100}%` }}
        transition={{ duration: 1, ease: 'linear' }}
      />
    </motion.div>
  )

  const WordDisplay = () => (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-sm text-white/70 mb-2">
        {currentCategory} • {difficulty.toUpperCase()} • {currentWord?.points} pts
      </div>
      <motion.div 
        className="text-4xl md:text-6xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
        animate={wordReveal ? { rotateY: 180 } : {}}
        transition={{ duration: 0.8 }}
      >
        {wordReveal ? currentWord?.text : '???'}
      </motion.div>
    </motion.div>
  )

  const TeamInfo = () => (
    <div className="text-center mb-6">
      <div className="text-2xl font-bold text-white mb-2">
        {currentTeam?.name}
      </div>
      <div className="text-white/70">
        Jugadores: {currentTeam?.players.join(', ')}
      </div>
      <div className="text-lg text-white/80 mt-2">
        Puntuación: {currentTeam?.score} • Racha: {currentTeam?.streak}
      </div>
    </div>
  )

  const ActionButtons = () => (
    <div className="flex justify-center gap-4 mb-6">
      <motion.button
        onClick={handleCorrectGuess}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2"
      >
        <Check className="w-6 h-6" />
        ¡Correcto!
      </motion.button>
      
      <motion.button
        onClick={handleSkip}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2"
      >
        <SkipForward className="w-6 h-6" />
        Saltar
      </motion.button>
      
      <motion.button
        onClick={showTip}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2"
      >
        <Lightbulb className="w-6 h-6" />
        Pista
      </motion.button>
    </div>
  )

  const SettingsPanel = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">⚙️ Configuración</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-white">Sonidos</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-white/20"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white">Música</span>
            <button
              onClick={() => setMusicEnabled(!musicEnabled)}
              className="p-2 rounded-lg bg-white/20"
            >
              {musicEnabled ? <Music className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
            </button>
          </div>
          
          <div className="space-y-2">
            <span className="text-white">Dificultad</span>
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    difficulty === diff
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/20 text-white/70 hover:bg-white/30'
                  }`}
                >
                  {diff === 'easy' ? 'Fácil' : diff === 'medium' ? 'Medio' : 'Difícil'}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowSettings(false)}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )

  // Renderizado principal
  if (gamePhase === 'setup') {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            🎭 Charadas de Fiesta
          </motion.h1>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Configuración del Juego</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white mb-2">👥 Jugadores ({players.length})</h3>
                <div className="space-y-2">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                      <Users className="w-5 h-5 text-white/70" />
                      <span className="text-white">{player}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white mb-2">⚙️ Configuración</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Dificultad:</span>
                    <select 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                      className="bg-white/20 text-white px-3 py-2 rounded-lg border border-white/20"
                    >
                      <option value="easy">Fácil</option>
                      <option value="medium">Medio</option>
                      <option value="hard">Difícil</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white">Tiempo por palabra:</span>
                    <span className="text-white font-bold">{gameConfig[difficulty].timeLimit}s</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white">Puntos por palabra:</span>
                    <span className="text-white font-bold">{gameConfig[difficulty].points}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-blue-600 transition-all"
            >
              <Play className="w-6 h-6 inline mr-2" />
              ¡Empezar Juego!
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (gamePhase === 'pause') {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div 
            className="text-8xl mb-8"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⏸️
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Juego Pausado</h1>
          <div className="space-x-4">
            <motion.button
              onClick={resumeGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold"
            >
              Continuar
            </motion.button>
            <motion.button
              onClick={endGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold"
            >
              Terminar
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (gamePhase === 'results') {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            🏆 Resultados Finales
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {teams.map((team, index) => (
              <motion.div 
                key={team.name}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl mb-4">{index === 0 ? '🥇' : '🥈'}</div>
                <h2 className="text-2xl font-bold text-white mb-2">{team.name}</h2>
                <div className="text-4xl font-bold text-white mb-4">{team.score}</div>
                <div className="space-y-2 text-white/80">
                  <div>Racha máxima: {team.bestStreak}</div>
                  <div>Palabras adivinadas: {team.totalWords}</div>
                  <div>Precisión: {team.accuracy.toFixed(1)}%</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-blue-600 transition-all"
          >
            <Trophy className="w-6 h-6 inline mr-2" />
            ¡Jugar de Nuevo!
          </motion.button>
        </div>
      </motion.div>
    )
  }

  // Pantalla principal del juego
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header con controles */}
      <div className="flex justify-between items-center mb-8">
        <motion.button
          onClick={pauseGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all"
        >
          <Pause className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          onClick={() => setShowSettings(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all"
        >
          <Settings className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Información del equipo */}
      <TeamInfo />

      {/* Timer principal */}
      <div className="text-center mb-8">
        <TimerDisplay />
      </div>

      {/* Palabra actual */}
      <WordDisplay />

      {/* Botones de acción */}
      <ActionButtons />

      {/* Estadísticas del turno */}
      <div className="text-center text-white/70">
        <div className="flex justify-center gap-8 text-sm">
          <div>Palabras adivinadas: {wordsGuessed}</div>
          <div>Palabras saltadas: {wordsSkipped}</div>
          <div>Racha actual: {streak}</div>
        </div>
      </div>

      {/* Panel de configuración */}
      <AnimatePresence>
        {showSettings && <SettingsPanel />}
      </AnimatePresence>

      {/* Efectos visuales */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-lg"
          >
            💡 Pista: {currentTip}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efectos de confeti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
              🎉
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CharadesGame
