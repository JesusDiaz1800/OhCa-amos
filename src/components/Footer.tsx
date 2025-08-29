import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Github, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4"
            >
              🍺 ¡Oh Cañamos?
            </motion.div>
            <p className="text-white/80 mb-4">
              La app #1 para la fiesta más divertida y viral. 
              ¡Anima cualquier celebración con nuestros juegos clásicos y contenido único!
            </p>
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <span>Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="text-red-500" size={16} />
              </motion.div>
              <span>en Bolivia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/bolivia" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Modo Bolivia
                </Link>
              </li>
              <li>
                <Link 
                  to="/settings" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Configuración
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © 2024 ¡Oh Cañamos?. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-white/60">
              🇧🇴 Hecho con orgullo boliviano
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
