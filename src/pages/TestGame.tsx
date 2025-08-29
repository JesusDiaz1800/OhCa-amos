import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, ArrowLeft, Users, Gamepad2 } from 'lucide-react'

const TestGame: React.FC = () => {
  const navigate = useNavigate()

  const testScenarios = [
    {
      title: 'Prueba Clásico - Previa',
      description: 'Modo clásico con sub-mode previa',
      url: '/game-engine?mode=classic&subMode=previa&players=Juan,Maria,Pedro,Ana'
    },
    {
      title: 'Prueba Bolivia - Fiesta',
      description: 'Modo Bolivia con sub-mode fiesta',
      url: '/game-engine?mode=bolivia&subMode=fiesta&players=Carlos,Lucia,Rodrigo,Sofia'
    },
    {
      title: 'Prueba Clásico - Hot',
      description: 'Modo clásico con sub-mode hot',
      url: '/game-engine?mode=classic&subMode=hot&players=Diego,Valeria,Miguel,Carmen'
    },
    {
      title: 'Prueba Bolivia - Trivia',
      description: 'Modo Bolivia con sub-mode trivia',
      url: '/game-engine?mode=bolivia&subMode=trivia&players=Roberto,Patricia,Andres,Monica'
    }
  ]

  const handleTest = (url: string) => {
    navigate(url)
  }

  const handleBack = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-yellow-600 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-200"
          >
            <ArrowLeft size={24} />
            <span className="text-lg font-semibold">Volver</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              🧪 Página de Pruebas
            </h1>
            <p className="text-white/80">
              Prueba el flujo completo del GameEngine
            </p>
          </div>
          
          <div className="w-24"></div>
        </div>

        {/* Test Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testScenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {scenario.description}
                  </p>
                </div>
                <Gamepad2 size={24} className="text-yellow-400" />
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Users size={16} />
                  <span>4 jugadores predefinidos</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Play size={16} />
                  <span>10 rondas automáticas</span>
                </div>
              </div>
              
              <button
                onClick={() => handleTest(scenario.url)}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-green-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Probar Escenario
              </button>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            📋 Instrucciones de Prueba
          </h3>
          <div className="space-y-3 text-white/80">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">1.</span>
              <span>Selecciona un escenario de prueba para iniciar el GameEngine</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">2.</span>
              <span>El sistema generará automáticamente 10 rondas de juegos aleatorios</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">3.</span>
              <span>Los juegos se mostrarán uno por uno con transiciones fluidas</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">4.</span>
              <span>Verifica que cada componente de juego funcione correctamente</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">5.</span>
              <span>Al finalizar, podrás volver a esta página para probar otros escenarios</span>
            </div>
          </div>
        </motion.div>

        {/* Game Components Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            🎮 Componentes de Juego Integrados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="font-semibold">BombaGame</span>
                <span className="text-white/60">- Bomba explosiva</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="font-semibold">BottleGame</span>
                <span className="text-white/60">- Botella giratoria</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="font-semibold">RouletteGame</span>
                <span className="text-white/60">- Ruleta mágica</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                <span className="font-semibold">CulturaChupisticaGame</span>
                <span className="text-white/60">- Preguntas y retos</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TestGame
