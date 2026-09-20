import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// TODO: Replace with your actual Spring Boot backend IP/URL when ready
// e.g. 'http://192.168.1.100:8080/api' for local network testing on mobile
export const API_BASE_URL = __DEV__ 
  ? 'https://tingle-washbowl-synopsis.ngrok-free.dev/api'
  : 'http://localhost:8080/api'; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the JWT token to every request automatically
api.interceptors.request.use((config) => {
  // Get the token directly from the Zustand store
  const token = useAuthStore.getState().token;
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't already tried to retry it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }
        
        // Attempt to get a new access token
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        
        if (res.data && res.data.success) {
          const { accessToken, refreshToken: newRefreshToken } = res.data;
          
          if (accessToken) {
            // Update the store with the new tokens
            const state = useAuthStore.getState();
            if (state.user) {
              state.setAuthData(
                accessToken, 
                newRefreshToken || refreshToken, 
                state.user, 
                state.role, 
                state.isNewUser
              );
            }
            
            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        }
        
        // If the refresh failed for any reason, logout
        useAuthStore.getState().logout();
        return Promise.reject(error);
        
      } catch (refreshError) {
        // If the refresh token request itself fails (e.g. token expired), logout
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
