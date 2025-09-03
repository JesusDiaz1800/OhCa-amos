import { useCallback } from 'react'

export const useAchievements = () => {
  const unlockAchievement = useCallback((achievementId: string) => {
    // Esta función será llamada desde el sistema de logros
    // Por ahora solo registramos en consola
    console.log(`🎉 Logro desbloqueado: ${achievementId}`)
  }, [])

  const updateProgress = useCallback((achievementId: string, progress: number) => {
    // Actualizar progreso de un logro
    console.log(`📊 Progreso actualizado: ${achievementId} - ${progress}`)
  }, [])

  const checkAchievement = useCallback((achievementId: string, condition: boolean) => {
    if (condition) {
      unlockAchievement(achievementId)
    }
  }, [unlockAchievement])

  return {
    unlockAchievement,
    updateProgress,
    checkAchievement
  }
}
