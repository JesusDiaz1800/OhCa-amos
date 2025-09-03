import { useCallback } from 'react'

export const useSound = () => {
  const playSound = useCallback((effectId: string) => {
    if (window.playSound) {
      window.playSound(effectId)
    }
  }, [])

  const playButtonClick = useCallback(() => {
    playSound('button-click')
  }, [playSound])

  const playSuccess = useCallback(() => {
    playSound('success')
  }, [playSound])

  const playCelebration = useCallback(() => {
    playSound('celebration')
  }, [playSound])

  const playVictory = useCallback(() => {
    playSound('victory')
  }, [playSound])

  const playAchievement = useCallback(() => {
    playSound('achievement')
  }, [playSound])

  return {
    playSound,
    playButtonClick,
    playSuccess,
    playCelebration,
    playVictory,
    playAchievement
  }
}
