import { api } from './api';

export const authService = {
  /**
   * Send OTP to a user's phone number
   */
  sendOtp: async (phoneNumber: string) => {
    const response = await api.post('/auth/customer/phone/send-otp', { phoneNumber });
    return response.data;
  },

  /**
   * Verify the OTP entered by the user
   */
  verifyOtp: async (phoneNumber: string, otp: string, token: string) => {
    const response = await api.post('/auth/customer/phone/verify', { phoneNumber, otp, token });
    return response.data;
  },

  /**
   * Login/Register with Google
   */
  googleLogin: async (idToken: string) => {
    const response = await api.post('/auth/customer/google', { idToken });
    return response.data;
  },

  /**
   * Refresh JWT Token manually
   */
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  }
};
