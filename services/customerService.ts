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
  },

  /**
   * Get all service categories
   */
  getCategories: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/categories');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        { id: 'cat_1', name: 'Electrician', icon: 'zap' },
        { id: 'cat_2', name: 'Plumber', icon: 'droplet' }
      ]), 500);
    });
  },

  /**
   * Get providers for a specific category
   */
  getProvidersByCategory: async (categoryId: string) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get(`/categories/${categoryId}/providers`);
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        { id: 'p_123', name: 'Rajesh Kumar', rating: 4.8, distance: '2.5 km away', hourlyRate: 250 }
      ]), 500);
    });
  },

  /**
   * Get provider details
   */
  getProviderDetails: async (providerId: string) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get(`/providers/${providerId}`);
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        id: providerId,
        name: 'Rajesh Kumar',
        rating: 4.8,
        reviews: 120,
        about: 'Expert electrician with 10 years experience.'
      }), 500);
    });
  },

  /**
   * Get saved addresses
   */
  getAddresses: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/profile/addresses');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500); // Return empty or mock list
    });
  },

  /**
   * Get saved payment methods
   */
  getPayments: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/profile/payments');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500);
    });
  },

  /**
   * Get notifications
   */
  getNotifications: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/notifications');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500);
    });
  }
};
