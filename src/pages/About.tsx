import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  Trophy, 
  Globe, 
  Star,
  Github,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Calendar,
  Code,
  Palette,
  Zap,
  Shield,
  Award
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Users,
      title: 'Multiplayer Local',
      description: 'Juega con amigos en tiempo real, todos ven el mismo contenido simultáneamente'
    },
    {
      icon: Globe,
      title: 'Contenido Boliviano',
      description: 'Juegos tradicionales como Cacho y Que Waso, con jergas y bebidas locales'
    },
    {
      icon: Trophy,
      title: '500+ Preguntas',
      description: 'Extensa biblioteca de preguntas y retos para todos los niveles de intensidad'
    },
    {
      icon: Palette,
      title: '7 Modos de Fiesta',
      description: 'Desde Pre hasta After, cada modo adaptado a diferentes momentos de la noche'
    },
    {
      icon: Zap,
      title: 'Animaciones Fluidas',
      description: 'Interfaz moderna con animaciones suaves y microinteracciones'
    },
    {
      icon: Shield,
      title: 'Privacidad Total',
      description: 'Todos los datos se guardan localmente, sin necesidad de internet'
    }
  ]

  const team = [
    {
      name: 'Equipo Previa Mundial',
      role: 'Desarrollo y Diseño',
      description: 'Un equipo apasionado por crear la mejor experiencia de juegos para beber',
      avatar: '👨‍💻'
    }
  ]

  const technologies = [
    { name: 'React 18', description: 'Framework principal' },
    { name: 'TypeScript', description: 'Tipado estático' },
    { name: 'Tailwind CSS', description: 'Estilos y diseño' },
    { name: 'Framer Motion', description: 'Animaciones' },
    { name: 'Zustand', description: 'Estado global' },
    { name: 'Vite', description: 'Build tool' }
  ]

  const milestones = [
    {
      date: '2024',
      title: 'Lanzamiento de Previa Mundial',
      description: 'Primera versión con contenido boliviano exclusivo'
    },
    {
      date: '2024',
      title: 'Desarrollo del Modo Bolivia',
      description: 'Integración de juegos tradicionales y cultura local'
    },
    {
      date: '2024',
      title: 'Sistema de Multiplayer',
      description: 'Implementación de juego en tiempo real'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
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
          <h1 className="text-3xl font-bold mb-2">Acerca de</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Conoce más sobre Previa Mundial
          </p>
        </div>

        <div className="w-20"></div> {/* Spacer */}
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center py-16 bg-gradient-to-r from-primary-500 to-party-pink text-white rounded-3xl mb-16"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🍺
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Previa Mundial
        </h2>
        <p className="text-xl md:text-2xl mb-6 opacity-90">
          La aplicación de juegos para beber definitiva con{' '}
          <span className="font-bold">alma boliviana</span>
        </p>
        <div className="flex items-center justify-center space-x-2 text-lg opacity-80">
          <span>Hecho con</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="text-red-300" size={24} />
          </motion.div>
          <span>en Bolivia 🇧🇴</span>
        </div>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card mb-16"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">Nuestra Misión</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Crear la mejor aplicación de juegos para beber que combine la diversión global 
            con la rica cultura boliviana. Queremos que cada fiesta sea memorable, 
            que cada previa tenga ese toque especial que solo Bolivia puede dar, 
            y que la tecnología nos ayude a conectar y divertirnos como nunca antes.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12">Características Principales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary-600 dark:text-primary-400" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card text-center"
            >
              <div className="text-6xl mb-4">{member.avatar}</div>
              <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
              <p className="text-primary-600 dark:text-primary-400 mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12">Tecnologías Utilizadas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="card text-center"
            >
              <Code className="text-primary-600 dark:text-primary-400 mx-auto mb-3" size={32} />
              <h4 className="font-semibold mb-1">{tech.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12">Hitos del Proyecto</h3>
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`flex items-center space-x-6 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-1">
                <div className="card">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="text-primary-600" size={20} />
                    <span className="font-semibold text-primary-600">{milestone.date}</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{milestone.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {milestone.description}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
              <div className="flex-1"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '7', label: 'Modos de Fiesta' },
            { number: '500+', label: 'Preguntas' },
            { number: '6', label: 'Tipos de Juegos' },
            { number: '100%', label: 'Boliviano' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="card text-center"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact & Social */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <h3 className="text-3xl font-bold text-center mb-8">Conecta con Nosotros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Información de Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-600" size={20} />
                <span>soporte@previa-mundial.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary-600" size={20} />
                <span>Bolivia 🇧🇴</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="text-primary-600" size={20} />
                <span>Versión 1.0.0</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/previa-mundial', label: 'GitHub' },
                { icon: Twitter, href: 'https://twitter.com/previa_mundial', label: 'Twitter' },
                { icon: Instagram, href: 'https://instagram.com/previa_mundial', label: 'Instagram' }
              ].map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon size={24} />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center mt-16"
      >
        <h3 className="text-2xl font-bold mb-4">¿Listo para la mejor previa?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Únete a miles de personas que ya están disfrutando de Previa Mundial
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
                            onClick={() => navigate('/mode-selector')}
            className="btn-primary"
          >
            ¡Empezar a Jugar!
          </button>
          <button
            onClick={() => navigate('/bolivia')}
            className="btn-bolivia"
          >
            Descubrir Bolivia
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default About
