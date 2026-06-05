import api, { unwrap } from './api';
import type { LoginRequest, LoginResponse, UserProfile } from '@/types/api';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await api.post('/auth/login', data);
    return unwrap<LoginResponse>(res);
  },

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<LoginResponse> {
    const res = await api.post('/auth/register', data);
    return unwrap<LoginResponse>(res);
  },

  async refreshToken(token: string, refreshToken: string): Promise<LoginResponse> {
    const res = await api.post('/auth/refresh-token', { token, refreshToken });
    return unwrap<LoginResponse>(res);
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(data: { email: string; token: string; newPassword: string; confirmPassword: string }): Promise<void> {
    await api.post('/auth/reset-password', data);
  },

  async changePassword(data: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<void> {
    await api.post('/auth/change-password', data);
  },

  async getProfile(): Promise<UserProfile> {
    const res = await api.get('/users/me');
    return unwrap<UserProfile>(res);
  },
};
