import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { gameData } from '../data/gameData'

export interface Player {
  id: string
  name: string
  drinks: number
  isActive: boolean
}

export interface GameState {
  currentGame: string | null
  currentMode: string | null
  players: Player[]
  currentPlayerIndex: number
  gameHistory: string[]
  isGameActive: boolean
  settings: {
    language: 'es' | 'en'
    soundEnabled: boolean
    vibrationEnabled: boolean
    autoNext: boolean
    showTimer: boolean
  }
}

interface GameStore extends GameState {
  // Actions
  initializeGame: () => void
  startGame: (gameType: string, mode: string) => void
  endGame: () => void
  addPlayer: (name: string) => void
  removePlayer: (id: string) => void
  updatePlayer: (id: string, updates: Partial<Player>) => void
  nextPlayer: () => void
  addDrink: (playerId: string, amount?: number) => void
  addToHistory: (action: string) => void
  updateSettings: (settings: Partial<GameState['settings']>) => void
  resetGame: () => void
}

// Función segura para localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn('Error accessing localStorage:', error)
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn('Error setting localStorage:', error)
      // Limpiar localStorage si está lleno
      try {
        localStorage.clear()
        localStorage.setItem(key, value)
      } catch (clearError) {
        console.error('Failed to clear localStorage:', clearError)
      }
    }
  }
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentGame: null,
      currentMode: null,
      players: [],
      currentPlayerIndex: 0,
      gameHistory: [],
      isGameActive: false,
      settings: {
        language: 'es',
        soundEnabled: true,
        vibrationEnabled: true,
        autoNext: false,
        showTimer: true,
      },

      // Actions
      initializeGame: () => {
        // Esta función ya no es necesaria con persist middleware
        // Zustand se encarga automáticamente de la persistencia
      },

      startGame: (gameType: string, mode: string) => {
        set({
          currentGame: gameType,
          currentMode: mode,
          isGameActive: true,
          currentPlayerIndex: 0,
          gameHistory: [],
        })
      },

      endGame: () => {
        set({
          isGameActive: false,
          currentGame: null,
          currentMode: null,
        })
      },

      addPlayer: (name: string) => {
        const newPlayer: Player = {
          id: Date.now().toString(),
          name,
          drinks: 0,
          isActive: true,
        }
        set((state) => ({
          players: [...state.players, newPlayer],
        }))
      },

      removePlayer: (id: string) => {
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        }))
      },

      updatePlayer: (id: string, updates: Partial<Player>) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }))
      },

      nextPlayer: () => {
        set((state) => {
          const nextIndex = (state.currentPlayerIndex + 1) % state.players.length
          return {
            currentPlayerIndex: nextIndex,
            players: state.players.map((p, i) => ({
              ...p,
              isActive: i === nextIndex,
            })),
          }
        })
      },

      addDrink: (playerId: string, amount = 1) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, drinks: p.drinks + amount } : p
          ),
        }))
      },

      addToHistory: (action: string) => {
        set((state) => ({
          gameHistory: [...state.gameHistory, action],
        }))
      },

      updateSettings: (newSettings: Partial<GameState['settings']>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      resetGame: () => {
        set({
          currentGame: null,
          currentMode: null,
          players: [],
          currentPlayerIndex: 0,
          gameHistory: [],
          isGameActive: false,
        })
      },
    }),
    {
      name: 'previa-mundial-game',
      partialize: (state) => ({
        players: state.players,
        settings: state.settings,
        gameHistory: state.gameHistory,
      }),
      // Usar storage personalizado para manejar errores
      storage: {
        getItem: (name) => {
          return safeLocalStorage.getItem(name)
        },
        setItem: (name, value) => {
          safeLocalStorage.setItem(name, value)
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name)
          } catch (error) {
            console.warn('Error removing from localStorage:', error)
          }
        },
      },
    }
  )
)
