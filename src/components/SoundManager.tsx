import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Volume2, 
  VolumeX, 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Settings,
  Speaker,
  Headphones,
  Zap,
  Star,
  Heart,
  Crown,
  Trophy
} from 'lucide-react'

interface SoundEffect {
  id: string
  name: string
  url: string
  icon: React.ReactNode
  category: 'ui' | 'game' | 'celebration'
}

interface BackgroundMusic {
  id: string
  name: string
  artist: string
  url: string
  mood: 'party' | 'chill' | 'energetic'
}

const SoundManager: React.FC = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [isMusicEnabled, setIsMusicEnabled] = useState(false)
  const [currentVolume, setCurrentVolume] = useState(0.7)
  const [musicVolume, setMusicVolume] = useState(0.5)
  const [currentMusic, setCurrentMusic] = useState<BackgroundMusic | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentMood, setCurrentMood] = useState<'party' | 'chill' | 'energetic'>('party')

  const audioRef = useRef<HTMLAudioElement>(null)
  const musicRef = useRef<HTMLAudioElement>(null)

  // Efectos de sonido
  const soundEffects: SoundEffect[] = [
    {
      id: 'button-click',
      name: 'Click de Botón',
      url: '/sounds/button-click.mp3',
      icon: <Zap className="w-4 h-4" />,
      category: 'ui'
    },
    {
      id: 'success',
      name: 'Éxito',
      url: '/sounds/success.mp3',
      icon: <Star className="w-4 h-4" />,
      category: 'celebration'
    },
    {
      id: 'celebration',
      name: 'Celebración',
      url: '/sounds/celebration.mp3',
      icon: <Heart className="w-4 h-4" />,
      category: 'celebration'
    },
    {
      id: 'victory',
      name: 'Victoria',
      url: '/sounds/victory.mp3',
      icon: <Crown className="w-4 h-4" />,
      category: 'celebration'
    },
    {
      id: 'achievement',
      name: 'Logro',
      url: '/sounds/achievement.mp3',
      icon: <Trophy className="w-4 h-4" />,
      category: 'celebration'
    }
  ]

  // Música de fondo
  const backgroundMusic: BackgroundMusic[] = [
    {
      id: 'party-1',
      name: 'Fiesta Nocturna',
      artist: 'DJ Boliviano',
      url: '/music/party-1.mp3',
      mood: 'party'
    },
    {
      id: 'chill-1',
      name: 'Relax Andino',
      artist: 'Sonidos de Bolivia',
      url: '/music/chill-1.mp3',
      mood: 'chill'
    },
    {
      id: 'energetic-1',
      name: 'Energía Latina',
      artist: 'Ritmo Caliente',
      url: '/music/energetic-1.mp3',
      mood: 'energetic'
    }
  ]

  useEffect(() => {
    // Cargar preferencias del usuario
    const savedSound = localStorage.getItem('soundEnabled')
    const savedMusic = localStorage.getItem('musicEnabled')
    const savedVolume = localStorage.getItem('soundVolume')
    const savedMusicVolume = localStorage.getItem('musicVolume')

    if (savedSound !== null) setIsSoundEnabled(JSON.parse(savedSound))
    if (savedMusic !== null) setIsMusicEnabled(JSON.parse(savedMusic))
    if (savedVolume !== null) setCurrentVolume(parseFloat(savedVolume))
    if (savedMusicVolume !== null) setMusicVolume(parseFloat(savedMusicVolume))
  }, [])

  useEffect(() => {
    // Guardar preferencias
    localStorage.setItem('soundEnabled', JSON.stringify(isSoundEnabled))
    localStorage.setItem('musicEnabled', JSON.stringify(isMusicEnabled))
    localStorage.setItem('soundVolume', currentVolume.toString())
    localStorage.setItem('musicVolume', musicVolume.toString())
  }, [isSoundEnabled, isMusicEnabled, currentVolume, musicVolume])

  const playSound = (effectId: string) => {
    if (!isSoundEnabled) return

    const effect = soundEffects.find(e => e.id === effectId)
    if (effect && audioRef.current) {
      audioRef.current.src = effect.url
      audioRef.current.volume = currentVolume
      audioRef.current.play().catch(console.error)
    }
  }

  const toggleMusic = () => {
    if (!isMusicEnabled) {
      setIsMusicEnabled(true)
      playRandomMusic()
    } else {
      setIsMusicEnabled(false)
      if (musicRef.current) {
        musicRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const playRandomMusic = () => {
    const musicByMood = backgroundMusic.filter(m => m.mood === currentMood)
    if (musicByMood.length > 0) {
      const randomMusic = musicByMood[Math.floor(Math.random() * musicByMood.length)]
      setCurrentMusic(randomMusic)
      if (musicRef.current) {
        musicRef.current.src = randomMusic.url
        musicRef.current.volume = musicVolume
        musicRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(console.error)
      }
    }
  }

  const nextMusic = () => {
    if (currentMusic) {
      const currentIndex = backgroundMusic.findIndex(m => m.id === currentMusic.id)
      const nextIndex = (currentIndex + 1) % backgroundMusic.length
      const nextMusic = backgroundMusic[nextIndex]
      setCurrentMusic(nextMusic)
      setCurrentMood(nextMusic.mood)
      if (musicRef.current) {
        musicRef.current.src = nextMusic.url
        musicRef.current.volume = musicVolume
        musicRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(console.error)
      }
    }
  }

  const prevMusic = () => {
    if (currentMusic) {
      const currentIndex = backgroundMusic.findIndex(m => m.id === currentMusic.id)
      const prevIndex = currentIndex === 0 ? backgroundMusic.length - 1 : currentIndex - 1
      const prevMusic = backgroundMusic[prevIndex]
      setCurrentMusic(prevMusic)
      setCurrentMood(prevMusic.mood)
      if (musicRef.current) {
        musicRef.current.src = prevMusic.url
        musicRef.current.volume = musicVolume
        musicRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(console.error)
      }
    }
  }

  const changeMood = (mood: 'party' | 'chill' | 'energetic') => {
    setCurrentMood(mood)
    if (isMusicEnabled) {
      playRandomMusic()
    }
  }

  // Función global para reproducir sonidos desde otros componentes
  useEffect(() => {
    // @ts-ignore
    window.playSound = playSound
    return () => {
      // @ts-ignore
      delete window.playSound
    }
  }, [isSoundEnabled, currentVolume])

  return (
    <>
      {/* Audio elements */}
      <audio ref={audioRef} preload="auto" />
      <audio ref={musicRef} preload="auto" loop />

      {/* Controles flotantes */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex flex-col gap-3">
          {/* Control de sonido */}
          <motion.button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
              isSoundEnabled 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>

          {/* Control de música */}
          <motion.button
            onClick={toggleMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
              isMusicEnabled 
                ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            <Music className="w-5 h-5" />
          </motion.button>

          {/* Configuración */}
          <motion.button
            onClick={() => setShowSettings(!showSettings)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Panel de configuración */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">🎵 Configuración de Audio</h2>

              {/* Control de volumen de efectos */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Speaker className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Volumen de Efectos</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={currentVolume}
                  onChange={(e) => setCurrentVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-right text-white/70 text-sm mt-1">
                  {Math.round(currentVolume * 100)}%
                </div>
              </div>

              {/* Control de volumen de música */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Headphones className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Volumen de Música</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-right text-white/70 text-sm mt-1">
                  {Math.round(musicVolume * 100)}%
                </div>
              </div>

              {/* Control de música actual */}
              {isMusicEnabled && currentMusic && (
                <div className="mb-6 p-4 bg-white/10 rounded-2xl">
                  <div className="text-center mb-3">
                    <h3 className="text-white font-bold">{currentMusic.name}</h3>
                    <p className="text-white/70 text-sm">{currentMusic.artist}</p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <motion.button
                      onClick={prevMusic}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <SkipBack className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        if (musicRef.current) {
                          if (isPlaying) {
                            musicRef.current.pause()
                            setIsPlaying(false)
                          } else {
                            musicRef.current.play()
                            setIsPlaying(true)
                          }
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </motion.button>
                    <motion.button
                      onClick={nextMusic}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <SkipForward className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Selección de mood */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3 text-center">🎭 Estado de Ánimo</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['party', 'chill', 'energetic'] as const).map((mood) => (
                    <motion.button
                      key={mood}
                      onClick={() => changeMood(mood)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currentMood === mood
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-white/20 text-white/80 hover:bg-white/30'
                      }`}
                    >
                      {mood === 'party' && '🎉'}
                      {mood === 'chill' && '😌'}
                      {mood === 'energetic' && '⚡'}
                      <div className="mt-1 capitalize">{mood}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Botón de cerrar */}
              <motion.button
                onClick={() => setShowSettings(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300"
              >
                Cerrar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Estilos CSS para el slider */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  )
}

export default SoundManager
