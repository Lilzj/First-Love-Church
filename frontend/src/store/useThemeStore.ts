import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from '../types/common';

interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme: ThemeMode) => set({ theme }),
    }),
    {
      name: 'flc-theme',
    }
  )
);
