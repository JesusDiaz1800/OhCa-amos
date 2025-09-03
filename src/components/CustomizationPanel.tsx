import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, 
  Settings, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Music, 
  Mic, 
  Camera, 
  Smartphone,
  Monitor,
  Tablet,
  Sun,
  Moon,
  Monitor as MonitorIcon,
  Check,
  X,
  RotateCcw,
  Download,
  Upload,
  Save,
  Trash2,
  Star,
  Heart,
  Zap,
  Flame,
  Crown,
  Trophy,
  Sparkles,
  Rainbow,
  Droplets,
  Waves,
  Mountain,
  TreePine,
  Flame as Fire,
  Snowflake,
  Cloud,
  CloudRain,
  CloudLightning,
  Sun as Sunny,
  Moon as Night,
  Star as Stars,
  Sparkles as Glitter
} from 'lucide-react'

interface Theme {
  id: string
  name: string
  description: string
  icon: any
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  gradients: {
    primary: string
    secondary: string
    accent: string
  }
  effects: {
    particles: boolean
    animations: boolean
    glow: boolean
    blur: boolean
  }
}

interface CustomizationPanelProps {
  isOpen: boolean
  onClose: () => void
  onThemeChange: (theme: Theme) => void
  onSettingsChange: (settings: any) => void
  currentTheme: Theme
  currentSettings: any
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  isOpen,
  onClose,
  onThemeChange,
  onSettingsChange,
  currentTheme,
  currentSettings
}) => {
  const [selectedTab, setSelectedTab] = useState<'themes' | 'colors' | 'effects' | 'settings'>('themes')
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Temas predefinidos
  const themes: Theme[] = [
    {
      id: 'default',
      name: 'Clásico',
      description: 'Tema original con colores vibrantes',
      icon: Star,
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#45B7D1',
        background: '#1a1a2e',
        surface: '#16213e',
        text: '#ffffff',
        textSecondary: '#a0a0a0'
      },
      gradients: {
        primary: 'from-red-500 to-pink-500',
        secondary: 'from-blue-500 to-cyan-500',
        accent: 'from-purple-500 to-indigo-500'
      },
      effects: {
        particles: true,
        animations: true,
        glow: true,
        blur: true
      }
    },
    {
      id: 'neon',
      name: 'Neón',
      description: 'Colores neón brillantes y vibrantes',
      icon: Zap,
      colors: {
        primary: '#00ff88',
        secondary: '#ff0080',
        accent: '#0080ff',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        textSecondary: '#888888'
      },
      gradients: {
        primary: 'from-green-400 to-cyan-400',
        secondary: 'from-pink-500 to-purple-500',
        accent: 'from-blue-500 to-indigo-500'
      },
      effects: {
        particles: true,
        animations: true,
        glow: true,
        blur: false
      }
    },
    {
      id: 'sunset',
      name: 'Atardecer',
      description: 'Tema cálido inspirado en atardeceres',
      icon: Sunny,
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        accent: '#ffd23f',
        background: '#2d1b69',
        surface: '#1e0f3f',
        text: '#ffffff',
        textSecondary: '#e0e0e0'
      },
      gradients: {
        primary: 'from-orange-500 to-red-500',
        secondary: 'from-yellow-500 to-orange-500',
        accent: 'from-pink-500 to-red-500'
      },
      effects: {
        particles: true,
        animations: true,
        glow: true,
        blur: true
      }
    },
    {
      id: 'ocean',
      name: 'Océano',
      description: 'Tema refrescante inspirado en el mar',
      icon: Waves,
      colors: {
        primary: '#006994',
        secondary: '#00b4d8',
        accent: '#90e0ef',
        background: '#001845',
        surface: '#002855',
        text: '#ffffff',
        textSecondary: '#b8d4e3'
      },
      gradients: {
        primary: 'from-blue-600 to-cyan-500',
        secondary: 'from-cyan-500 to-blue-400',
        accent: 'from-blue-400 to-indigo-400'
      },
      effects: {
        particles: true,
        animations: true,
        glow: false,
        blur: true
      }
    },
    {
      id: 'forest',
      name: 'Bosque',
      description: 'Tema natural y relajante',
      icon: TreePine,
      colors: {
        primary: '#2d5016',
        secondary: '#4a7c59',
        accent: '#7fb069',
        background: '#1a2f1a',
        surface: '#2a3f2a',
        text: '#ffffff',
        textSecondary: '#c8d5c8'
      },
      gradients: {
        primary: 'from-green-700 to-green-500',
        secondary: 'from-green-600 to-emerald-500',
        accent: 'from-emerald-500 to-green-400'
      },
      effects: {
        particles: false,
        animations: true,
        glow: false,
        blur: true
      }
    },
    {
      id: 'fire',
      name: 'Fuego',
      description: 'Tema intenso y apasionado',
      icon: Fire,
      colors: {
        primary: '#ff4500',
        secondary: '#ff6347',
        accent: '#ff8c00',
        background: '#2d0a0a',
        surface: '#3d1a1a',
        text: '#ffffff',
        textSecondary: '#ffcccc'
      },
      gradients: {
        primary: 'from-red-600 to-orange-500',
        secondary: 'from-orange-500 to-red-500',
        accent: 'from-yellow-500 to-orange-500'
      },
      effects: {
        particles: true,
        animations: true,
        glow: true,
        blur: false
      }
    },
    {
      id: 'cosmic',
      name: 'Cósmico',
      description: 'Tema espacial y misterioso',
      icon: Stars,
      colors: {
        primary: '#8b5cf6',
        secondary: '#a855f7',
        accent: '#c084fc',
        background: '#0f0f23',
        surface: '#1a1a2e',
        text: '#ffffff',
        textSecondary: '#e0e0ff'
      },
      gradients: {
        primary: 'from-purple-600 to-pink-500',
        secondary: 'from-pink-500 to-purple-500',
        accent: 'from-indigo-500 to-purple-500'
      },
      effects: {
        particles: true,
        animations: true,
        glow: true,
        blur: true
      }
    },
    {
      id: 'minimal',
      name: 'Minimalista',
      description: 'Diseño limpio y simple',
      icon: MonitorIcon,
      colors: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#9ca3af',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#111827',
        textSecondary: '#6b7280'
      },
      gradients: {
        primary: 'from-gray-600 to-gray-500',
        secondary: 'from-gray-500 to-gray-400',
        accent: 'from-gray-400 to-gray-300'
      },
      effects: {
        particles: false,
        animations: false,
        glow: false,
        blur: false
      }
    }
  ]

  const [customColors, setCustomColors] = useState(currentTheme.colors)
  const [customEffects, setCustomEffects] = useState(currentTheme.effects)

  const handleThemeSelect = (theme: Theme) => {
    onThemeChange(theme)
    setCustomColors(theme.colors)
    setCustomEffects(theme.effects)
  }

  const handleColorChange = (colorKey: string, value: string) => {
    const newColors = { ...customColors, [colorKey]: value }
    setCustomColors(newColors)
    
    const customTheme = {
      ...currentTheme,
      colors: newColors
    }
    onThemeChange(customTheme)
  }

  const handleEffectToggle = (effectKey: string) => {
    const newEffects = { ...customEffects, [effectKey]: !customEffects[effectKey as keyof typeof customEffects] }
    setCustomEffects(newEffects)
    
    const customTheme = {
      ...currentTheme,
      effects: newEffects
    }
    onThemeChange(customTheme)
  }

  const resetToDefault = () => {
    const defaultTheme = themes[0]
    handleThemeSelect(defaultTheme)
  }

  const exportTheme = () => {
    const themeData = {
      theme: currentTheme,
      settings: currentSettings
    }
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `oh-cañamos-theme-${currentTheme.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const themeData = JSON.parse(e.target?.result as string)
          if (themeData.theme) {
            onThemeChange(themeData.theme)
          }
        } catch (error) {
          console.error('Error al importar tema:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`bg-gradient-to-br ${currentTheme.gradients.primary} rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Personalización
                </h2>
                <p className="text-white/80">
                  Personaliza la apariencia de tu experiencia
                </p>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  onClick={resetToDefault}
                  className="bg-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </motion.button>
                
                <motion.button
                  onClick={exportTheme}
                  className="bg-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Exportar
                </motion.button>
                
                <label className="bg-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer hover:scale-105">
                  <Upload className="w-4 h-4" />
                  Importar
                  <input
                    type="file"
                    accept=".json"
                    onChange={importTheme}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'themes', label: 'Temas', icon: Palette },
                { id: 'colors', label: 'Colores', icon: Eye },
                { id: 'effects', label: 'Efectos', icon: Sparkles },
                { id: 'settings', label: 'Configuración', icon: Settings }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    selectedTab === tab.id
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Contenido de tabs */}
            <div className="space-y-6">
              {/* Temas */}
              {selectedTab === 'themes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {themes.map((theme) => (
                    <motion.div
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme)}
                      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                        currentTheme.id === theme.id
                          ? 'border-white/50 shadow-lg shadow-white/20'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${theme.gradients.primary}`}>
                          <theme.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{theme.name}</h3>
                          <p className="text-white/60 text-sm">{theme.description}</p>
                        </div>
                      </div>
                      
                      {/* Preview de colores */}
                      <div className="flex gap-2 mb-4">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white/30"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white/30"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white/30"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                      
                      {currentTheme.id === theme.id && (
                        <div className="flex items-center gap-2 text-green-400">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Activo</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Colores */}
              {selectedTab === 'colors' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-4">Colores Principales</h3>
                    <div className="space-y-4">
                      {Object.entries(customColors).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-4">
                          <label className="text-white/80 text-sm w-24 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            className="w-12 h-8 rounded border-2 border-white/30 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            className="flex-1 bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-bold text-xl mb-4">Vista Previa</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="space-y-4">
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
                        <div
                          className="h-12 rounded-lg"
                          style={{ backgroundColor: customColors.surface }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Efectos */}
              {selectedTab === 'effects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(customEffects).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-bold text-lg capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {value ? 'Activado' : 'Desactivado'}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => handleEffectToggle(key)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-green-500' : 'bg-gray-500'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Configuración */}
              {selectedTab === 'settings' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h3 className="text-white font-bold text-xl mb-4">Sonido</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white">Efectos de Sonido</span>
                          <button className="w-12 h-6 rounded-full bg-green-500">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Música de Fondo</span>
                          <button className="w-12 h-6 rounded-full bg-green-500">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Vibración</span>
                          <button className="w-12 h-6 rounded-full bg-gray-500">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h3 className="text-white font-bold text-xl mb-4">Accesibilidad</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white">Alto Contraste</span>
                          <button className="w-12 h-6 rounded-full bg-gray-500">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Texto Grande</span>
                          <button className="w-12 h-6 rounded-full bg-gray-500">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Reducir Movimiento</span>
                          <button className="w-12 h-6 rounded-full bg-gray-500">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CustomizationPanel
