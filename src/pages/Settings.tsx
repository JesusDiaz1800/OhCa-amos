import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Monitor,
  Volume2, 
  VolumeX,
  Smartphone,
  Globe,
  Clock,
  User,
  Shield,
  HelpCircle,
  Mail,
  Github,
  Heart,
  Timer
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '../stores/themeStore'
import { useGameStore } from '../stores/gameStore'
import toast from 'react-hot-toast'

const Settings = () => {
  const navigate = useNavigate()
  const { theme, setTheme } = useThemeStore()
  const { settings, updateSettings } = useGameStore()
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'gameplay', name: 'Juego', icon: User },
    { id: 'privacy', name: 'Privacidad', icon: Shield },
    { id: 'about', name: 'Acerca de', icon: HelpCircle },
  ]

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    toast.success('Tema actualizado')
  }

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value })
    toast.success('Configuración actualizada')
  }

  const handleResetSettings = () => {
    if (window.confirm('¿Estás seguro de que quieres restablecer todas las configuraciones?')) {
      updateSettings({
        language: 'es',
        soundEnabled: true,
        vibrationEnabled: true,
        autoNext: false,
        showTimer: true,
      })
      toast.success('Configuraciones restablecidas')
    }
  }

  const handleExportData = () => {
    const data = {
      settings,
      theme,
      timestamp: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'previa-mundial-settings.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Datos exportados')
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.settings) {
          updateSettings(data.settings)
        }
        if (data.theme) {
          setTheme(data.theme)
        }
        toast.success('Datos importados correctamente')
      } catch (error) {
        toast.error('Error al importar datos')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold mb-2">Configuración</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personaliza tu experiencia en Previa Mundial
          </p>
        </div>

        <div className="w-20"></div> {/* Spacer */}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="card">
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Configuración General</h2>

                {/* Theme */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Monitor size={20} />
                    <span>Tema</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'light', name: 'Claro', icon: Sun },
                      { id: 'dark', name: 'Oscuro', icon: Moon },
                      { id: 'system', name: 'Sistema', icon: Monitor },
                    ].map((themeOption) => {
                      const Icon = themeOption.icon
                      return (
                        <button
                          key={themeOption.id}
                          onClick={() => handleThemeChange(themeOption.id as any)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === themeOption.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                          }`}
                        >
                          <Icon size={24} className="mx-auto mb-2" />
                          <span className="block text-sm font-medium">
                            {themeOption.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Language */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Globe size={20} />
                    <span>Idioma</span>
                  </h3>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>

                {/* Sound */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    <span>Sonido</span>
                  </h3>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.soundEnabled}
                      onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span>Habilitar efectos de sonido</span>
                  </label>
                </div>

                {/* Vibration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Smartphone size={20} />
                    <span>Vibración</span>
                  </h3>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.vibrationEnabled}
                      onChange={(e) => handleSettingChange('vibrationEnabled', e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span>Habilitar vibración</span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Gameplay Settings */}
            {activeTab === 'gameplay' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Configuración de Juego</h2>

                {/* Auto Next */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Clock size={20} />
                    <span>Navegación Automática</span>
                  </h3>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoNext}
                      onChange={(e) => handleSettingChange('autoNext', e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span>Pasar automáticamente al siguiente jugador</span>
                  </label>
                </div>

                {/* Show Timer */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Timer size={20} />
                    <span>Temporizador</span>
                  </h3>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showTimer}
                      onChange={(e) => handleSettingChange('showTimer', e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span>Mostrar temporizador durante el juego</span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Privacidad y Datos</h2>

                <div className="space-y-6">
                  {/* Data Export */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Exportar Datos</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Descarga una copia de tus configuraciones y datos del juego.
                    </p>
                    <button
                      onClick={handleExportData}
                      className="btn-primary"
                    >
                      Exportar Configuraciones
                    </button>
                  </div>

                  {/* Data Import */}
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Importar Datos</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Restaura tus configuraciones desde un archivo guardado.
                    </p>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                  </div>

                  {/* Reset Settings */}
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Restablecer Configuraciones</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Restablece todas las configuraciones a sus valores predeterminados.
                    </p>
                    <button
                      onClick={handleResetSettings}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Restablecer Todo
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* About */}
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Acerca de Previa Mundial</h2>

                <div className="space-y-6">
                  {/* App Info */}
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🍺
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Previa Mundial</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Versión 1.0.0
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      La aplicación de juegos para beber definitiva con alma boliviana
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-semibold mb-2">Características</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 7 modos de fiesta</li>
                        <li>• 6 tipos de juegos</li>
                        <li>• 500+ preguntas y retos</li>
                        <li>• Contenido boliviano exclusivo</li>
                        <li>• Modo oscuro/claro</li>
                        <li>• Multiplayer local</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-semibold mb-2">Tecnologías</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• React 18</li>
                        <li>• TypeScript</li>
                        <li>• Tailwind CSS</li>
                        <li>• Framer Motion</li>
                        <li>• Zustand</li>
                        <li>• Vite</li>
                      </ul>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <h4 className="font-semibold mb-3">Contacto y Soporte</h4>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="mailto:soporte@previa-mundial.com"
                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <Mail size={16} />
                        <span>Soporte</span>
                      </a>
                      <a
                        href="https://github.com/previa-mundial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                      >
                        <Github size={16} />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>

                  {/* Made with love */}
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                      <span>Hecho con</span>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Heart className="text-red-500" size={16} />
                      </motion.div>
                      <span>en Bolivia 🇧🇴</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
