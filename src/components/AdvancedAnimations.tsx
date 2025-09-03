import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion'
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
  Lightning, 
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

interface MorphingShapeProps {
  isActive: boolean
  color?: string
  size?: number
  duration?: number
}

// Forma que cambia dinámicamente
export const MorphingShape: React.FC<MorphingShapeProps> = ({
  isActive,
  color = '#FF6B6B',
  size = 100,
  duration = 2
}) => {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start({
        borderRadius: [
          '50%',
          '0%',
          '50%',
          '25%',
          '50%'
        ],
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.2, 0.8, 1.1, 1],
        transition: {
          duration,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    } else {
      controls.stop()
    }
  }, [isActive, controls, duration])

  return (
    <motion.div
      animate={controls}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%'
      }}
      className="shadow-lg"
    />
  )
}

interface LiquidAnimationProps {
  isActive: boolean
  color?: string
  height?: number
  width?: number
}

// Animación de líquido
export const LiquidAnimation: React.FC<LiquidAnimationProps> = ({
  isActive,
  color = '#4ECDC4',
  height = 200,
  width = 100
}) => {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start({
        y: [0, -20, 0, -15, 0],
        scaleY: [1, 1.1, 0.9, 1.05, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    } else {
      controls.stop()
    }
  }, [isActive, controls])

  return (
    <motion.div
      animate={controls}
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="shadow-lg"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          scaleY: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          right: '20%',
          height: '60%',
          backgroundColor: 'rgba(255,255,255,0.3)',
          borderRadius: '50%'
        }}
      />
    </motion.div>
  )
}

interface FloatingIconsProps {
  icons: any[]
  isActive: boolean
  count?: number
  duration?: number
}

// Iconos flotantes
export const FloatingIcons: React.FC<FloatingIconsProps> = ({
  icons,
  isActive,
  count = 10,
  duration = 4
}) => {
  const [floatingIcons, setFloatingIcons] = useState<Array<{
    id: number
    icon: any
    x: number
    y: number
    delay: number
  }>>([])

  useEffect(() => {
    if (isActive) {
      const newIcons = Array.from({ length: count }, (_, i) => ({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * duration
      }))
      setFloatingIcons(newIcons)
    } else {
      setFloatingIcons([])
    }
  }, [isActive, count, icons, duration])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {floatingIcons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-white/30"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <item.icon size={24} />
        </motion.div>
      ))}
    </div>
  )
}

interface WaveAnimationProps {
  isActive: boolean
  color?: string
  height?: number
  width?: number
  waves?: number
}

// Animación de ondas
export const WaveAnimation: React.FC<WaveAnimationProps> = ({
  isActive,
  color = '#FFD700',
  height = 100,
  width = 300,
  waves = 3
}) => {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start({
        x: [0, -50, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    } else {
      controls.stop()
    }
  }, [isActive, controls])

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      {Array.from({ length: waves }, (_, i) => (
        <motion.div
          key={i}
          animate={controls}
          style={{
            position: 'absolute',
            top: `${(i * 100) / waves}%`,
            left: 0,
            right: 0,
            height: `${100 / waves}%`,
            backgroundColor: color,
            opacity: 0.3 + (i * 0.2),
            borderRadius: '50%',
            transform: 'scaleX(2)'
          }}
        />
      ))}
    </div>
  )
}

interface ParticleTrailProps {
  isActive: boolean
  color?: string
  count?: number
  duration?: number
}

// Rastro de partículas
export const ParticleTrail: React.FC<ParticleTrailProps> = ({
  isActive,
  color = '#FF6B6B',
  count = 20,
  duration = 2
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
  }>>([])

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: (i * duration) / count
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [isActive, count, duration])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: color
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

interface GlitchEffectProps {
  children: React.ReactNode
  isActive: boolean
  intensity?: number
}

// Efecto de glitch
export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  children,
  isActive,
  intensity = 0.1
}) => {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start({
        x: [0, intensity * 10, -intensity * 10, 0],
        y: [0, intensity * 5, -intensity * 5, 0],
        filter: [
          'hue-rotate(0deg)',
          'hue-rotate(90deg)',
          'hue-rotate(180deg)',
          'hue-rotate(0deg)'
        ],
        transition: {
          duration: 0.1,
          repeat: Infinity,
          ease: "linear"
        }
      })
    } else {
      controls.stop()
    }
  }, [isActive, controls, intensity])

  return (
    <motion.div animate={controls}>
      {children}
    </motion.div>
  )
}

interface ShimmerEffectProps {
  children: React.ReactNode
  isActive: boolean
  color?: string
}

// Efecto de brillo
export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  children,
  isActive,
  color = 'rgba(255,255,255,0.5)'
}) => {
  return (
    <div className="relative overflow-hidden">
      {children}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            transform: 'skewX(-20deg)'
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  )
}

interface BreathingAnimationProps {
  children: React.ReactNode
  isActive: boolean
  intensity?: number
  duration?: number
}

// Animación de respiración
export const BreathingAnimation: React.FC<BreathingAnimationProps> = ({
  children,
  isActive,
  intensity = 0.1,
  duration = 3
}) => {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start({
        scale: [1, 1 + intensity, 1],
        opacity: [1, 0.8, 1],
        transition: {
          duration,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    } else {
      controls.stop()
    }
  }, [isActive, controls, intensity, duration])

  return (
    <motion.div animate={controls}>
      {children}
    </motion.div>
  )
}

interface MagneticEffectProps {
  children: React.ReactNode
  strength?: number
}

// Efecto magnético
export const MagneticEffect: React.FC<MagneticEffectProps> = ({
  children,
  strength = 0.3
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      setMousePosition({ x, y })
    }
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: isHovered ? mousePosition.x * strength : 0,
        y: isHovered ? mousePosition.y * strength : 0
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxEffectProps {
  children: React.ReactNode
  speed?: number
  direction?: 'horizontal' | 'vertical'
}

// Efecto parallax
export const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical'
}) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const y = direction === 'vertical' ? scrollY * speed : 0
  const x = direction === 'horizontal' ? scrollY * speed : 0

  return (
    <motion.div
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
    >
      {children}
    </motion.div>
  )
}

// Hook para animaciones personalizadas
export const useAdvancedAnimations = () => {
  const [activeAnimations, setActiveAnimations] = useState<{
    morphing: boolean
    liquid: boolean
    floating: boolean
    waves: boolean
    particles: boolean
    glitch: boolean
    shimmer: boolean
    breathing: boolean
  }>({
    morphing: false,
    liquid: false,
    floating: false,
    waves: false,
    particles: false,
    glitch: false,
    shimmer: false,
    breathing: false
  })

  const triggerAnimation = (animationType: keyof typeof activeAnimations, duration: number = 3000) => {
    setActiveAnimations(prev => ({ ...prev, [animationType]: true }))
    
    setTimeout(() => {
      setActiveAnimations(prev => ({ ...prev, [animationType]: false }))
    }, duration)
  }

  const triggerMorphing = () => triggerAnimation('morphing', 5000)
  const triggerLiquid = () => triggerAnimation('liquid', 4000)
  const triggerFloating = () => triggerAnimation('floating', 3000)
  const triggerWaves = () => triggerAnimation('waves', 2500)
  const triggerParticles = () => triggerAnimation('particles', 2000)
  const triggerGlitch = () => triggerAnimation('glitch', 1000)
  const triggerShimmer = () => triggerAnimation('shimmer', 1500)
  const triggerBreathing = () => triggerAnimation('breathing', 3000)

  return {
    activeAnimations,
    triggerAnimation,
    triggerMorphing,
    triggerLiquid,
    triggerFloating,
    triggerWaves,
    triggerParticles,
    triggerGlitch,
    triggerShimmer,
    triggerBreathing
  }
}

export default {
  MorphingShape,
  LiquidAnimation,
  FloatingIcons,
  WaveAnimation,
  ParticleTrail,
  GlitchEffect,
  ShimmerEffect,
  BreathingAnimation,
  MagneticEffect,
  ParallaxEffect,
  useAdvancedAnimations
}
