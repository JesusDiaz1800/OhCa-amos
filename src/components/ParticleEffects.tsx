import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Beer, 
  Wine, 
  Sparkles, 
  Heart, 
  Star, 
  Crown, 
  Flame, 
  PartyPopper, 
  Camera, 
  Globe, 
  MapPin, 
  Zap, 
  Brain, 
  Gamepad2, 
  Flag, 
  Dice, 
  Cards, 
  Clock, 
  Award, 
  TrendingUp,
  Zap,
  Trophy,
  Music,
  Mic,
  Volume2,
  VolumeX,
  Settings,
  RotateCcw,
  Play,
  Pause,
  SkipBack,
  Volume1,
  Target,
  Users,
  Check,
  X,
  Timer,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Home,
  Share2,
  Download
} from 'lucide-react'

interface Particle {
  id: number
  icon: any
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: 'float' | 'sparkle' | 'confetti' | 'firework' | 'rain' | 'spiral'
}

interface ParticleEffectsProps {
  type: 'confetti' | 'sparkles' | 'fireworks' | 'rain' | 'spiral' | 'float'
  count?: number
  duration?: number
  isActive: boolean
  onComplete?: () => void
  customIcons?: any[]
  colors?: string[]
  size?: 'small' | 'medium' | 'large'
  direction?: 'up' | 'down' | 'left' | 'right' | 'random'
}

const ParticleEffects: React.FC<ParticleEffectsProps> = ({
  type,
  count = 50,
  duration = 3000,
  isActive,
  onComplete,
  customIcons,
  colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  size = 'medium',
  direction = 'up'
}) => {
  const [particles, setParticles] = useState<Particle[]>([])

  // Iconos por defecto
  const defaultIcons = [
    Beer, Wine, Sparkles, Heart, Star, Crown, Flame, PartyPopper,
    Camera, Globe, MapPin, Lightning, Brain, Gamepad2, Flag,
    Dice, Cards, Clock, Award, TrendingUp, Zap, Trophy, Music
  ]

  const icons = customIcons || defaultIcons

  // Configuraciones por tipo
  const getParticleConfig = (type: string) => {
    switch (type) {
      case 'confetti':
        return {
          icons: ['🎉', '🎊', '✨', '🌟', '💫', '⭐', '🍺', '🥂', '🏆', '👑', '💎', '🔥'],
          animation: 'fall',
          sizeRange: { min: 20, max: 40 },
          speedRange: { min: 2, max: 4 }
        }
      case 'sparkles':
        return {
          icons: defaultIcons,
          animation: 'sparkle',
          sizeRange: { min: 15, max: 30 },
          speedRange: { min: 1, max: 3 }
        }
      case 'fireworks':
        return {
          icons: ['✨', '🌟', '💫', '⭐', '🔥', '💥'],
          animation: 'explode',
          sizeRange: { min: 25, max: 50 },
          speedRange: { min: 3, max: 6 }
        }
      case 'rain':
        return {
          icons: ['💧', '🌧️', '☔', '🌦️'],
          animation: 'fall',
          sizeRange: { min: 10, max: 25 },
          speedRange: { min: 1, max: 2 }
        }
      case 'spiral':
        return {
          icons: defaultIcons,
          animation: 'spiral',
          sizeRange: { min: 15, max: 35 },
          speedRange: { min: 2, max: 4 }
        }
      case 'float':
        return {
          icons: defaultIcons,
          animation: 'float',
          sizeRange: { min: 20, max: 40 },
          speedRange: { min: 1, max: 3 }
        }
      default:
        return {
          icons: defaultIcons,
          animation: 'float',
          sizeRange: { min: 20, max: 40 },
          speedRange: { min: 1, max: 3 }
        }
    }
  }

  const generateParticles = () => {
    const config = getParticleConfig(type)
    const newParticles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const particle: Particle = {
        id: i,
        icon: config.icons[Math.floor(Math.random() * config.icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (config.sizeRange.max - config.sizeRange.min) + config.sizeRange.min,
        delay: Math.random() * 1000,
        duration: config.speedRange.min + Math.random() * (config.speedRange.max - config.speedRange.min),
        type: type as any
      }
      newParticles.push(particle)
    }

    setParticles(newParticles)
  }

  useEffect(() => {
    if (isActive) {
      generateParticles()
      
      if (onComplete) {
        setTimeout(onComplete, duration)
      }
    }
  }, [isActive, type, count])

  const getAnimationVariants = (particle: Particle) => {
    const baseVariants = {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 }
    }

    switch (type) {
      case 'confetti':
        return {
          initial: { 
            opacity: 0, 
            scale: 0, 
            y: -50,
            rotate: 0
          },
          animate: { 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1, 1, 0],
            y: [0, window.innerHeight + 100],
            rotate: [0, 360, 720],
            x: [0, Math.random() * 200 - 100]
          },
          exit: { opacity: 0, scale: 0 }
        }

      case 'sparkles':
        return {
          initial: { 
            opacity: 0, 
            scale: 0,
            x: particle.x,
            y: particle.y
          },
          animate: { 
            opacity: [0, 0.8, 0], 
            scale: [0, 1, 0],
            x: [particle.x, particle.x + Math.random() * 100 - 50],
            y: [particle.y, particle.y + Math.random() * 100 - 50],
            rotate: [0, 360]
          },
          exit: { opacity: 0, scale: 0 }
        }

      case 'fireworks':
        return {
          initial: { 
            opacity: 0, 
            scale: 0,
            x: '50%',
            y: '50%'
          },
          animate: { 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            rotate: [0, 360]
          },
          exit: { opacity: 0, scale: 0 }
        }

      case 'rain':
        return {
          initial: { 
            opacity: 0, 
            scale: 0,
            y: -50
          },
          animate: { 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1, 1, 0],
            y: [0, window.innerHeight + 50],
            x: [0, Math.random() * 50 - 25]
          },
          exit: { opacity: 0, scale: 0 }
        }

      case 'spiral':
        return {
          initial: { 
            opacity: 0, 
            scale: 0,
            x: '50%',
            y: '50%'
          },
          animate: { 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
            x: [0, Math.cos(particle.id * 0.5) * 200],
            y: [0, Math.sin(particle.id * 0.5) * 200],
            rotate: [0, 720]
          },
          exit: { opacity: 0, scale: 0 }
        }

      case 'float':
        return {
          initial: { 
            opacity: 0, 
            scale: 0,
            y: 0
          },
          animate: { 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1, 1, 0],
            y: [0, -100],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360]
          },
          exit: { opacity: 0, scale: 0 }
        }

      default:
        return baseVariants
    }
  }

  const getParticleStyle = (particle: Particle) => {
    const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1
    const color = colors[Math.floor(Math.random() * colors.length)]

    return {
      position: 'absolute' as const,
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      fontSize: `${particle.size * sizeMultiplier}px`,
      color: color,
      pointerEvents: 'none' as const,
      zIndex: 50
    }
  }

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            style={getParticleStyle(particle)}
            variants={getAnimationVariants(particle)}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeOut"
            }}
          >
            {typeof particle.icon === 'string' ? (
              <span>{particle.icon}</span>
            ) : (
              <particle.icon size={particle.size} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Componentes específicos para diferentes efectos
export const ConfettiEffect: React.FC<{ isActive: boolean; onComplete?: () => void }> = ({ 
  isActive, 
  onComplete 
}) => (
  <ParticleEffects
    type="confetti"
    count={100}
    duration={3000}
    isActive={isActive}
    onComplete={onComplete}
    size="large"
  />
)

export const SparkleEffect: React.FC<{ isActive: boolean; onComplete?: () => void }> = ({ 
  isActive, 
  onComplete 
}) => (
  <ParticleEffects
    type="sparkles"
    count={30}
    duration={2000}
    isActive={isActive}
    onComplete={onComplete}
    size="medium"
  />
)

export const FireworkEffect: React.FC<{ isActive: boolean; onComplete?: () => void }> = ({ 
  isActive, 
  onComplete 
}) => (
  <ParticleEffects
    type="fireworks"
    count={20}
    duration={2500}
    isActive={isActive}
    onComplete={onComplete}
    size="large"
  />
)

export const RainEffect: React.FC<{ isActive: boolean; onComplete?: () => void }> = ({ 
  isActive, 
  onComplete 
}) => (
  <ParticleEffects
    type="rain"
    count={80}
    duration={4000}
    isActive={isActive}
    onComplete={onComplete}
    size="small"
  />
)

export const SpiralEffect: React.FC<{ isActive: boolean; onComplete?: () => void }> = ({ 
  isActive, 
  onComplete 
}) => (
  <ParticleEffects
    type="spiral"
    count={40}
    duration={3000}
    isActive={isActive}
    onComplete={onComplete}
    size="medium"
  />
)

export const FloatEffect: React.FC<{ isActive: boolean; onComplete?: () => void }> = ({ 
  isActive, 
  onComplete 
}) => (
  <ParticleEffects
    type="float"
    count={25}
    duration={2500}
    isActive={isActive}
    onComplete={onComplete}
    size="medium"
  />
)

// Hook personalizado para efectos de partículas
export const useParticleEffects = () => {
  const [activeEffects, setActiveEffects] = useState<{
    confetti: boolean
    sparkles: boolean
    fireworks: boolean
    rain: boolean
    spiral: boolean
    float: boolean
  }>({
    confetti: false,
    sparkles: false,
    fireworks: false,
    rain: false,
    spiral: false,
    float: false
  })

  const triggerEffect = (effectType: keyof typeof activeEffects, duration: number = 3000) => {
    setActiveEffects(prev => ({ ...prev, [effectType]: true }))
    
    setTimeout(() => {
      setActiveEffects(prev => ({ ...prev, [effectType]: false }))
    }, duration)
  }

  const triggerConfetti = () => triggerEffect('confetti', 3000)
  const triggerSparkles = () => triggerEffect('sparkles', 2000)
  const triggerFireworks = () => triggerEffect('fireworks', 2500)
  const triggerRain = () => triggerEffect('rain', 4000)
  const triggerSpiral = () => triggerEffect('spiral', 3000)
  const triggerFloat = () => triggerEffect('float', 2500)

  return {
    activeEffects,
    triggerEffect,
    triggerConfetti,
    triggerSparkles,
    triggerFireworks,
    triggerRain,
    triggerSpiral,
    triggerFloat
  }
}

export default ParticleEffects
