import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Play, 
  Users, 
  Trophy, 
  Sparkles, 
  Globe, 
  Heart,
  ArrowRight,
  Star,
  Zap,
  Crown,
  Gamepad2,
  Flame,
  Beer,
  Wine,
  Target,
  Brain,
  Music,
  Camera,
  Flag,
  MapPin,
  PartyPopper,
  GamepadIcon
} from 'lucide-react'
import { gameModes, gameTypes } from '../data/gameData'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-15 animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="text-8xl md:text-9xl mb-4 animate-bounce-slow">🍺</div>
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                ¡Oh Cañamos?
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-2xl md:text-3xl text-white/90 mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La app #1 para la fiesta más{' '}
            <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">divertida y viral</span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/mode-selector">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-xl px-10 py-5 flex items-center space-x-3 shadow-2xl hover:shadow-3xl"
              >
                <Play size={28} />
                <span>¡Empezar a Jugar!</span>
                <ArrowRight size={24} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Game Modes Section */}
      <section className="py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Elige tu Modo de Fiesta</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Dos experiencias únicas para hacer de tu noche algo inolvidable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Modo Clásico */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 border-2 border-blue-400/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-3xl font-bold mb-3 text-white">Modo Clásico</h3>
                  <p className="text-lg text-white/80">Experiencia Universal</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 text-white/90">
                    <Star size={20} className="text-blue-400" />
                    <span>Juegos universales y divertidos</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <Zap size={20} className="text-blue-400" />
                    <span>Retos para todos los gustos</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <Trophy size={20} className="text-blue-400" />
                    <span>Experiencia probada y confiable</span>
                  </div>
                </div>

                <Link to="/mode-selector?mode=classic">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-2xl text-white font-bold py-4 px-6 rounded-2xl text-center transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Gamepad2 size={24} />
                      <span>¡Empezar Clásico!</span>
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Modo Bolivia */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-900 via-orange-800 to-red-900 rounded-3xl p-8 border-2 border-yellow-400/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🇧🇴</div>
                  <h3 className="text-3xl font-bold mb-3 text-white">Modo Bolivia</h3>
                  <p className="text-lg text-white/80">Sabor Local Auténtico</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 text-white/90">
                    <Flag size={20} className="text-yellow-400" />
                    <span>Modismos y referencias bolivianas</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <Heart size={20} className="text-yellow-400" />
                    <span>Humor criollo y local</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <MapPin size={20} className="text-yellow-400" />
                    <span>Experiencia cultural única</span>
                  </div>
                </div>

                <Link to="/mode-selector?mode=bolivia">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-2xl text-white font-bold py-4 px-6 rounded-2xl text-center transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Flag size={24} />
                      <span>¡Empezar Bolivia!</span>
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Características Principales</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Todo lo que necesitas para la mejor fiesta de tu vida
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-6 border border-purple-400/30">
                <div className="text-4xl mb-4">🎲</div>
                <h3 className="text-xl font-bold mb-3 text-white">Juegos Aleatorios</h3>
                <p className="text-white/80">
                  Cada partida es única con selección aleatoria de juegos y turnos dinámicos
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl p-6 border border-blue-400/30">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-white">Turnos Dinámicos</h3>
                <p className="text-white/80">
                  Los jugadores se seleccionan aleatoriamente para mantener la emoción
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl p-6 border border-green-400/30">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-white">Retos Variados</h3>
                <p className="text-white/80">
                  Desde preguntas suaves hasta retos intensos para todos los niveles
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Games Preview Section */}
      <section className="py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Juegos Disponibles</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Una colección completa de juegos para hacer tu fiesta inolvidable
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameTypes.slice(0, 6).map((gameType, index) => (
              <motion.div
                key={gameType.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
              >
                <div className="text-3xl mb-2">{gameType.icon}</div>
                <h3 className="font-semibold text-white text-sm">{gameType.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-3xl p-12 border-2 border-purple-400/30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">¿Listo para la Fiesta?</span>
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Únete a miles de personas que ya han hecho de sus noches algo extraordinario
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mode-selector">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-xl px-10 py-5 flex items-center space-x-3 shadow-2xl hover:shadow-3xl"
                >
                  <PartyPopper size={28} />
                  <span>¡Empezar Ahora!</span>
                  <ArrowRight size={24} />
                </motion.button>
              </Link>
              
              <Link to="/test">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg px-8 py-5 rounded-2xl flex items-center space-x-3 shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <span className="text-2xl">🧪</span>
                  <span>Probar Sistema</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Consumption Warning */}
      <section className="py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-white/70 text-lg">
              🍺 <strong>Consumo Responsable:</strong> La diversión es mejor cuando se disfruta con moderación
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
