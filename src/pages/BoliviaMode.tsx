import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Globe, 
  Play, 
  BookOpen, 
  Coffee, 
  Music, 
  Heart,
  ArrowRight,
  Star,
  MapPin,
  Users
} from 'lucide-react'
import { bolivianSlang, bolivianDrinks } from '../data/gameData'

const BoliviaMode = () => {
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
      <section className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            className="text-6xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🇧🇴
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-bolivia-red via-bolivia-yellow to-bolivia-green bg-clip-text text-transparent">
              Previa Boliviana
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Descubre la rica cultura de juegos, bebidas y jergas bolivianas
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/game/bolivia">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-bolivia text-lg px-8 py-4 flex items-center space-x-2"
              >
                <Play size={24} />
                <span>¡Jugar Modo Bolivia!</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Juegos Bolivianos */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Juegos Tradicionales</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Los clásicos juegos bolivianos que han animado fiestas por generaciones
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants}>
            <Link to="/play/cacho">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="card hover:shadow-2xl transition-all duration-300 border-l-4 border-bolivia-red"
              >
                <div className="text-4xl mb-4">🎲</div>
                <h3 className="text-2xl font-bold mb-2">Cacho</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  El juego tradicional de dados con cubilete. Usa 5 dados con denominaciones únicas: 
                  1=Bala, 2=Duque, 3=Tren, 4=Cuadra, 5=Quina, 6=Cena.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Juego de dados tradicional
                  </span>
                  <ArrowRight size={20} className="text-bolivia-red" />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link to="/play/que-waso">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="card hover:shadow-2xl transition-all duration-300 border-l-4 border-bolivia-yellow"
              >
                <div className="text-4xl mb-4">😄</div>
                <h3 className="text-2xl font-bold mb-2">Que Waso</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Juego de cartas con humor y sin respeto. Incluye variantes como "Peor es Nada" 
                  y "Qué Guaso" para crear momentos hilarantes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Juego de cartas humorístico
                  </span>
                  <ArrowRight size={20} className="text-bolivia-yellow" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Bebidas Bolivianas */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Bebidas Típicas</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Las bebidas que definen la cultura boliviana
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bolivianDrinks.map((drink, index) => (
            <motion.div key={drink.name} variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">
                    {drink.alcohol ? '🍺' : '🥤'}
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {drink.region}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{drink.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {drink.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded ${
                    drink.alcohol 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {drink.alcohol ? 'Con alcohol' : 'Sin alcohol'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Jergas Bolivianas */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Jergas y Modismos</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            El lenguaje único que hace especial a Bolivia
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bolivianSlang.map((slang, index) => (
            <motion.div key={slang.word} variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl mb-3">💬</div>
                <h3 className="text-xl font-bold mb-2 text-bolivia-red">
                  {slang.word}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {slang.meaning}
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">
                    "{slang.example}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Juegos Tradicionales */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Juegos Tradicionales</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Juegos únicos bolivianos para disfrutar con amigos
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { name: 'Paco 👮', description: 'Juego de adivinanzas y castigos', icon: '👮' },
            { name: 'Picolo ⚡', description: 'Juego de velocidad y reflejos', icon: '⚡' },
            { name: 'El Rey 👑', description: 'Juego de cartas con reglas específicas', icon: '👑' },
            { name: 'Dados 🎲', description: 'Juegos tradicionales con dados', icon: '🎲' },
            { name: 'Heads Up! 🎭', description: 'Mímica y adivinanzas', icon: '🎭' },
            { name: 'Shot Roulette 🍸', description: 'Ruleta rusa con shots', icon: '🍸' }
          ].map((game, index) => (
            <motion.div key={game.name} variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {game.description}
                </p>
                <div className="flex justify-center">
                  <span className="bg-gradient-to-r from-bolivia-red to-bolivia-yellow text-white px-3 py-1 rounded-full text-xs font-medium">
                    Juego Boliviano
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-bolivia-red via-bolivia-yellow to-bolivia-green text-white rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">
            ¡Viva Bolivia!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Celebra la cultura boliviana con los mejores juegos y bebidas tradicionales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/game/bolivia">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-bolivia-red font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors"
              >
                ¡Jugar Ahora!
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-bolivia-red transition-colors"
              >
                Volver al Inicio
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default BoliviaMode
