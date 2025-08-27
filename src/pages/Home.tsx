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
  Cocktail,
  Target,
  Brain,
  Music,
  Camera
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
            <div className="text-8xl md:text-9xl mb-4 animate-bounce-slow">🎉</div>
                           <h1 className="text-6xl md:text-8xl font-bold mb-6">
                 <span className="text-gradient neon-text">
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
            La aplicación de juegos para beber más{' '}
            <span className="font-bold text-yellow-400 animate-pulse neon-yellow">divertida y viral</span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/game-engine">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-xl px-10 py-5 flex items-center space-x-3 shadow-2xl hover:shadow-3xl"
              >
                <Play size={28} />
                <span>¡Empezar a Jugar!</span>
                <Zap size={24} />
                <Sparkles size={20} />
              </motion.button>
            </Link>
            
            <Link to="/bolivia">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-bolivia text-xl px-10 py-5 flex items-center space-x-3 shadow-2xl hover:shadow-3xl"
              >
                <Globe size={28} />
                <span>Modo Bolivia</span>
                <Crown size={24} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center items-center space-x-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold neon-yellow">500+</div>
              <div className="text-sm text-white/70">Preguntas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold neon-pink">12+</div>
              <div className="text-sm text-white/70">Juegos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold neon-purple">∞</div>
              <div className="text-sm text-white/70">Diversión</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="card text-center hover:scale-105 transition-transform">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl glow-cyan">
              <Users className="text-white" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3 neon-cyan">Multiplayer</h3>
            <p className="text-white/80 text-lg">
              Juega con amigos en tiempo real. Todos ven el mismo contenido simultáneamente.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="card text-center hover:scale-105 transition-transform">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl glow-pink">
              <Sparkles className="text-white" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3 neon-pink">Contenido Único</h3>
            <p className="text-white/80 text-lg">
              Más de 500 preguntas y retos, incluyendo contenido exclusivo boliviano.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="card text-center hover:scale-105 transition-transform">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl glow-orange">
              <Heart className="text-white" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3 neon-orange">Cultura Local</h3>
            <p className="text-white/80 text-lg">
              Juegos tradicionales como Paco y Picolo, con jergas y bebidas bolivianas.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Game Modes */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 text-gradient neon-text">
            Modos de Fiesta
          </h2>
          <p className="text-xl text-white/80">
            Elige el modo que mejor se adapte a tu ambiente
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gameModes.slice(0, 6).map((mode) => (
            <motion.div key={mode.id} variants={itemVariants}>
              <Link to={`/game/${mode.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`game-card ${mode.color} relative overflow-hidden shadow-2xl hover:shadow-3xl`}
                >
                  <div className="text-6xl mb-4 animate-bounce-slow">{mode.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{mode.name}</h3>
                  <p className="text-base opacity-90 mb-4">{mode.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
                      {mode.minPlayers}-{mode.maxPlayers} jugadores
                    </span>
                    <ArrowRight size={24} className="animate-pulse" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Game Types */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 text-gradient neon-text">
            Tipos de Juegos
          </h2>
          <p className="text-xl text-white/80">
            Clásicos reinventados y juegos únicos bolivianos
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gameTypes.slice(0, 9).map((game) => (
            <motion.div key={game.id} variants={itemVariants}>
              <Link to={`/play/${game.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="card hover:shadow-3xl transition-all duration-300 border-2 border-white/10"
                >
                  <div className="text-6xl mb-4 animate-float">{game.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{game.name}</h3>
                  <p className="text-white/80 mb-4 text-lg">
                    {game.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.variations.slice(0, 3).map((variation, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full font-medium"
                      >
                        {variation}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      {game.rules.length} reglas
                    </span>
                    <ArrowRight size={20} className="text-pink-400 animate-pulse" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <h2 className="text-5xl font-bold mb-6 neon-text">
            ¿Listo para la mejor fiesta de tu vida?
          </h2>
          <p className="text-2xl mb-10 opacity-90">
            Únete a miles de personas que ya están disfrutando de Previa Mundial
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/game-engine">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-bold py-5 px-10 rounded-2xl hover:bg-gray-100 transition-colors text-xl shadow-2xl"
              >
                <div className="flex items-center space-x-3">
                  <Gamepad2 size={28} />
                  <span>¡Empezar Ahora!</span>
                  <Zap size={24} />
                </div>
              </motion.button>
            </Link>
            <Link to="/bolivia">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-3 border-white text-white font-bold py-5 px-10 rounded-2xl hover:bg-white hover:text-purple-600 transition-colors text-xl shadow-2xl"
              >
                <div className="flex items-center space-x-3">
                  <Crown size={28} />
                  <span>Descubrir Bolivia</span>
                  <Star size={24} />
                </div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
