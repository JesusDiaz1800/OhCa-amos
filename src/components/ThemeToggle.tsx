import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette,
  Settings,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Heart,
  Star
} from 'lucide-react'

type Theme = 'light' | 'dark' | 'auto'

interface ThemeConfig {
  name: string
  description: string
  icon: React.ReactNode
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
}

const ThemeToggle: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('auto')
  const [showThemePanel, setShowThemePanel] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [customColors, setCustomColors] = useState({
    primary: '#f59e0b',
    secondary: '#ef4444',
    accent: '#8b5cf6'
  })

  const themes: Record<Theme, ThemeConfig> = {
    light: {
      name: 'Modo Claro',
      description: 'Tema brillante y energético',
      icon: <Sun className="w-6 h-6" />,
      colors: {
        primary: '#f59e0b',
        secondary: '#ef4444',
        accent: '#8b5cf6',
        background: '#ffffff',
        surface: '#f3f4f6',
        text: '#1f2937'
      }
    },
    dark: {
      name: 'Modo Oscuro',
      description: 'Tema elegante y moderno',
      icon: <Moon className="w-6 h-6" />,
      colors: {
        primary: '#fbbf24',
        secondary: '#f87171',
        accent: '#a78bfa',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9'
      }
    },
    auto: {
      name: 'Automático',
      description: 'Se adapta a tu sistema',
      icon: <Monitor className="w-6 h-6" />,
      colors: {
        primary: '#f59e0b',
        secondary: '#ef4444',
        accent: '#8b5cf6',
        background: 'var(--bg-auto)',
        surface: 'var(--surface-auto)',
        text: 'var(--text-auto)'
      }
    }
  }

  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }

    // Cargar colores personalizados
    const savedColors = localStorage.getItem('customColors')
    if (savedColors) {
      setCustomColors(JSON.parse(savedColors))
    }

    // Aplicar tema inicial
    applyTheme(savedTheme || 'auto')
  }, [])

  useEffect(() => {
    // Guardar tema
    localStorage.setItem('theme', currentTheme)
    
    // Aplicar tema
    applyTheme(currentTheme)
  }, [currentTheme])

  useEffect(() => {
    // Guardar colores personalizados
    localStorage.setItem('customColors', JSON.stringify(customColors))
    
    // Aplicar colores si el tema está activo
    if (currentTheme === 'custom') {
      applyCustomColors()
    }
  }, [customColors])

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    const config = themes[theme]

    if (theme === 'auto') {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = prefersDark
      
      root.style.setProperty('--bg-auto', isDark ? '#0f172a' : '#ffffff')
      root.style.setProperty('--surface-auto', isDark ? '#1e293b' : '#f3f4f6')
      root.style.setProperty('--text-auto', isDark ? '#f1f5f9' : '#1f2937')
      
      root.style.setProperty('--theme-primary', config.colors.primary)
      root.style.setProperty('--theme-secondary', config.colors.secondary)
      root.style.setProperty('--theme-accent', config.colors.accent)
      root.style.setProperty('--theme-background', 'var(--bg-auto)')
      root.style.setProperty('--theme-surface', 'var(--surface-auto)')
      root.style.setProperty('--theme-text', 'var(--text-auto)')
    } else {
      // Aplicar tema específico
      root.style.setProperty('--theme-primary', config.colors.primary)
      root.style.setProperty('--theme-secondary', config.colors.secondary)
      root.style.setProperty('--theme-accent', config.colors.accent)
      root.style.setProperty('--theme-background', config.colors.background)
      root.style.setProperty('--theme-surface', config.colors.surface)
      root.style.setProperty('--theme-text', config.colors.text)
    }

    // Aplicar transición suave
    root.style.setProperty('--theme-transition', 'all 0.3s ease-in-out')
  }

  const applyCustomColors = () => {
    const root = document.documentElement
    root.style.setProperty('--theme-primary', customColors.primary)
    root.style.setProperty('--theme-secondary', customColors.secondary)
    root.style.setProperty('--theme-accent', customColors.accent)
  }

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    if (theme === 'custom') {
      setShowCustomization(true)
    }
  }

  const ColorPicker = ({ 
    color, 
    onChange, 
    label 
  }: { 
    color: string
    onChange: (color: string) => void
    label: string 
  }) => (
    <div className="flex items-center gap-3">
      <span className="text-white/80 text-sm min-w-[80px]">{label}</span>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border-2 border-white/20 cursor-pointer"
      />
      <span className="text-white/60 text-xs font-mono">{color}</span>
    </div>
  )

  return (
    <>
      {/* Botón flotante de tema */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={() => setShowThemePanel(!showThemePanel)}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300 shadow-lg"
        >
          <Palette className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Panel de selección de tema */}
      <AnimatePresence>
        {showThemePanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-20 right-4 z-40"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl min-w-[300px]">
              <h3 className="text-xl font-bold text-white mb-4 text-center">🎨 Temas</h3>
              
              <div className="space-y-3">
                {Object.entries(themes).map(([key, theme]) => (
                  <motion.button
                    key={key}
                    onClick={() => handleThemeChange(key as Theme)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                      currentTheme === key
                        ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400/50'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        currentTheme === key ? 'bg-white/20' : 'bg-white/10'
                      }`}>
                        {theme.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white">{theme.name}</div>
                        <div className="text-white/70 text-sm">{theme.description}</div>
                      </div>
                      {currentTheme === key && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-purple-400 ml-auto"
                        >
                          <Star className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}

                {/* Tema personalizado */}
                <motion.button
                  onClick={() => setShowCustomization(true)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                    currentTheme === 'custom'
                      ? 'bg-gradient-to-r from-green-500/30 to-blue-500/30 border-green-400/50'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      currentTheme === 'custom' ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Personalizado</div>
                      <div className="text-white/70 text-sm">Crea tu propio tema</div>
                    </div>
                    {currentTheme === 'custom' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-400 ml-auto"
                      >
                        <Star className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Botón de cerrar */}
              <motion.button
                onClick={() => setShowThemePanel(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300"
              >
                Cerrar
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de personalización */}
      <AnimatePresence>
        {showCustomization && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCustomization(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">🎨 Personalizar Tema</h2>
              
              <div className="space-y-6 mb-6">
                <ColorPicker
                  color={customColors.primary}
                  onChange={(color) => setCustomColors(prev => ({ ...prev, primary: color }))}
                  label="Primario"
                />
                
                <ColorPicker
                  color={customColors.secondary}
                  onChange={(color) => setCustomColors(prev => ({ ...prev, secondary: color }))}
                  label="Secundario"
                />
                
                <ColorPicker
                  color={customColors.accent}
                  onChange={(color) => setCustomColors(prev => ({ ...prev, accent: color }))}
                  label="Acento"
                />
              </div>

              {/* Vista previa */}
              <div className="bg-white/10 rounded-2xl p-4 mb-6">
                <h4 className="text-white font-medium mb-3 text-center">👁️ Vista Previa</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className="h-12 rounded-lg"
                    style={{ backgroundColor: customColors.primary }}
                  />
                  <div 
                    className="h-12 rounded-lg"
                    style={{ backgroundColor: customColors.secondary }}
                  />
                  <div 
                    className="h-12 rounded-lg"
                    style={{ backgroundColor: customColors.accent }}
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    setCurrentTheme('custom')
                    setShowCustomization(false)
                    setShowThemePanel(false)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  Aplicar
                </motion.button>
                
                <motion.button
                  onClick={() => setShowCustomization(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Cancelar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Estilos CSS globales */}
      <style>{`
        :root {
          --theme-primary: #f59e0b;
          --theme-secondary: #ef4444;
          --theme-accent: #8b5cf6;
          --theme-background: #ffffff;
          --theme-surface: #f3f4f6;
          --theme-text: #1f2937;
          --theme-transition: all 0.3s ease-in-out;
        }

        * {
          transition: var(--theme-transition);
        }

        body {
          background-color: var(--theme-background);
          color: var(--theme-text);
        }

        .theme-primary {
          color: var(--theme-primary);
        }

        .theme-secondary {
          color: var(--theme-secondary);
        }

        .theme-accent {
          color: var(--theme-accent);
        }

        .theme-bg {
          background-color: var(--theme-background);
        }

        .theme-surface {
          background-color: var(--theme-surface);
        }
      `}</style>
    </>
  )
}

export default ThemeToggle
