import { api } from './api';

export const providerService = {
  /**
   * Step 1: Save basic business details
   */
  saveStep1: async (data: { businessName: string; serviceCategory: string; zipCode: string; radiusKm: number }) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post('/provider/profile/step1', data);
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, providerId: 'p_123' }), 1000);
    });
  },

  /**
   * Helper to upload a file to the backend
   * Depending on your Spring Boot setup, this might hit an S3 bucket or local storage
   */
  uploadFile: async (fileUri: string) => {
    // NOTE: Uncomment when backend is ready
    /*
    const formData = new FormData();
    const filename = fileUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('file', {
      uri: fileUri,
      name: filename,
      type,
    } as any);

    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.fileUrl; // Expected to return the hosted URL
    */
    
    // MOCK RESPONSE FOR NOW
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve('https://mock-storage.zonomo.com/files/document.jpg'), 1500);
    });
  },

  /**
   * Step 2: Submit Identity Verification documents
   */
  saveStep2: async (data: { frontIdUrl: string; backIdUrl: string; licenseUrl?: string }) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post('/provider/profile/step2', data);
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });
  },

  /**
   * Step 3: Fetch the current review status of the provider application
   */
  getStatus: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/provider/status');
    // return response.data; // { status: 'in_review' | 'approved' | 'rejected' }
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({ status: 'in_review' }), 500);
    });
  }
};
