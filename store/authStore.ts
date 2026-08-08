import { create } from 'zustand';

export type UserRole = 'customer' | 'provider' | null;

export interface UserDetails {
  fullName: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  token: string | null;
  user: UserDetails | null;
  login: (token: string, role: UserRole, user?: UserDetails) => void;
  logout: () => void;
  updateUser: (user: Partial<UserDetails>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  token: null,
  user: null,
  login: (token, role, user) => set({ isAuthenticated: true, token, role, user: user || null }),
  logout: () => set({ isAuthenticated: false, token: null, role: null, user: null }),
  updateUser: (updatedFields) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updatedFields } : { fullName: '', email: '', ...updatedFields } 
  })),
}));

