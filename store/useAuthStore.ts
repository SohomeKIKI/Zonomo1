import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'customer' | 'provider' | null;

export interface UserProfile {
  id: string;
  phoneNumber?: string;
  name?: string;
  email?: string;
  userType?: string;
  profileImage?: string;
  provider?: string;
  role?: string;
  status?: string;
  isPhoneVerified?: boolean;
  dateOfBirth?: string;
  gender?: string;
  googleId?: string;
  isProfileCompleted?: boolean;
  isRoot?: boolean;
  businessName?: string;
  serviceCategoryId?: number;
  profileStatus?: string;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
  role: UserRole;
  isNewUser: boolean;
  
  // Actions
  setAuthData: (token: string, refreshToken: string | null, user: UserProfile, role: UserRole, isNewUser: boolean) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      role: null,
      isNewUser: false,

      setAuthData: (token, refreshToken, user, role, isNewUser) => 
        set({ token, refreshToken, user, role, isNewUser }),
        
      updateUser: (updates) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),

      logout: () => set({ token: null, refreshToken: null, user: null, role: null, isNewUser: false }),
    }),
    {
      name: 'auth-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // Use React Native's AsyncStorage
    }
  )
);
