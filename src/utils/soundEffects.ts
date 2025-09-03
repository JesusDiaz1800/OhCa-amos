// Sistema avanzado de efectos de sonido para ¡Oh Cañamos?

interface SoundEffect {
  id: string
  url: string
  volume: number
  loop: boolean
  preload: boolean
}

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private isEnabled: boolean = true
  private masterVolume: number = 0.7
  private currentMusic: HTMLAudioElement | null = null

  // Efectos de sonido disponibles
  private soundEffects: SoundEffect[] = [
    {
      id: 'card-flip',
      url: '/sounds/card-flip.mp3',
      volume: 0.6,
      loop: false,
      preload: true
    },
    {
      id: 'drink',
      url: '/sounds/drink.mp3',
      volume: 0.8,
      loop: false,
      preload: true
    },
    {
      id: 'cheer',
      url: '/sounds/cheer.mp3',
      volume: 0.7,
      loop: false,
      preload: true
    },
    {
      id: 'penalty',
      url: '/sounds/penalty.mp3',
      volume: 0.6,
      loop: false,
      preload: true
    },
    {
      id: 'confetti',
      url: '/sounds/confetti.mp3',
      volume: 0.5,
      loop: false,
      preload: true
    },
    {
      id: 'sparkle',
      url: '/sounds/sparkle.mp3',
      volume: 0.4,
      loop: false,
      preload: true
    },
    {
      id: 'timer-tick',
      url: '/sounds/timer-tick.mp3',
      volume: 0.3,
      loop: false,
      preload: true
    },
    {
      id: 'bomb-tick',
      url: '/sounds/bomb-tick.mp3',
      volume: 0.5,
      loop: false,
      preload: true
    },
    {
      id: 'bomb-explosion',
      url: '/sounds/bomb-explosion.mp3',
      volume: 0.8,
      loop: false,
      preload: true
    },
    {
      id: 'bottle-spin',
      url: '/sounds/bottle-spin.mp3',
      volume: 0.6,
      loop: false,
      preload: true
    },
    {
      id: 'bottle-stop',
      url: '/sounds/bottle-stop.mp3',
      volume: 0.7,
      loop: false,
      preload: true
    },
    {
      id: 'roulette-spin',
      url: '/sounds/roulette-spin.mp3',
      volume: 0.6,
      loop: false,
      preload: true
    },
    {
      id: 'victory',
      url: '/sounds/victory.mp3',
      volume: 0.8,
      loop: false,
      preload: true
    },
    {
      id: 'game-over',
      url: '/sounds/game-over.mp3',
      volume: 0.7,
      loop: false,
      preload: true
    },
    {
      id: 'button-click',
      url: '/sounds/button-click.mp3',
      volume: 0.4,
      loop: false,
      preload: true
    },
    {
      id: 'button-hover',
      url: '/sounds/button-hover.mp3',
      volume: 0.3,
      loop: false,
      preload: true
    }
  ]

  // Música de fondo
  private backgroundMusic: SoundEffect[] = [
    {
      id: 'party-music',
      url: '/music/party-music.mp3',
      volume: 0.4,
      loop: true,
      preload: true
    },
    {
      id: 'chill-music',
      url: '/music/chill-music.mp3',
      volume: 0.3,
      loop: true,
      preload: true
    },
    {
      id: 'intense-music',
      url: '/music/intense-music.mp3',
      volume: 0.5,
      loop: true,
      preload: true
    }
  ]

  constructor() {
    this.initializeSounds()
  }

  private async initializeSounds() {
    try {
      // Cargar efectos de sonido
      for (const effect of this.soundEffects) {
        if (effect.preload) {
          await this.loadSound(effect.id, effect.url)
        }
      }

      // Cargar música de fondo
      for (const music of this.backgroundMusic) {
        if (music.preload) {
          await this.loadSound(music.id, music.url)
        }
      }

      console.log('🎵 Sistema de sonido inicializado correctamente')
    } catch (error) {
      console.warn('⚠️ Error al cargar algunos sonidos:', error)
    }
  }

  private async loadSound(id: string, url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url)
      
      audio.addEventListener('canplaythrough', () => {
        this.sounds.set(id, audio)
        resolve()
      })
      
      audio.addEventListener('error', () => {
        console.warn(`⚠️ No se pudo cargar el sonido: ${url}`)
        reject(new Error(`Failed to load sound: ${url}`))
      })
      
      audio.load()
    })
  }

  // Reproducir efecto de sonido
  playSound(soundId: string, options?: { volume?: number; loop?: boolean }): void {
    if (!this.isEnabled) return

    try {
      const audio = this.sounds.get(soundId)
      if (audio) {
        // Clonar el audio para permitir múltiples reproducciones simultáneas
        const clonedAudio = audio.cloneNode() as HTMLAudioElement
        clonedAudio.volume = (options?.volume || 1) * this.masterVolume
        clonedAudio.loop = options?.loop || false
        
        clonedAudio.play().catch(error => {
          console.warn(`⚠️ Error al reproducir sonido ${soundId}:`, error)
        })
      } else {
        console.warn(`⚠️ Sonido no encontrado: ${soundId}`)
      }
    } catch (error) {
      console.warn(`⚠️ Error al reproducir sonido ${soundId}:`, error)
    }
  }

  // Reproducir música de fondo
  playMusic(musicId: string, fadeIn: boolean = true): void {
    if (!this.isEnabled) return

    try {
      // Detener música actual si existe
      this.stopMusic()

      const audio = this.sounds.get(musicId)
      if (audio) {
        this.currentMusic = audio.cloneNode() as HTMLAudioElement
        this.currentMusic.volume = fadeIn ? 0 : this.masterVolume * 0.4
        this.currentMusic.loop = true
        
        this.currentMusic.play().then(() => {
          if (fadeIn) {
            this.fadeIn(this.currentMusic!, 2000)
          }
        }).catch(error => {
          console.warn(`⚠️ Error al reproducir música ${musicId}:`, error)
        })
      }
    } catch (error) {
      console.warn(`⚠️ Error al reproducir música ${musicId}:`, error)
    }
  }

  // Detener música de fondo
  stopMusic(fadeOut: boolean = true): void {
    if (this.currentMusic) {
      if (fadeOut) {
        this.fadeOut(this.currentMusic, 1000).then(() => {
          this.currentMusic!.pause()
          this.currentMusic = null
        })
      } else {
        this.currentMusic.pause()
        this.currentMusic = null
      }
    }
  }

  // Fade in
  private fadeIn(audio: HTMLAudioElement, duration: number): void {
    const targetVolume = this.masterVolume * 0.4
    const steps = 20
    const volumeStep = targetVolume / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const fadeInterval = setInterval(() => {
      currentStep++
      audio.volume = volumeStep * currentStep

      if (currentStep >= steps) {
        clearInterval(fadeInterval)
        audio.volume = targetVolume
      }
    }, stepDuration)
  }

  // Fade out
  private fadeOut(audio: HTMLAudioElement, duration: number): Promise<void> {
    return new Promise((resolve) => {
      const initialVolume = audio.volume
      const steps = 20
      const volumeStep = initialVolume / steps
      const stepDuration = duration / steps

      let currentStep = 0
      const fadeInterval = setInterval(() => {
        currentStep++
        audio.volume = initialVolume - (volumeStep * currentStep)

        if (currentStep >= steps) {
          clearInterval(fadeInterval)
          audio.volume = 0
          resolve()
        }
      }, stepDuration)
    })
  }

  // Efectos específicos del juego
  playCardFlip(): void {
    this.playSound('card-flip')
  }

  playDrink(): void {
    this.playSound('drink')
  }

  playCheer(): void {
    this.playSound('cheer')
  }

  playPenalty(): void {
    this.playSound('penalty')
  }

  playConfetti(): void {
    this.playSound('confetti')
  }

  playSparkle(): void {
    this.playSound('sparkle')
  }

  playTimerTick(): void {
    this.playSound('timer-tick')
  }

  playBombTick(): void {
    this.playSound('bomb-tick')
  }

  playBombExplosion(): void {
    this.playSound('bomb-explosion')
  }

  playBottleSpin(): void {
    this.playSound('bottle-spin')
  }

  playBottleStop(): void {
    this.playSound('bottle-stop')
  }

  playRouletteSpin(): void {
    this.playSound('roulette-spin')
  }

  playVictory(): void {
    this.playSound('victory')
  }

  playGameOver(): void {
    this.playSound('game-over')
  }

  playButtonClick(): void {
    this.playSound('button-click')
  }

  playButtonHover(): void {
    this.playSound('button-hover')
  }

  // Control de música
  playPartyMusic(): void {
    this.playMusic('party-music')
  }

  playChillMusic(): void {
    this.playMusic('chill-music')
  }

  playIntenseMusic(): void {
    this.playMusic('intense-music')
  }

  // Configuración
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled
    if (!enabled && this.currentMusic) {
      this.stopMusic(false)
    }
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    if (this.currentMusic) {
      this.currentMusic.volume = this.masterVolume * 0.4
    }
  }

  getEnabled(): boolean {
    return this.isEnabled
  }

  getMasterVolume(): number {
    return this.masterVolume
  }

  // Limpiar recursos
  dispose(): void {
    this.stopMusic(false)
    this.sounds.clear()
  }
}

// Instancia global del gestor de sonido
export const soundManager = new SoundManager()

// Hooks para React
export const useSoundManager = () => {
  return {
    playCardFlip: () => soundManager.playCardFlip(),
    playDrink: () => soundManager.playDrink(),
    playCheer: () => soundManager.playCheer(),
    playPenalty: () => soundManager.playPenalty(),
    playConfetti: () => soundManager.playConfetti(),
    playSparkle: () => soundManager.playSparkle(),
    playTimerTick: () => soundManager.playTimerTick(),
    playBombTick: () => soundManager.playBombTick(),
    playBombExplosion: () => soundManager.playBombExplosion(),
    playBottleSpin: () => soundManager.playBottleSpin(),
    playBottleStop: () => soundManager.playBottleStop(),
    playRouletteSpin: () => soundManager.playRouletteSpin(),
    playVictory: () => soundManager.playVictory(),
    playGameOver: () => soundManager.playGameOver(),
    playButtonClick: () => soundManager.playButtonClick(),
    playButtonHover: () => soundManager.playButtonHover(),
    playPartyMusic: () => soundManager.playPartyMusic(),
    playChillMusic: () => soundManager.playChillMusic(),
    playIntenseMusic: () => soundManager.playIntenseMusic(),
    stopMusic: () => soundManager.stopMusic(),
    setEnabled: (enabled: boolean) => soundManager.setEnabled(enabled),
    setMasterVolume: (volume: number) => soundManager.setMasterVolume(volume),
    getEnabled: () => soundManager.getEnabled(),
    getMasterVolume: () => soundManager.getMasterVolume()
  }
}

export default soundManager
