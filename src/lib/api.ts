import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, {
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
            },
          });
          
          const newToken = response.data.access_token;
          localStorage.setItem('access_token', newToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  timestamp: string;
  status: 'success' | 'error';
}

export interface ApiError {
  error: string;
  code?: string;
  details?: {
    field?: string;
    value?: string;
  };
}

// Generic API methods
export const api = {
  get: <T>(url: string, params?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.get(url, { params }),
  
  post: <T>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.post(url, data),
  
  put: <T>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.put(url, data),
  
  delete: <T>(url: string): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.delete(url),
};

export default apiClient;
