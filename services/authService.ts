import { api } from './api';
import { UserRole } from '@/store/useAuthStore';

export const authService = {
  /**
   * Send OTP to a user's phone number
   */
  sendOtp: async (phone: string, role: UserRole) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post('/auth/send-otp', { phone, role });
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: "OTP Sent" }), 500);
    });
  },

  /**
   * Verify the OTP entered by the user
   */
  verifyOtp: async (phone: string, otp: string) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post('/auth/verify-otp', { phone, otp });
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise<{token: string, isNewUser: boolean, role: UserRole, user: any}>((resolve, reject) => {
      setTimeout(() => {
        if (otp === '111111') {
          resolve({
            token: 'mock_jwt_token_123',
            isNewUser: true, // Change to false to test existing user flow
            role: 'customer', // Or 'provider' based on the flow
            user: { id: '1', phone }
          });
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 500);
    });
  }
};
