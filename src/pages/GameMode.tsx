import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Users, 
  Plus, 
  X, 
  Play, 
  ArrowLeft,
  User,
  Settings,
  Info
} from 'lucide-react'
import { gameModes, gameTypes } from '../data/gameData'
import { useGameStore } from '../stores/gameStore'
import toast from 'react-hot-toast'

const GameMode = () => {
  const { mode } = useParams()
  const navigate = useNavigate()
  const { addPlayer, removePlayer, players, startGame } = useGameStore()
  const [newPlayerName, setNewPlayerName] = useState('')
  const [selectedGame, setSelectedGame] = useState('')

  const currentMode = gameModes.find(m => m.id === mode)

  useEffect(() => {
    if (!currentMode) {
      navigate('/')
      return
    }
  }, [currentMode, navigate])

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      toast.error('Por favor ingresa un nombre')
      return
    }

    if (players.length >= currentMode?.maxPlayers!) {
      toast.error(`Máximo ${currentMode?.maxPlayers} jugadores`)
      return
    }

    if (players.some(p => p.name.toLowerCase() === newPlayerName.toLowerCase())) {
      toast.error('Ya existe un jugador con ese nombre')
      return
    }

    addPlayer(newPlayerName.trim())
    setNewPlayerName('')
    toast.success('Jugador agregado')
  }

  const handleStartGame = () => {
    if (players.length < currentMode?.minPlayers!) {
      toast.error(`Mínimo ${currentMode?.minPlayers} jugadores`)
      return
    }

    if (!selectedGame) {
      toast.error('Por favor selecciona un juego')
      return
    }

    startGame(selectedGame, mode!)
    navigate(`/play/${selectedGame}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer()
    }
  }

  if (!currentMode) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{currentMode.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{currentMode.description}</p>
        </div>

        <div className="w-20"></div> {/* Spacer */}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Players Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Users size={24} />
              <span>Jugadores</span>
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {players.length}/{currentMode.maxPlayers}
            </span>
          </div>

          {/* Add Player */}
          <div className="flex space-x-2 mb-6">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre del jugador"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              maxLength={20}
            />
            <button
              onClick={handleAddPlayer}
              disabled={players.length >= currentMode.maxPlayers}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Agregar</span>
            </button>
          </div>

          {/* Players List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {players.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-medium">{player.name}</span>
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
            
            {players.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>No hay jugadores agregados</p>
                <p className="text-sm">Mínimo {currentMode.minPlayers} jugadores</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Game Selection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Play size={24} />
              <span>Seleccionar Juego</span>
            </h2>
          </div>

          <div className="space-y-3">
            {gameTypes.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedGame(game.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedGame === game.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{game.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{game.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {game.description}
                    </p>
                  </div>
                  {selectedGame === game.id && (
                    <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Game Info */}
          {selectedGame && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Info size={20} className="text-blue-500" />
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">
                  Reglas del Juego
                </h3>
              </div>
              <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
                {gameTypes.find(g => g.id === selectedGame)?.rules.slice(0, 3).map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Start Game Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <button
          onClick={handleStartGame}
          disabled={players.length < currentMode.minPlayers || !selectedGame}
          className="btn-primary text-lg px-8 py-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Play size={24} className="mr-2" />
          ¡Empezar Juego!
        </button>
        
        {players.length < currentMode.minPlayers && (
          <p className="text-red-500 mt-2">
            Necesitas al menos {currentMode.minPlayers} jugadores
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default GameMode
