import { create } from 'zustand';

export type UserRole = 'customer' | 'provider' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  token: string | null;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  token: null,
  login: (token, role) => set({ isAuthenticated: true, token, role }),
  logout: () => set({ isAuthenticated: false, token: null, role: null }),
}));
