import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// TODO: Replace with your actual Spring Boot backend IP/URL when ready
// e.g. 'http://192.168.1.100:8080/api' for local network testing on mobile
export const API_BASE_URL = 'http://localhost:8080/api'; 

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
  (error) => {
    if (error.response?.status === 401) {
      // If token expires or is invalid, log the user out
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
