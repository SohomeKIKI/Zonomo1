import { api } from './api';

export const chatService = {
  /**
   * Get recent chat conversations
   */
  getRecentChats: async () => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get('/chats');
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        {
          chatId: 'chat_1',
          participantName: 'Rajesh Kumar',
          lastMessage: 'I will be there in 10 mins',
          timestamp: '2023-11-20T09:50:00Z'
        }
      ]), 1000);
    });
  },

  /**
   * Get messages for a specific chat
   */
  getChatMessages: async (chatId: string) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.get(`/chats/${chatId}/messages`);
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        {
          id: 'msg_1',
          senderId: 'user_123', // Assuming the current user ID
          text: 'Hello, are you available?',
          timestamp: '2023-11-20T09:40:00Z'
        },
        {
          id: 'msg_2',
          senderId: 'p_123',
          text: 'Yes, I am available.',
          timestamp: '2023-11-20T09:42:00Z'
        }
      ]), 1000);
    });
  },

  /**
   * Send a new message
   */
  sendMessage: async (chatId: string, text: string) => {
    // NOTE: Uncomment when backend is ready
    // const response = await api.post(`/chats/${chatId}/messages`, { text });
    // return response.data;
    
    // MOCK RESPONSE FOR NOW
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        success: true,
        message: {
          id: `msg_${Math.random()}`,
          senderId: 'user_123',
          text,
          timestamp: new Date().toISOString()
        }
      }), 500);
    });
  }
};
