import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Beer, 
  Wine, 
  Target, 
  Award, 
  Calendar,
  Activity,
  PieChart,
  LineChart,
  Download,
  Share2,
  RefreshCw,
  Filter,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Star,
  Crown,
  Trophy,
  Medal,
  Zap,
  Flame,
  Heart,
  Brain,
  Gamepad2,
  Mic,
  Camera,
  Music
} from 'lucide-react'

interface GameSession {
  id: string
  date: Date
  players: string[]
  totalDrinks: number
  totalGames: number
  duration: number
  mode: string
  skippedCards: number
  achievements: string[]
}

interface PlayerStats {
  name: string
  totalDrinks: number
  gamesPlayed: number
  favoriteMode: string
  averageDrinksPerGame: number
  achievements: number
  lastPlayed: Date
  streak: number
}

interface AdvancedStatsProps {
  sessions: GameSession[]
  players: PlayerStats[]
  showDetailed: boolean
  onExport: () => void
  onShare: () => void
}

const AdvancedStats: React.FC<AdvancedStatsProps> = ({
  sessions,
  players,
  showDetailed,
  onExport,
  onShare
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year' | 'all'>('month')
  const [selectedView, setSelectedView] = useState<'overview' | 'players' | 'sessions' | 'trends'>('overview')
  const [showFilters, setShowFilters] = useState(false)

  // Calcular estadísticas generales
  const totalSessions = sessions.length
  const totalDrinks = sessions.reduce((sum, session) => sum + session.totalDrinks, 0)
  const totalGames = sessions.reduce((sum, session) => sum + session.totalGames, 0)
  const averageSessionDuration = sessions.length > 0 
    ? sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length 
    : 0

  // Estadísticas por jugador
  const topDrinker = players.reduce((max, player) => 
    player.totalDrinks > max.totalDrinks ? player : max, players[0] || { totalDrinks: 0, name: 'N/A' })

  const mostActivePlayer = players.reduce((max, player) => 
    player.gamesPlayed > max.gamesPlayed ? player : max, players[0] || { gamesPlayed: 0, name: 'N/A' })

  // Estadísticas por modo
  const modeStats = sessions.reduce((acc, session) => {
    acc[session.mode] = (acc[session.mode] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const favoriteMode = Object.entries(modeStats).reduce((max, [mode, count]) => 
    count > max.count ? { mode, count } : max, { mode: 'N/A', count: 0 })

  // Estadísticas de tiempo
  const getSessionsByTimeframe = (timeframe: string) => {
    const now = new Date()
    const cutoff = new Date()
    
    switch (timeframe) {
      case 'week':
        cutoff.setDate(now.getDate() - 7)
        break
      case 'month':
        cutoff.setMonth(now.getMonth() - 1)
        break
      case 'year':
        cutoff.setFullYear(now.getFullYear() - 1)
        break
      default:
        return sessions
    }
    
    return sessions.filter(session => session.date >= cutoff)
  }

  const filteredSessions = getSessionsByTimeframe(selectedTimeframe)

  // Gráfico de actividad por día
  const getActivityByDay = () => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const activity = new Array(7).fill(0)
    
    filteredSessions.forEach(session => {
      const dayOfWeek = session.date.getDay()
      activity[dayOfWeek]++
    })
    
    return days.map((day, index) => ({ day, count: activity[index] }))
  }

  const activityData = getActivityByDay()

  // Gráfico de bebidas por hora
  const getDrinksByHour = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const drinksByHour = new Array(24).fill(0)
    
    filteredSessions.forEach(session => {
      const hour = session.date.getHours()
      drinksByHour[hour] += session.totalDrinks
    })
    
    return hours.map(hour => ({ hour, drinks: drinksByHour[hour] }))
  }

  const drinksByHourData = getDrinksByHour()

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Estadísticas Avanzadas
          </h2>
          <p className="text-white/80">
            Análisis detallado de tus sesiones de juego
          </p>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            onClick={onExport}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Exportar
          </motion.button>
          
          <motion.button
            onClick={onShare}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-4 h-4" />
            Compartir
          </motion.button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4 mb-6">
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value as any)}
          className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2"
        >
          <option value="week">Última Semana</option>
          <option value="month">Último Mes</option>
          <option value="year">Último Año</option>
          <option value="all">Todo el Tiempo</option>
        </select>

        <select
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value as any)}
          className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2"
        >
          <option value="overview">Vista General</option>
          <option value="players">Jugadores</option>
          <option value="sessions">Sesiones</option>
          <option value="trends">Tendencias</option>
        </select>

        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Filter className="w-4 h-4" />
          Filtros
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Vista General */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{totalSessions}</h3>
                  <p className="text-white/60 text-sm">Sesiones</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Beer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{totalDrinks}</h3>
                  <p className="text-white/60 text-sm">Tragos Totales</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{players.length}</h3>
                  <p className="text-white/60 text-sm">Jugadores</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{formatDuration(averageSessionDuration)}</h3>
                  <p className="text-white/60 text-sm">Promedio Sesión</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Actividad por día */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Actividad por Día</h3>
              <div className="flex items-end justify-between h-32 gap-2">
                {activityData.map((data, index) => (
                  <div key={data.day} className="flex-1 flex flex-col items-center">
                    <motion.div
                      className="bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg w-full"
                      style={{ height: `${(data.count / Math.max(...activityData.map(d => d.count))) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.count / Math.max(...activityData.map(d => d.count))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <span className="text-white/60 text-xs mt-2">{data.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tragos por hora */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Tragos por Hora</h3>
              <div className="flex items-end justify-between h-32 gap-1">
                {drinksByHourData.map((data, index) => (
                  <div key={data.hour} className="flex-1 flex flex-col items-center">
                    <motion.div
                      className="bg-gradient-to-t from-green-500 to-emerald-500 rounded-t-lg w-full"
                      style={{ height: `${(data.drinks / Math.max(...drinksByHourData.map(d => d.drinks))) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.drinks / Math.max(...drinksByHourData.map(d => d.drinks))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.02 }}
                    />
                    <span className="text-white/60 text-xs mt-2">{data.hour}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Top Bebedor
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{topDrinker.name}</div>
                <div className="text-white/60">{topDrinker.totalDrinks} tragos</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-400" />
                Más Activo
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{mostActivePlayer.name}</div>
                <div className="text-white/60">{mostActivePlayer.gamesPlayed} juegos</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-purple-400" />
                Modo Favorito
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{favoriteMode.mode}</div>
                <div className="text-white/60">{favoriteMode.count} sesiones</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vista de Jugadores */}
      {selectedView === 'players' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {players.map((player, index) => (
              <motion.div
                key={player.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{player.name}</h3>
                      <p className="text-white/60 text-sm">
                        {player.gamesPlayed} juegos • {player.totalDrinks} tragos
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold">
                      {player.averageDrinksPerGame.toFixed(1)} trago/juego
                    </div>
                    <div className="text-white/60 text-sm">
                      Último: {formatDate(player.lastPlayed)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-white/80">
                    <Beer className="w-4 h-4" />
                    <span>{player.totalDrinks} tragos totales</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Gamepad2 className="w-4 h-4" />
                    <span>{player.gamesPlayed} juegos</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Award className="w-4 h-4" />
                    <span>{player.achievements} logros</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Flame className="w-4 h-4" />
                    <span>{player.streak} días seguidos</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Vista de Sesiones */}
      {selectedView === 'sessions' && (
        <div className="space-y-4">
          {filteredSessions.map((session, index) => (
            <motion.div
              key={session.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Sesión #{session.id.slice(-4)}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {formatDate(session.date)} • {session.players.length} jugadores
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-bold text-lg">
                    {session.totalDrinks} tragos
                  </div>
                  <div className="text-white/60 text-sm">
                    {formatDuration(session.duration)}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/80">
                  <Gamepad2 className="w-4 h-4" />
                  <span>{session.totalGames} juegos</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Target className="w-4 h-4" />
                  <span>{session.mode}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Eye className="w-4 h-4" />
                  <span>{session.skippedCards} saltadas</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="w-4 h-4" />
                  <span>{session.achievements.length} logros</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Vista de Tendencias */}
      {selectedView === 'trends' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Evolución de Tragos</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {filteredSessions.slice(-10).map((session, index) => (
                  <div key={session.id} className="flex-1 flex flex-col items-center">
                    <motion.div
                      className="bg-gradient-to-t from-green-500 to-emerald-500 rounded-t-lg w-full"
                      style={{ height: `${(session.totalDrinks / Math.max(...filteredSessions.map(s => s.totalDrinks))) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(session.totalDrinks / Math.max(...filteredSessions.map(s => s.totalDrinks))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <span className="text-white/60 text-xs mt-2">#{session.id.slice(-2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Duración de Sesiones</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {filteredSessions.slice(-10).map((session, index) => (
                  <div key={session.id} className="flex-1 flex flex-col items-center">
                    <motion.div
                      className="bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg w-full"
                      style={{ height: `${(session.duration / Math.max(...filteredSessions.map(s => s.duration))) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(session.duration / Math.max(...filteredSessions.map(s => s.duration))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <span className="text-white/60 text-xs mt-2">#{session.id.slice(-2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedStats
