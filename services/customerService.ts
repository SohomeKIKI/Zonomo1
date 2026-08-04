import { api } from './api';

export const customerService = {
  /**
   * Create or update the customer's profile
   */
  updateProfile: async (data: { fullName: string; email: string; address?: string }) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post('/customer/profile', data);
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, user: { ...data, id: '1' } }), 1000);
    });
  },

  /**
   * Get the current customer's profile details
   */
  getProfile: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/customer/profile');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, user: { fullName: 'John Doe', email: 'john@example.com' } }), 500);
    });
  }
};
