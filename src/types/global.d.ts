// Tipos globales para la aplicación

declare global {
  interface Window {
    playSound: (effectId: string) => void
  }
}

export {}
