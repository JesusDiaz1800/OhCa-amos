// Utility for handling sound files with error handling
export const playSound = (soundPath: string, volume: number = 0.5) => {
  try {
    const audio = new Audio(soundPath)
    audio.volume = volume
    audio.play().catch(error => {
      console.warn(`Could not play sound ${soundPath}:`, error)
    })
  } catch (error) {
    console.warn(`Error loading sound ${soundPath}:`, error)
  }
}

export const loadSound = (soundPath: string): HTMLAudioElement | null => {
  try {
    const audio = new Audio(soundPath)
    audio.preload = 'auto'
    return audio
  } catch (error) {
    console.warn(`Error loading sound ${soundPath}:`, error)
    return null
  }
}

// Common sound paths with fallbacks
export const SOUNDS = {
  TICK: '/sounds/timer-tick.mp3',
  EXPLOSION: '/sounds/explosion.mp3',
  POP: '/sounds/pop.mp3',
  CELEBRATION: '/sounds/celebration.mp3',
  SPIN: '/sounds/spin.mp3',
  WIN: '/sounds/win.mp3'
} as const
