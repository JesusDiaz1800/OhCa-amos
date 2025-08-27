import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  initializeTheme: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',

      initializeTheme: () => {
        const savedTheme = localStorage.getItem('previa-mundial-theme')
        if (savedTheme) {
          set({ theme: savedTheme as Theme })
        } else {
          // Check system preference
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          set({ theme: systemTheme })
        }
      },

      setTheme: (theme: Theme) => {
        set({ theme })
        localStorage.setItem('previa-mundial-theme', theme)
      },

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        set({ theme: newTheme })
        localStorage.setItem('previa-mundial-theme', newTheme)
      },
    }),
    {
      name: 'previa-mundial-theme',
    }
  )
)
