import { api } from './api';

export const bookingService = {
  /**
   * Create a booking for a service
   */
  createBooking: async (data: { providerId: string; categoryId: string; date: string; addressId: string }) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post('/bookings', data);
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, bookingId: 'b_123' }), 1000);
    });
  },

  /**
   * Get customer's booking history
   */
  getCustomerBookings: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/bookings');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        {
          id: 'b_123',
          status: 'pending',
          date: '2023-11-20T10:00:00Z',
          providerName: 'Rajesh Kumar'
        }
      ]), 1000);
    });
  },

  /**
   * Get provider's incoming requests
   */
  getProviderRequests: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/provider/requests');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        {
          id: 'req_1',
          customerName: 'John Doe',
          date: '2023-11-20T10:00:00Z',
          status: 'pending'
        }
      ]), 1000);
    });
  },

  /**
   * Provider accepts or rejects a request
   */
  updateRequestStatus: async (id: string, status: 'accepted' | 'rejected') => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.patch(`/provider/requests/${id}/status`, { status });
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, status }), 1000);
    });
  }
};
