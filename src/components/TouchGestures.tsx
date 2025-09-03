import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Hand, 
  Move, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Smartphone,
  Zap,
  Star,
  Heart,
  Crown,
  Target,
  Settings,
  X,
  Check,
  AlertTriangle
} from 'lucide-react'

interface GestureConfig {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  enabled: boolean
  sensitivity: number
  action: string
}

interface TouchPoint {
  x: number
  y: number
  timestamp: number
}

interface GestureState {
  isTracking: boolean
  startPoint: TouchPoint | null
  currentPoint: TouchPoint | null
  velocity: { x: number; y: number }
  scale: number
  rotation: number
  shakeCount: number
}

const TouchGestures: React.FC = () => {
  const [gestures, setGestures] = useState<GestureConfig[]>([
    {
      id: 'swipe-left',
      name: 'Swipe Izquierda',
      description: 'Deslizar hacia la izquierda',
      icon: <Move className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.7,
      action: 'Navegar atrás'
    },
    {
      id: 'swipe-right',
      name: 'Swipe Derecha',
      description: 'Deslizar hacia la derecha',
      icon: <Move className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.7,
      action: 'Navegar adelante'
    },
    {
      id: 'swipe-up',
      name: 'Swipe Arriba',
      description: 'Deslizar hacia arriba',
      icon: <Move className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.7,
      action: 'Mostrar menú'
    },
    {
      id: 'swipe-down',
      name: 'Swipe Abajo',
      description: 'Deslizar hacia abajo',
      icon: <Move className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.7,
      action: 'Ocultar menú'
    },
    {
      id: 'pinch-in',
      name: 'Pinch In',
      description: 'Pellizcar para acercar',
      icon: <ZoomIn className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.8,
      action: 'Zoom in'
    },
    {
      id: 'pinch-out',
      name: 'Pinch Out',
      description: 'Pellizcar para alejar',
      icon: <ZoomOut className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.8,
      action: 'Zoom out'
    },
    {
      id: 'rotate',
      name: 'Rotación',
      description: 'Rotar con dos dedos',
      icon: <RotateCcw className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.6,
      action: 'Rotar elemento'
    },
    {
      id: 'shake',
      name: 'Agitar',
      description: 'Agitar el dispositivo',
      icon: <Smartphone className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.9,
      action: 'Acción aleatoria'
    },
    {
      id: 'double-tap',
      name: 'Doble Tap',
      description: 'Tocar dos veces rápidamente',
      icon: <Target className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.7,
      action: 'Acción rápida'
    },
    {
      id: 'long-press',
      name: 'Presión Larga',
      description: 'Mantener presionado',
      icon: <Hand className="w-5 h-5" />,
      enabled: true,
      sensitivity: 0.8,
      action: 'Menú contextual'
    }
  ])

  const [gestureState, setGestureState] = useState<GestureState>({
    isTracking: false,
    startPoint: null,
    currentPoint: null,
    velocity: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
    shakeCount: 0
  })

  const [showSettings, setShowSettings] = useState(false)
  const [showGestureFeedback, setShowGestureFeedback] = useState(false)
  const [lastGesture, setLastGesture] = useState<string>('')
  const [gestureHistory, setGestureHistory] = useState<string[]>([])

  const touchRef = useRef<HTMLDivElement>(null)
  const gestureTimeoutRef = useRef<NodeJS.Timeout>()
  const shakeTimeoutRef = useRef<NodeJS.Timeout>()
  const lastTapRef = useRef<number>(0)
  const longPressTimeoutRef = useRef<NodeJS.Timeout>()

  // Cargar configuración guardada
  useEffect(() => {
    const savedGestures = localStorage.getItem('gestureConfig')
    if (savedGestures) {
      const savedData = JSON.parse(savedGestures)
      // Fusionar datos guardados con los iconos originales
      setGestures(prevGestures => 
        prevGestures.map(gesture => {
          const savedGesture = savedData.find((g: any) => g.id === gesture.id)
          if (savedGesture) {
            return {
              ...gesture,
              enabled: savedGesture.enabled,
              sensitivity: savedGesture.sensitivity
            }
          }
          return gesture
        })
      )
    }
  }, [])

  // Guardar configuración
  useEffect(() => {
    // Solo guardar las propiedades serializables, no los elementos React
    const serializableGestures = gestures.map(gesture => ({
      id: gesture.id,
      name: gesture.name,
      description: gesture.description,
      enabled: gesture.enabled,
      sensitivity: gesture.sensitivity,
      action: gesture.action
    }))
    localStorage.setItem('gestureConfig', JSON.stringify(serializableGestures))
  }, [gestures])

  // Detectar gestos de agitar
  useEffect(() => {
    let lastX = 0
    let lastY = 0
    let lastZ = 0
    let shakeCount = 0

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (!gestures.find(g => g.id === 'shake')?.enabled) return

      const acceleration = event.accelerationIncludingGravity
      if (!acceleration) return

      const { x, y, z } = acceleration
      if (x === null || y === null || z === null) return
      
      const deltaX = Math.abs(x - lastX)
      const deltaY = Math.abs(y - lastY)
      const deltaZ = Math.abs(z - lastZ)

      const shakeGesture = gestures.find(g => g.id === 'shake')
      const threshold = 15 * (1 - (shakeGesture?.sensitivity || 0.9))

      if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
        shakeCount++
        
        if (shakeCount > 3) {
          handleGesture('shake')
          shakeCount = 0
        }
      }

      lastX = x
      lastY = y
      lastZ = z
    }

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion)
    }

    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleDeviceMotion)
      }
    }
  }, [gestures])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      const point: TouchPoint = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      }

      setGestureState(prev => ({
        ...prev,
        isTracking: true,
        startPoint: point,
        currentPoint: point,
        velocity: { x: 0, y: 0 }
      }))

      // Configurar presión larga
      longPressTimeoutRef.current = setTimeout(() => {
        if (gestures.find(g => g.id === 'long-press')?.enabled) {
          handleGesture('long-press')
        }
      }, 500)
    }
  }, [gestures])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      const currentPoint: TouchPoint = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      }

      setGestureState(prev => {
        if (!prev.startPoint) return prev

        const deltaTime = currentPoint.timestamp - prev.startPoint.timestamp
        const velocity = {
          x: (currentPoint.x - prev.startPoint.x) / deltaTime,
          y: (currentPoint.y - prev.startPoint.y) / deltaTime
        }

        return {
          ...prev,
          currentPoint,
          velocity
        }
      })
    } else if (e.touches.length === 2) {
      // Gestos de pinch y rotación
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]

      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )

      const currentAngle = Math.atan2(
        touch2.clientY - touch1.clientY,
        touch2.clientX - touch1.clientX
      )

      setGestureState(prev => {
        if (!prev.startPoint) return prev

        const startDistance = Math.hypot(
          prev.currentPoint!.x - prev.startPoint.x,
          prev.currentPoint!.y - prev.startPoint.y
        )

        const scale = currentDistance / startDistance
        const rotation = currentAngle - Math.atan2(
          prev.currentPoint!.y - prev.startPoint.y,
          prev.currentPoint!.x - prev.startPoint.x
        )

        return {
          ...prev,
          scale,
          rotation
        }
      })
    }
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length === 0) {
      const endTime = Date.now()
      
      setGestureState(prev => {
        if (!prev.startPoint || !prev.currentPoint) return prev

        const deltaX = prev.currentPoint.x - prev.startPoint.x
        const deltaY = prev.currentPoint.y - prev.startPoint.y
        const deltaTime = endTime - prev.startPoint.timestamp

        // Detectar swipe
        const minSwipeDistance = 50
        const minSwipeVelocity = 0.3

        if (Math.abs(deltaX) > minSwipeDistance && Math.abs(prev.velocity.x) > minSwipeVelocity) {
          if (deltaX > 0) {
            handleGesture('swipe-right')
          } else {
            handleGesture('swipe-left')
          }
        } else if (Math.abs(deltaY) > minSwipeDistance && Math.abs(prev.velocity.y) > minSwipeVelocity) {
          if (deltaY > 0) {
            handleGesture('swipe-down')
          } else {
            handleGesture('swipe-up')
          }
        }

        // Detectar doble tap
        const timeSinceLastTap = endTime - lastTapRef.current
        if (timeSinceLastTap < 300 && timeSinceLastTap > 50) {
          if (gestures.find(g => g.id === 'double-tap')?.enabled) {
            handleGesture('double-tap')
          }
        }
        lastTapRef.current = endTime

        // Detectar pinch
        if (Math.abs(prev.scale - 1) > 0.1) {
          if (prev.scale > 1) {
            handleGesture('pinch-out')
          } else {
            handleGesture('pinch-in')
          }
        }

        // Detectar rotación
        if (Math.abs(prev.rotation) > 0.3) {
          handleGesture('rotate')
        }

        return {
          ...prev,
          isTracking: false,
          startPoint: null,
          currentPoint: null,
          scale: 1,
          rotation: 0
        }
      })

      // Limpiar timeout de presión larga
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current)
      }
    }
  }, [gestures])

  const handleGesture = (gestureId: string) => {
    const gesture = gestures.find(g => g.id === gestureId)
    if (!gesture?.enabled) return

    setLastGesture(gestureId)
    setGestureHistory(prev => [gestureId, ...prev.slice(0, 9)])
    setShowGestureFeedback(true)

    // Ejecutar acción del gesto
    executeGestureAction(gestureId)

    // Ocultar feedback después de 2 segundos
    setTimeout(() => {
      setShowGestureFeedback(false)
    }, 2000)
  }

  const executeGestureAction = (gestureId: string) => {
    switch (gestureId) {
      case 'swipe-left':
        // Navegar atrás
        if (window.history.length > 1) {
          window.history.back()
        }
        break
      case 'swipe-right':
        // Navegar adelante
        window.history.forward()
        break
      case 'swipe-up':
        // Mostrar menú
        console.log('Mostrar menú')
        break
      case 'swipe-down':
        // Ocultar menú
        console.log('Ocultar menú')
        break
      case 'pinch-in':
        // Zoom in
        console.log('Zoom in')
        break
      case 'pinch-out':
        // Zoom out
        console.log('Zoom out')
        break
      case 'rotate':
        // Rotar elemento
        console.log('Rotar elemento')
        break
      case 'shake':
        // Acción aleatoria
        const actions = ['🎉', '🎊', '✨', '🌟', '💫']
        const randomAction = actions[Math.floor(Math.random() * actions.length)]
        console.log(`Acción aleatoria: ${randomAction}`)
        break
      case 'double-tap':
        // Acción rápida
        console.log('Acción rápida')
        break
      case 'long-press':
        // Menú contextual
        console.log('Menú contextual')
        break
    }
  }

  const toggleGesture = (gestureId: string) => {
    setGestures(prev => prev.map(g => 
      g.id === gestureId ? { ...g, enabled: !g.enabled } : g
    ))
  }

  const updateSensitivity = (gestureId: string, sensitivity: number) => {
    setGestures(prev => prev.map(g => 
      g.id === gestureId ? { ...g, sensitivity } : g
    ))
  }

  const getGestureIcon = (gestureId: string) => {
    switch (gestureId) {
      case 'swipe-left': return '⬅️'
      case 'swipe-right': return '➡️'
      case 'swipe-up': return '⬆️'
      case 'swipe-down': return '⬇️'
      case 'pinch-in': return '👌'
      case 'pinch-out': return '🤏'
      case 'rotate': return '🔄'
      case 'shake': return '📱'
      case 'double-tap': return '👆👆'
      case 'long-press': return '👆⏱️'
      default: return '👆'
    }
  }

  return (
    <>
      {/* Área de detección de gestos */}
      <div
        ref={touchRef}
        className="fixed inset-0 z-30 pointer-events-none"
        onTouchStart={handleTouchStart as any}
        onTouchMove={handleTouchMove as any}
        onTouchEnd={handleTouchEnd as any}
      />

      {/* Botón flotante de gestos */}
      <div className="fixed bottom-4 left-20 z-50">
        <motion.button
          onClick={() => setShowSettings(!showSettings)}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        >
          <Hand className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Panel de configuración de gestos */}
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
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">👆 Configuración de Gestos</h2>
                <motion.button
                  onClick={() => setShowSettings(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Lista de gestos */}
              <div className="space-y-4">
                {gestures.map((gesture) => (
                  <motion.div
                    key={gesture.id}
                    className="bg-white/10 rounded-2xl p-4 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-2xl">{getGestureIcon(gesture.id)}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{gesture.name}</h3>
                        <p className="text-white/70 text-sm">{gesture.description}</p>
                        <p className="text-white/50 text-xs">Acción: {gesture.action}</p>
                      </div>
                      <motion.button
                        onClick={() => toggleGesture(gesture.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          gesture.enabled
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {gesture.enabled ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </motion.button>
                    </div>

                    {/* Control de sensibilidad */}
                    <div className="flex items-center gap-3">
                      <span className="text-white/70 text-sm min-w-[80px]">Sensibilidad:</span>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={gesture.sensitivity}
                        onChange={(e) => updateSensitivity(gesture.id, parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        disabled={!gesture.enabled}
                      />
                      <span className="text-white/60 text-sm w-12 text-right">
                        {Math.round(gesture.sensitivity * 100)}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Historial de gestos */}
              <div className="mt-6 bg-white/10 rounded-2xl p-4">
                <h3 className="text-white font-bold mb-3">📱 Historial de Gestos</h3>
                <div className="flex flex-wrap gap-2">
                  {gestureHistory.map((gesture, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {getGestureIcon(gesture)} {gestures.find(g => g.id === gesture)?.name}
                    </motion.div>
                  ))}
                  {gestureHistory.length === 0 && (
                    <p className="text-white/50 text-sm">No se han detectado gestos aún</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback de gesto detectado */}
      <AnimatePresence>
        {showGestureFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 border-4 border-white/30 shadow-2xl text-center">
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                {getGestureIcon(lastGesture)}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                ¡Gesto Detectado!
              </h3>
              
              <div className="text-white/90">
                <div className="text-xl font-bold mb-2">
                  {gestures.find(g => g.id === lastGesture)?.name}
                </div>
                <div className="text-sm">
                  {gestures.find(g => g.id === lastGesture)?.action}
                </div>
              </div>
            </div>
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
          background: linear-gradient(45deg, #10b981, #3b82f6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  )
}

export default TouchGestures
