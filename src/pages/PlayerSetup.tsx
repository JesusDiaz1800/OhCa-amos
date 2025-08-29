import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Plus, X, Users, Shuffle, Play, User } from 'lucide-react'

const PlayerSetup: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'classic'
  
  const [players, setPlayers] = useState<string[]>(['', ''])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Limpiar nombres vacíos al cargar
    setPlayers(players.filter(name => name.trim() !== ''))
  }, [])

  const addPlayer = () => {
    if (newPlayerName.trim() && !players.includes(newPlayerName.trim())) {
      setPlayers([...players, newPlayerName.trim()])
      setNewPlayerName('')
      setError('')
    } else if (players.includes(newPlayerName.trim())) {
      setError('Este jugador ya existe')
    }
  }

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index))
    }
  }

  const updatePlayer = (index: number, name: string) => {
    const updatedPlayers = [...players]
    updatedPlayers[index] = name
    setPlayers(updatedPlayers)
  }

  const shufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5)
    setPlayers(shuffled)
  }

  const handleStart = () => {
    const validPlayers = players.filter(name => name.trim() !== '')
    if (validPlayers.length < 2) {
      setError('Necesitas al menos 2 jugadores para empezar')
      return
    }
    
    const playersParam = validPlayers.join(',')
    navigate(`/game-sub-mode-selector?mode=${mode}&players=${playersParam}`)
  }

  const handleBack = () => {
    navigate('/mode-selector')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
          <span className="text-lg font-semibold">Volver</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Configura tu Grupo
          </h1>
          <p className="text-white/80">
            ¿Quiénes van a la fiesta?
          </p>
        </div>

        <div className="w-24"></div> {/* Espaciador */}
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Modo seleccionado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm mb-1">Modo seleccionado</div>
            <div className="text-white font-semibold text-lg">
              {mode === 'bolivia' ? '🇧🇴 Modo Bolivia' : '🎮 Modo Clásico'}
            </div>
          </div>
        </motion.div>

        {/* Agregar jugador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={24} />
              Agregar Jugador
            </h2>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nombre del jugador..."
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              />
              <button
                onClick={addPlayer}
                disabled={!newPlayerName.trim()}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-lg hover:from-yellow-300 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Plus size={20} />
              </button>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-sm mt-2"
              >
                {error}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Lista de jugadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users size={24} />
                Jugadores ({players.filter(p => p.trim()).length})
              </h2>
              {players.filter(p => p.trim()).length > 2 && (
                <button
                  onClick={shufflePlayers}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <Shuffle size={16} />
                  Mezclar
                </button>
              )}
            </div>

            <AnimatePresence>
              {players.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => updatePlayer(index, e.target.value)}
                    placeholder={`Jugador ${index + 1}...`}
                    className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  />
                  {players.length > 2 && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                    >
                      <X size={16} />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {players.filter(p => p.trim()).length < 2 && (
              <div className="text-yellow-300 text-sm mt-3 flex items-center gap-2">
                <User size={16} />
                Necesitas al menos 2 jugadores para empezar
              </div>
            )}
          </div>
        </motion.div>

        {/* Botón de inicio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={handleStart}
            disabled={players.filter(p => p.trim()).length < 2}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl hover:from-green-300 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Play size={24} />
            ¡Empezar la Fiesta!
          </button>
        </motion.div>

        {/* Mensaje de consumo responsable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-white/70 text-sm max-w-md mx-auto">
            🍺 La diversión es mejor cuando se disfruta con responsabilidad
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PlayerSetup
