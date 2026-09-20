import { api } from './api';

const MOCK_PROVIDERS = [
  { id: 'p_101', name: 'Rajesh Kumar', rating: 4.8, distance: '2.5 km away', hourlyRate: 250, categories: ['elec', 'repairs-and-fixes', 'all'] },
  { id: 'p_102', name: 'Amit Singh', rating: 4.9, distance: '1.8 km away', hourlyRate: 300, categories: ['plumb', 'repairs-and-fixes', 'all'] },
  { id: 'p_103', name: 'Vikram Sharma', rating: 4.7, distance: '3.2 km away', hourlyRate: 200, categories: ['carp', 'repairs-and-fixes', 'all'] },
  { id: 'p_104', name: 'Priya Patel', rating: 4.9, distance: '1.2 km away', hourlyRate: 400, categories: ['ac', 'repairs-and-fixes', 'all'] },
  { id: 'c_201', name: 'Neha Sharma', rating: 4.8, distance: '1.5 km away', hourlyRate: 500, categories: ['home', 'cleaning'] },
  { id: 'c_202', name: 'Suresh Verma', rating: 4.6, distance: '3.0 km away', hourlyRate: 800, categories: ['pest', 'cleaning'] },
];
export const customerService = {
  updateProfile: async (id: string | number, data: { name: string; email: string; dateOfBirth: string; gender: string }) => {
    const response = await api.put(`/v1/customers/${id}`, data);
    return response.data;
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
   * 
   * HOW TO CONNECT BACKEND:
   * 1. Uncomment the api.get() call.
   * 2. Remove the "MOCK BACKEND RESPONSE" block.
   * 3. The mapping logic below will automatically convert the backend's response 
   *    into the format expected by the frontend.
   */
  getProvidersByCategory: async (categoryId: string) => {
    
    // --- 1. THE API CALL (Uncomment when backend is ready) ---
    // const response = await api.get(`/categories/${categoryId}/providers`);
    // const backendData = response.data;

    // --- 2. MOCK BACKEND RESPONSE (Remove when backend is ready) ---
    const backendData = await new Promise<any[]>((resolve) => {
      setTimeout(() => {
        // Dummy names and data matching the backend's expected structure
        let data = MOCK_PROVIDERS.filter(p => p.categories.includes(categoryId));
        if (data.length === 0) {
          // generic fallback
          data = [{ id: `gen_${categoryId}`, name: 'Zonomo Pro', rating: 4.5, distance: '2.0 km away', hourlyRate: 350, categories: [] }];
        }
        resolve(data);
      }, 600);
    });

    // --- 3. MAP BACKEND DATA TO FRONTEND MODEL ---
    return backendData.map((provider: any) => {
      // Generate initials from name (e.g. "Rajesh Kumar" -> "RK")
      const initials = provider.name
        ? provider.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
        : 'P';

      return {
        id: provider.id,
        name: provider.name,
        initials: initials,
        serviceId: categoryId, // Derived from request
        serviceName: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Professional`,
        rating: provider.rating,
        reviews: Math.floor(Math.random() * 150) + 20, // Mock reviews count
        distance: provider.distance,
        price: `₹${provider.hourlyRate}/hr`,
        isOnline: Math.random() > 0.3,
        lastSeen: '1h',
      };
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
      setTimeout(() => {
        const provider = MOCK_PROVIDERS.find(p => p.id === providerId) || {
          id: providerId,
          name: 'Zonomo Pro',
          rating: 4.5,
          hourlyRate: 350
        };

        resolve({
          id: provider.id,
          name: provider.name,
          category: 'Expert Professional',
          isVerified: true,
          jobsCompleted: Math.floor(Math.random() * 200 + 50) + '+',
          rating: provider.rating,
          reviewsCount: Math.floor(Math.random() * 150) + 20,
          rates: `₹${provider.hourlyRate}/hr`,
          about: `Professional service provider with years of experience specializing in top-tier solutions. Known for precision, reliability, and a commitment to excellence. I provide excellent service with transparent communication and guaranteed results.`,
          specialties: ['Quality Service', 'Punctual', 'Reliable', 'Expert'],
          languages: ['English', 'Hindi'],
          reviews: [
            {
              id: 'r1',
              name: 'Sarah J.',
              avatarText: 'SJ',
              rating: 5,
              text: `"${provider.name.split(' ')[0]} was fantastic! Arrived on time and was very professional..."`
            },
            {
              id: 'r2',
              name: 'Mike R.',
              avatarText: 'MR',
              rating: 4.5,
              text: '"Very knowledgeable and did a great job. Explained everything clearly..."'
            }
          ]
        });
      }, 500);
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
  },

  /**
   * Validate if a service location is within provider's zone
   */
  validateServiceLocation: async (address: string, providerId: string): Promise<{isValid: boolean, message?: string}> => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post('/providers/validate-service-zone', { providerId, targetAddress: address });
    // return response.data;
    
    // MOCK RESPONSE FOR NOW (simulate Google Maps checking)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock validation: fails if address contains 'Delhi' (case insensitive)
        if (address.toLowerCase().includes('delhi')) {
          resolve({ isValid: false, message: 'Provider is not available for this location' });
        } else {
          resolve({ isValid: true });
        }
      }, 800);
    });
  }
};
