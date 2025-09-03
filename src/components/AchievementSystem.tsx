import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Heart, 
  Crown, 
  Target, 
  Zap, 
  Flame, 
  Diamond,
  Award,
  Medal,
  Gift,
  Rocket,
  Users,
  Gamepad2,
  PartyPopper,
  Sparkles,
  X,
  Share2,
  Download,
  Eye
} from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: 'game' | 'social' | 'special' | 'milestone'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
  points: number
}

interface PlayerStats {
  totalGames: number
  gamesWon: number
  gamesLost: number
  totalPoints: number
  currentStreak: number
  bestStreak: number
  achievementsUnlocked: number
  totalAchievements: number
  level: number
  experience: number
  experienceToNextLevel: number
}

const AchievementSystem: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    totalGames: 0,
    gamesWon: 0,
    gamesLost: 0,
    totalPoints: 0,
    currentStreak: 0,
    bestStreak: 0,
    achievementsUnlocked: 0,
    totalAchievements: 0,
    level: 1,
    experience: 0,
    experienceToNextLevel: 100
  })
  const [showAchievements, setShowAchievements] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'game' | 'social' | 'special' | 'milestone'>('all')

  useEffect(() => {
    initializeAchievements()
    loadPlayerStats()
  }, [])

  const initializeAchievements = () => {
    const initialAchievements: Achievement[] = [
      // Logros de Juego
      {
        id: 'first-game',
        name: 'Primer Juego',
        description: 'Juega tu primera partida',
        icon: <Gamepad2 className="w-6 h-6" />,
        category: 'game',
        rarity: 'common',
        unlocked: false,
        points: 10
      },
      {
        id: 'first-win',
        name: 'Primera Victoria',
        description: 'Gana tu primera partida',
        icon: <Trophy className="w-6 h-6" />,
        category: 'game',
        rarity: 'common',
        unlocked: false,
        points: 25
      },
      {
        id: 'winning-streak-3',
        name: 'Racha Ganadora',
        description: 'Gana 3 partidas seguidas',
        icon: <Flame className="w-6 h-6" />,
        category: 'game',
        rarity: 'rare',
        unlocked: false,
        progress: 0,
        maxProgress: 3,
        points: 50
      },
      {
        id: 'winning-streak-10',
        name: 'Invencible',
        description: 'Gana 10 partidas seguidas',
        icon: <Crown className="w-6 h-6" />,
        category: 'game',
        rarity: 'epic',
        unlocked: false,
        progress: 0,
        maxProgress: 10,
        points: 100
      },
      {
        id: 'game-master',
        name: 'Maestro del Juego',
        description: 'Juega 50 partidas',
        icon: <Star className="w-6 h-6" />,
        category: 'game',
        rarity: 'rare',
        unlocked: false,
        progress: 0,
        maxProgress: 50,
        points: 75
      },

      // Logros Sociales
      {
        id: 'social-butterfly',
        name: 'Mariposa Social',
        description: 'Juega con 5 jugadores diferentes',
        icon: <Users className="w-6 h-6" />,
        category: 'social',
        rarity: 'common',
        unlocked: false,
        progress: 0,
        maxProgress: 5,
        points: 30
      },
      {
        id: 'party-animal',
        name: 'Animal de Fiesta',
        description: 'Juega en 10 fiestas diferentes',
        icon: <PartyPopper className="w-6 h-6" />,
        category: 'social',
        rarity: 'rare',
        unlocked: false,
        progress: 0,
        maxProgress: 10,
        points: 60
      },

      // Logros Especiales
      {
        id: 'bolivia-expert',
        name: 'Experto Boliviano',
        description: 'Juega 20 partidas en modo Bolivia',
        icon: <Target className="w-6 h-6" />,
        category: 'special',
        rarity: 'epic',
        unlocked: false,
        progress: 0,
        maxProgress: 20,
        points: 150
      },
      {
        id: 'charades-master',
        name: 'Maestro de Charadas',
        description: 'Adivina 50 palabras en Charadas',
        icon: <Sparkles className="w-6 h-6" />,
        category: 'special',
        rarity: 'epic',
        unlocked: false,
        progress: 0,
        maxProgress: 50,
        points: 200
      },

      // Logros de Hitos
      {
        id: 'level-5',
        name: 'Nivel 5',
        description: 'Alcanza el nivel 5',
        icon: <Rocket className="w-6 h-6" />,
        category: 'milestone',
        rarity: 'common',
        unlocked: false,
        points: 50
      },
      {
        id: 'level-10',
        name: 'Nivel 10',
        description: 'Alcanza el nivel 10',
        icon: <Diamond className="w-6 h-6" />,
        category: 'milestone',
        rarity: 'rare',
        points: 100
      },
      {
        id: 'level-20',
        name: 'Nivel 20',
        description: 'Alcanza el nivel 20',
        icon: <Crown className="w-6 h-6" />,
        category: 'milestone',
        rarity: 'epic',
        points: 250
      },
      {
        id: 'level-50',
        name: 'Leyenda',
        description: 'Alcanza el nivel 50',
        icon: <Award className="w-6 h-6" />,
        category: 'milestone',
        rarity: 'legendary',
        unlocked: false,
        points: 1000
      }
    ]

    setAchievements(initialAchievements)
    setPlayerStats(prev => ({ ...prev, totalAchievements: initialAchievements.length }))
  }

  const loadPlayerStats = () => {
    const savedStats = localStorage.getItem('playerStats')
    if (savedStats) {
      setPlayerStats(JSON.parse(savedStats))
    }
  }

  const savePlayerStats = (stats: PlayerStats) => {
    localStorage.setItem('playerStats', JSON.stringify(stats))
    setPlayerStats(stats)
  }

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId)
    if (achievement && !achievement.unlocked) {
      const updatedAchievements = achievements.map(a => 
        a.id === achievementId 
          ? { ...a, unlocked: true, unlockedAt: new Date() }
          : a
      )
      
      setAchievements(updatedAchievements)
      
      // Actualizar estadísticas
      const newStats = {
        ...playerStats,
        achievementsUnlocked: playerStats.achievementsUnlocked + 1,
        totalPoints: playerStats.totalPoints + achievement.points,
        experience: playerStats.experience + achievement.points
      }

      // Calcular nivel
      let newLevel = newStats.level
      let newExp = newStats.experience
      let expToNext = newStats.experienceToNextLevel

      while (newExp >= expToNext) {
        newExp -= expToNext
        newLevel++
        expToNext = Math.floor(expToNext * 1.5)
      }

      newStats.level = newLevel
      newStats.experience = newExp
      newStats.experienceToNextLevel = expToNext

      savePlayerStats(newStats)

      // Mostrar animación de desbloqueo
      setUnlockedAchievement(achievement)
      setShowUnlockAnimation(true)
      
      // Reproducir sonido de logro
      if (window.playSound) {
        window.playSound('achievement')
      }

      setTimeout(() => {
        setShowUnlockAnimation(false)
        setUnlockedAchievement(null)
      }, 3000)
    }
  }

  const updateProgress = (achievementId: string, progress: number) => {
    const achievement = achievements.find(a => a.id === achievementId)
    if (achievement && achievement.maxProgress) {
      const newProgress = Math.min(progress, achievement.maxProgress)
      const updatedAchievements = achievements.map(a => 
        a.id === achievementId 
          ? { ...a, progress: newProgress }
          : a
      )
      
      setAchievements(updatedAchievements)

      // Verificar si se desbloquea
      if (newProgress >= achievement.maxProgress) {
        unlockAchievement(achievementId)
      }
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-300'
      case 'rare': return 'text-blue-400'
      case 'epic': return 'text-purple-400'
      case 'legendary': return 'text-yellow-400'
      default: return 'text-gray-300'
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20'
      case 'rare': return 'bg-blue-500/20'
      case 'epic': return 'bg-purple-500/20'
      case 'legendary': return 'bg-yellow-500/20'
      default: return 'bg-gray-500/20'
    }
  }

  const shareAchievement = (achievement: Achievement) => {
    if (navigator.share) {
      navigator.share({
        title: `¡Desbloqueé "${achievement.name}" en ¡Oh Cañamos?!`,
        text: `He desbloqueado el logro "${achievement.name}" - ${achievement.description}`,
        url: window.location.href
      })
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(
        `¡Desbloqueé "${achievement.name}" en ¡Oh Cañamos?! - ${achievement.description}`
      )
    }
  }

  const filteredAchievements = achievements.filter(a => 
    selectedCategory === 'all' || a.category === selectedCategory
  )

  return (
    <>
      {/* Botón flotante de logros */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="flex flex-col gap-3">
          <motion.button
            onClick={() => setShowAchievements(!showAchievements)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <Trophy className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => setShowStats(!showStats)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <Target className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Panel de Logros */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowAchievements(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">🏆 Logros y Recompensas</h2>
                <motion.button
                  onClick={() => setShowAchievements(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Filtros de categoría */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['all', 'game', 'social', 'special', 'milestone'] as const).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/20 text-white/80 hover:bg-white/30'
                    }`}
                  >
                    {category === 'all' && 'Todos'}
                    {category === 'game' && 'Juego'}
                    {category === 'social' && 'Social'}
                    {category === 'special' && 'Especiales'}
                    {category === 'milestone' && 'Hitos'}
                  </motion.button>
                ))}
              </div>

              {/* Grid de logros */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30'
                        : 'bg-white/10 border-white/20'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl ${getRarityBg(achievement.rarity)}`}>
                        <div className={getRarityColor(achievement.rarity)}>
                          {achievement.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-bold ${achievement.unlocked ? 'text-green-400' : 'text-white'}`}>
                            {achievement.name}
                          </h3>
                          {achievement.unlocked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-400"
                            >
                              <Trophy className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>
                        
                        <p className="text-white/70 text-sm mb-3">
                          {achievement.description}
                        </p>

                        {/* Barra de progreso */}
                        {achievement.maxProgress && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-white/60 mb-1">
                              <span>Progreso</span>
                              <span>{achievement.progress || 0}/{achievement.maxProgress}</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRarityBg(achievement.rarity)} ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity.toUpperCase()}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-sm font-bold">
                              +{achievement.points} XP
                            </span>
                            
                            {achievement.unlocked && (
                              <motion.button
                                onClick={() => shareAchievement(achievement)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-white/70 hover:text-white transition-colors"
                              >
                                <Share2 className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        </div>

                        {achievement.unlockedAt && (
                          <div className="mt-2 text-xs text-white/50">
                            Desbloqueado: {achievement.unlockedAt.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de Estadísticas */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowStats(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">📊 Estadísticas del Jugador</h2>
                <motion.button
                  onClick={() => setShowStats(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Nivel y XP */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="text-2xl font-bold text-white">Nivel {playerStats.level}</h3>
                  <p className="text-white/70">¡Sigue jugando para subir de nivel!</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>Experiencia</span>
                    <span>{playerStats.experience}/{playerStats.experienceToNextLevel} XP</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(playerStats.experience / playerStats.experienceToNextLevel) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Estadísticas generales */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🎮</div>
                  <div className="text-2xl font-bold text-white">{playerStats.totalGames}</div>
                  <div className="text-white/70 text-sm">Partidas Totales</div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-white">{playerStats.gamesWon}</div>
                  <div className="text-white/70 text-sm">Victorias</div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-2xl font-bold text-white">{playerStats.currentStreak}</div>
                  <div className="text-white/70 text-sm">Racha Actual</div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-white">{playerStats.bestStreak}</div>
                  <div className="text-white/70 text-sm">Mejor Racha</div>
                </div>
              </div>

              {/* Logros */}
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold">🏅 Logros</h3>
                  <span className="text-white/70 text-sm">
                    {playerStats.achievementsUnlocked}/{playerStats.totalAchievements}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(playerStats.achievementsUnlocked / playerStats.totalAchievements) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Botón de compartir */}
              <motion.button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Mis Estadísticas en ¡Oh Cañamos?!',
                      text: `He jugado ${playerStats.totalGames} partidas y alcanzado el nivel ${playerStats.level}!`,
                      url: window.location.href
                    })
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 mt-6"
              >
                <Share2 className="w-5 h-5 inline mr-2" />
                Compartir Estadísticas
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animación de desbloqueo de logro */}
      <AnimatePresence>
        {showUnlockAnimation && unlockedAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -100 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 border-4 border-white/30 shadow-2xl text-center max-w-sm">
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                🎉
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                ¡Logro Desbloqueado!
              </h3>
              
              <div className="text-white/90 mb-4">
                <div className="text-xl font-bold mb-2">{unlockedAchievement.name}</div>
                <div className="text-sm">{unlockedAchievement.description}</div>
              </div>
              
              <div className="text-yellow-200 font-bold">
                +{unlockedAchievement.points} XP
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AchievementSystem
