import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'customer' | 'provider' | null;

interface UserProfile {
  id: string;
  phone: string;
  fullName?: string;
  email?: string;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  role: UserRole;
  isNewUser: boolean;
  
  // Actions
  setAuthData: (token: string, user: UserProfile, role: UserRole, isNewUser: boolean) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,
      isNewUser: false,

      setAuthData: (token, user, role, isNewUser) => 
        set({ token, user, role, isNewUser }),
        
      updateUser: (updates) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),

      logout: () => set({ token: null, user: null, role: null, isNewUser: false }),
    }),
    {
      name: 'auth-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // Use React Native's AsyncStorage
    }
  )
);
