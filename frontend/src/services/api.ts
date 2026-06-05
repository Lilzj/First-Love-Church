import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('flc-auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 + refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying, attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('flc-refresh-token');
      const token = localStorage.getItem('flc-auth-token');

      if (refreshToken && token) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            token,
            refreshToken,
          });

          if (data.success && data.data) {
            localStorage.setItem('flc-auth-token', data.data.token);
            localStorage.setItem('flc-refresh-token', data.data.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
            return api(originalRequest);
          }
        } catch {
          // Refresh failed — clear auth and redirect
        }
      }

      localStorage.removeItem('flc-auth-token');
      localStorage.removeItem('flc-refresh-token');
      localStorage.removeItem('flc-auth-user');
      window.location.href = '/admin/login';
    }

    return Promise.reject(error);
  }
);

// Helper to unwrap the ApiResponse envelope
export function unwrap<T>(response: { data: { success: boolean; data: T; message: string } }): T {
  return response.data.data;
}

export default api;
