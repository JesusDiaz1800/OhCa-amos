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
  GamepadIcon,
  TrendingUp,
  Award,
  Shield,
  Clock,
  Volume2
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

  const stats = [
    { icon: Users, value: '10K+', label: 'Jugadores Activos', color: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, value: '25+', label: 'Juegos Únicos', color: 'from-yellow-500 to-orange-500' },
    { icon: Star, value: '4.9', label: 'Rating Promedio', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, value: '100%', label: 'Diversión Garantizada', color: 'from-green-500 to-emerald-500' }
  ]

  const features = [
    {
      icon: Gamepad2,
      title: 'Experiencia Inmersiva',
      description: 'Diseño moderno con animaciones fluidas que te transportan a la mejor fiesta',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Cultura Boliviana',
      description: 'Modismos locales y referencias auténticas que solo los bolivianos entenderán',
      color: 'from-green-500 to-yellow-500'
    },
    {
      icon: Shield,
      title: 'Privacidad Total',
      description: 'Todo se guarda localmente, sin necesidad de internet ni datos personales',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Configuración Rápida',
      description: 'En menos de 30 segundos estarás jugando con tus amigos',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const gameCategories = [
    {
      title: 'Clásicos Renovados',
      games: ['Yo Nunca He', 'Verdad o Reto', 'La Botella', 'Bomba Drink'],
      icon: Crown,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Bolivia Especial',
      games: ['Cultura Chupística', 'Que Waso', 'El Seco Mojado', 'Modismos Locales'],
      icon: Flag,
      color: 'from-green-400 to-yellow-500'
    },
    {
      title: 'Retos Extremos',
      games: ['Papiro Pico', 'Chimboleo 3000', 'Tomanji', 'Psych!'],
      icon: Flame,
      color: 'from-red-400 to-pink-500'
    }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section Mejorado */}
      <section className="text-center py-20 relative overflow-hidden">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="text-8xl mb-6 inline-block"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🍺
            </motion.div>
            <motion.h1 
              className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              ¡Oh Cañamos?
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-yellow-200 font-bold mb-6"
              animate={{
                textShadow: [
                  "0 0 10px rgba(251, 191, 36, 0.5)",
                  "0 0 20px rgba(251, 191, 36, 0.8)",
                  "0 0 10px rgba(251, 191, 36, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              La App #1 para la Fiesta Más Viral
            </motion.p>
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ¡Prepárense para una experiencia única que romperá el hielo y 
              creará momentos que recordarán para siempre!
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/mode-selector"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold py-6 px-12 rounded-full text-2xl shadow-2xl hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/20 overflow-hidden inline-flex items-center gap-3"
              >
                {/* Efecto de brillo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-8 h-8" />
                  ¡Empezar a Jugar!
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/test"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-6 px-8 rounded-full text-xl shadow-2xl border border-white/20 transition-all duration-300 transform hover:-translate-y-2 inline-flex items-center gap-3"
              >
                <Gamepad2 className="w-6 h-6" />
                Probar Sistema
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section Mejorado */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Números que Hablan
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            La app más descargada y recomendada por miles de usuarios
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group"
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-2xl`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8" />
              </motion.div>
              <motion.div 
                className="text-3xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white/80 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section Mejorado */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            ¿Por Qué Elegirnos?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Características únicas que hacen de ¡Oh Cañamos? la mejor opción
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group"
            >
              <motion.div
                className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-2xl`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Game Categories Section Mejorado */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Juegos Disponibles
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Una colección completa de juegos para todos los gustos y niveles de intensidad
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gameCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group"
            >
              <motion.div
                className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-2xl`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <category.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-6">{category.title}</h3>
              <ul className="space-y-3">
                {category.games.map((game, gameIndex) => (
                  <motion.li
                    key={game}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: gameIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <motion.div
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: gameIndex * 0.2 }}
                    />
                    {game}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section Mejorado */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 text-center relative overflow-hidden"
      >
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

        <div className="relative z-10">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            ¿Listo para la Mejor Fiesta?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Únete a miles de personas que ya están disfrutando de la experiencia más viral
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/mode-selector"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold py-6 px-12 rounded-full text-2xl shadow-2xl hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/20 overflow-hidden inline-flex items-center gap-3"
              >
                {/* Efecto de brillo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  <PartyPopper className="w-8 h-8" />
                  ¡Empezar Ahora!
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
