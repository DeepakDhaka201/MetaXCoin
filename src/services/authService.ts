import { api } from '@/lib/api';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';

export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/login', credentials);
    return response.data; // Backend returns data directly, not wrapped in data field
  },

  // Register user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/register', userData);
    return response.data; // Backend returns data directly, not wrapped in data field
  },

  // Logout user
  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
  },

  // Get user profile
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/api/auth/profile');
    return response.data; // Backend returns user data directly
  },

  // Update user profile
  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await api.put<User>('/api/auth/profile', profileData);
    return response.data; // Backend returns user data directly
  },

  // Change password
  async changePassword(passwordData: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }): Promise<void> {
    await api.post('/api/auth/change-password', passwordData);
  },

  // Refresh token
  async refreshToken(): Promise<{ access_token: string }> {
    const response = await api.post<{ access_token: string }>('/api/auth/refresh');
    return response.data; // Backend returns token data directly
  },
};
