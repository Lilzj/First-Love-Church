import { create } from 'zustand';
import { authService } from '@/services/authService';
import type { UserProfile } from '@/types/api';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  loginError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitializing: true,
  loginError: null,

  login: async (email: string, password: string) => {
    try {
      const result = await authService.login({ email, password });
      localStorage.setItem('flc-auth-token', result.token);
      localStorage.setItem('flc-refresh-token', result.refreshToken);
      localStorage.setItem('flc-auth-user', JSON.stringify(result.user));
      set({
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken,
        isAuthenticated: true,
        loginError: null,
      });
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      set({ loginError: msg });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('flc-auth-token');
    localStorage.removeItem('flc-refresh-token');
    localStorage.removeItem('flc-auth-user');
    set({ user: null, token: null, refreshToken: null, isAuthenticated: false, loginError: null });
  },

  clearError: () => set({ loginError: null }),

  initAuth: async () => {
    const token = localStorage.getItem('flc-auth-token');
    const userJson = localStorage.getItem('flc-auth-user');

    if (!token) {
      set({ isInitializing: false });
      return;
    }

    // Restore from localStorage immediately for fast boot
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        set({
          user,
          token,
          refreshToken: localStorage.getItem('flc-refresh-token'),
          isAuthenticated: true,
          isInitializing: false,
        });
      } catch {
        set({ isInitializing: false });
      }
    } else {
      // If no cached user, try to fetch profile
      try {
        const user = await authService.getProfile();
        localStorage.setItem('flc-auth-user', JSON.stringify(user));
        set({
          user,
          token,
          refreshToken: localStorage.getItem('flc-refresh-token'),
          isAuthenticated: true,
          isInitializing: false,
        });
      } catch {
        // Token expired / invalid
        localStorage.removeItem('flc-auth-token');
        localStorage.removeItem('flc-refresh-token');
        localStorage.removeItem('flc-auth-user');
        set({ isInitializing: false });
      }
    }
  },
}));
