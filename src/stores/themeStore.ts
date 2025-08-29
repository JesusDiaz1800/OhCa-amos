import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  initializeTheme: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
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

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',

      initializeTheme: () => {
        try {
          const savedTheme = safeLocalStorage.getItem('previa-mundial-theme')
          if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            set({ theme: savedTheme as Theme })
          } else {
            // Check system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            set({ theme: systemTheme })
          }
        } catch (error) {
          console.warn('Error initializing theme:', error)
          // Fallback to system preference
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          set({ theme: systemTheme })
        }
      },

      setTheme: (theme: Theme) => {
        set({ theme })
        safeLocalStorage.setItem('previa-mundial-theme', theme)
      },

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        set({ theme: newTheme })
        safeLocalStorage.setItem('previa-mundial-theme', newTheme)
      },
    }),
    {
      name: 'previa-mundial-theme',
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
