// Configuración de características avanzadas para ¡Oh Cañamos?

export interface AppFeatures {
  // Sistema de tarjetas secuenciales
  cardSystem: {
    enabled: boolean
    types: string[]
    animations: boolean
    swipeGestures: boolean
    autoAdvance: boolean
  }
  
  // Efectos de sonido
  soundEffects: {
    enabled: boolean
    masterVolume: number
    effects: {
      cardFlip: boolean
      drink: boolean
      cheer: boolean
      penalty: boolean
      confetti: boolean
      sparkle: boolean
      timerTick: boolean
      bombTick: boolean
      bombExplosion: boolean
      bottleSpin: boolean
      bottleStop: boolean
      rouletteSpin: boolean
      victory: boolean
      gameOver: boolean
      buttonClick: boolean
      buttonHover: boolean
    }
    backgroundMusic: {
      enabled: boolean
      partyMusic: boolean
      chillMusic: boolean
      intenseMusic: boolean
    }
  }
  
  // Efectos de partículas
  particleEffects: {
    enabled: boolean
    types: {
      confetti: boolean
      sparkles: boolean
      fireworks: boolean
      rain: boolean
      spiral: boolean
      float: boolean
    }
    intensity: 'low' | 'medium' | 'high'
    performance: 'optimized' | 'balanced' | 'high'
  }
  
  // Gestos táctiles
  touchGestures: {
    enabled: boolean
    swipe: boolean
    tap: boolean
    doubleTap: boolean
    longPress: boolean
    pinch: boolean
    rotate: boolean
    multiTouch: boolean
  }
  
  // Animaciones avanzadas
  advancedAnimations: {
    enabled: boolean
    morphingShapes: boolean
    liquidEffects: boolean
    floatingIcons: boolean
    waveAnimations: boolean
    particleTrails: boolean
    glitchEffects: boolean
    shimmerEffects: boolean
    breathingAnimations: boolean
    magneticEffects: boolean
    parallaxEffects: boolean
  }
  
  // Tipos de tarjetas
  cardTypes: {
    yoNunca: boolean
    verdadReto: boolean
    charadas: boolean
    quePrefieres: boolean
    quienProbable: boolean
    trivia: boolean
    accionRapida: boolean
    bomba: boolean
    botella: boolean
    ruleta: boolean
    karaoke: boolean
    dibujo: boolean
    baile: boolean
    selfie: boolean
    meme: boolean
    historia: boolean
    poema: boolean
    rap: boolean
    improv: boolean
  }
  
  // Modos de juego
  gameModes: {
    classic: boolean
    bolivia: boolean
    previa: boolean
    fiesta: boolean
    after: boolean
    hot: boolean
    bar: boolean
    pareja: boolean
  }
  
  // Características sociales
  socialFeatures: {
    enabled: boolean
    shareResults: boolean
    screenshots: boolean
    videoRecording: boolean
    leaderboards: boolean
    achievements: boolean
  }
  
  // Personalización
  customization: {
    enabled: boolean
    themes: boolean
    colors: boolean
    fonts: boolean
    animations: boolean
    sounds: boolean
  }
  
  // Accesibilidad
  accessibility: {
    enabled: boolean
    screenReader: boolean
    highContrast: boolean
    largeText: boolean
    reducedMotion: boolean
    colorBlind: boolean
  }
  
  // Rendimiento
  performance: {
    optimization: 'low' | 'medium' | 'high'
    cacheEnabled: boolean
    lazyLoading: boolean
    compression: boolean
    offlineMode: boolean
  }
}

// Configuración por defecto
export const defaultAppFeatures: AppFeatures = {
  cardSystem: {
    enabled: true,
    types: [
      'yo-nunca',
      'verdad-reto',
      'charadas',
      'que-prefieres',
      'quien-probable',
      'trivia',
      'accion-rapida',
      'bomba',
      'botella',
      'ruleta',
      'karaoke',
      'dibujo',
      'baile',
      'selfie',
      'meme',
      'historia',
      'poema',
      'rap',
      'improv'
    ],
    animations: true,
    swipeGestures: true,
    autoAdvance: false
  },
  
  soundEffects: {
    enabled: true,
    masterVolume: 0.7,
    effects: {
      cardFlip: true,
      drink: true,
      cheer: true,
      penalty: true,
      confetti: true,
      sparkle: true,
      timerTick: true,
      bombTick: true,
      bombExplosion: true,
      bottleSpin: true,
      bottleStop: true,
      rouletteSpin: true,
      victory: true,
      gameOver: true,
      buttonClick: true,
      buttonHover: true
    },
    backgroundMusic: {
      enabled: true,
      partyMusic: true,
      chillMusic: true,
      intenseMusic: true
    }
  },
  
  particleEffects: {
    enabled: true,
    types: {
      confetti: true,
      sparkles: true,
      fireworks: true,
      rain: true,
      spiral: true,
      float: true
    },
    intensity: 'medium',
    performance: 'balanced'
  },
  
  touchGestures: {
    enabled: true,
    swipe: true,
    tap: true,
    doubleTap: true,
    longPress: true,
    pinch: true,
    rotate: true,
    multiTouch: true
  },
  
  advancedAnimations: {
    enabled: true,
    morphingShapes: true,
    liquidEffects: true,
    floatingIcons: true,
    waveAnimations: true,
    particleTrails: true,
    glitchEffects: true,
    shimmerEffects: true,
    breathingAnimations: true,
    magneticEffects: true,
    parallaxEffects: true
  },
  
  cardTypes: {
    yoNunca: true,
    verdadReto: true,
    charadas: true,
    quePrefieres: true,
    quienProbable: true,
    trivia: true,
    accionRapida: true,
    bomba: true,
    botella: true,
    ruleta: true,
    karaoke: true,
    dibujo: true,
    baile: true,
    selfie: true,
    meme: true,
    historia: true,
    poema: true,
    rap: true,
    improv: true
  },
  
  gameModes: {
    classic: true,
    bolivia: true,
    previa: true,
    fiesta: true,
    after: true,
    hot: true,
    bar: true,
    pareja: true
  },
  
  socialFeatures: {
    enabled: true,
    shareResults: true,
    screenshots: true,
    videoRecording: false,
    leaderboards: false,
    achievements: false
  },
  
  customization: {
    enabled: true,
    themes: true,
    colors: true,
    fonts: true,
    animations: true,
    sounds: true
  },
  
  accessibility: {
    enabled: true,
    screenReader: true,
    highContrast: true,
    largeText: true,
    reducedMotion: true,
    colorBlind: true
  },
  
  performance: {
    optimization: 'medium',
    cacheEnabled: true,
    lazyLoading: true,
    compression: true,
    offlineMode: true
  }
}

// Configuración para dispositivos de bajo rendimiento
export const lowPerformanceConfig: Partial<AppFeatures> = {
  particleEffects: {
    enabled: true,
    types: {
      confetti: true,
      sparkles: false,
      fireworks: false,
      rain: false,
      spiral: false,
      float: false
    },
    intensity: 'low',
    performance: 'optimized'
  },
  
  advancedAnimations: {
    enabled: false,
    morphingShapes: false,
    liquidEffects: false,
    floatingIcons: false,
    waveAnimations: false,
    particleTrails: false,
    glitchEffects: false,
    shimmerEffects: false,
    breathingAnimations: false,
    magneticEffects: false,
    parallaxEffects: false
  },
  
  soundEffects: {
    enabled: true,
    masterVolume: 0.5,
    effects: {
      cardFlip: true,
      drink: true,
      cheer: false,
      penalty: true,
      confetti: false,
      sparkle: false,
      timerTick: false,
      bombTick: true,
      bombExplosion: true,
      bottleSpin: true,
      bottleStop: true,
      rouletteSpin: true,
      victory: true,
      gameOver: true,
      buttonClick: false,
      buttonHover: false
    },
    backgroundMusic: {
      enabled: false,
      partyMusic: false,
      chillMusic: false,
      intenseMusic: false
    }
  },
  
  performance: {
    optimization: 'high',
    cacheEnabled: true,
    lazyLoading: true,
    compression: true,
    offlineMode: true
  }
}

// Configuración para dispositivos de alto rendimiento
export const highPerformanceConfig: Partial<AppFeatures> = {
  particleEffects: {
    enabled: true,
    types: {
      confetti: true,
      sparkles: true,
      fireworks: true,
      rain: true,
      spiral: true,
      float: true
    },
    intensity: 'high',
    performance: 'high'
  },
  
  advancedAnimations: {
    enabled: true,
    morphingShapes: true,
    liquidEffects: true,
    floatingIcons: true,
    waveAnimations: true,
    particleTrails: true,
    glitchEffects: true,
    shimmerEffects: true,
    breathingAnimations: true,
    magneticEffects: true,
    parallaxEffects: true
  },
  
  soundEffects: {
    enabled: true,
    masterVolume: 0.8,
    effects: {
      cardFlip: true,
      drink: true,
      cheer: true,
      penalty: true,
      confetti: true,
      sparkle: true,
      timerTick: true,
      bombTick: true,
      bombExplosion: true,
      bottleSpin: true,
      bottleStop: true,
      rouletteSpin: true,
      victory: true,
      gameOver: true,
      buttonClick: true,
      buttonHover: true
    },
    backgroundMusic: {
      enabled: true,
      partyMusic: true,
      chillMusic: true,
      intenseMusic: true
    }
  },
  
  performance: {
    optimization: 'low',
    cacheEnabled: true,
    lazyLoading: false,
    compression: false,
    offlineMode: true
  }
}

// Función para detectar el rendimiento del dispositivo
export const detectDevicePerformance = (): 'low' | 'medium' | 'high' => {
  const memory = (navigator as any).deviceMemory || 4
  const cores = (navigator as any).hardwareConcurrency || 4
  const connection = (navigator as any).connection?.effectiveType || '4g'
  
  if (memory < 4 || cores < 4 || connection === 'slow-2g' || connection === '2g') {
    return 'low'
  } else if (memory >= 8 && cores >= 8 && connection === '4g') {
    return 'high'
  } else {
    return 'medium'
  }
}

// Función para obtener la configuración optimizada
export const getOptimizedConfig = (): AppFeatures => {
  const performance = detectDevicePerformance()
  
  switch (performance) {
    case 'low':
      return { ...defaultAppFeatures, ...lowPerformanceConfig }
    case 'high':
      return { ...defaultAppFeatures, ...highPerformanceConfig }
    default:
      return defaultAppFeatures
  }
}

// Función para validar configuración
export const validateConfig = (config: AppFeatures): boolean => {
  // Validaciones básicas
  if (!config.cardSystem.enabled) return false
  if (config.cardSystem.types.length === 0) return false
  if (config.soundEffects.masterVolume < 0 || config.soundEffects.masterVolume > 1) return false
  
  return true
}

// Función para exportar configuración
export const exportConfig = (config: AppFeatures): string => {
  return JSON.stringify(config, null, 2)
}

// Función para importar configuración
export const importConfig = (configString: string): AppFeatures => {
  try {
    const config = JSON.parse(configString)
    return { ...defaultAppFeatures, ...config }
  } catch (error) {
    console.error('Error al importar configuración:', error)
    return defaultAppFeatures
  }
}

export default {
  defaultAppFeatures,
  lowPerformanceConfig,
  highPerformanceConfig,
  detectDevicePerformance,
  getOptimizedConfig,
  validateConfig,
  exportConfig,
  importConfig
}
