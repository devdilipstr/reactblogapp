import { apiCall } from './api';

const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email, preferences = {}, source = 'website') => {
    return await apiCall('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, preferences, source }),
    });
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    return await apiCall('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Update preferences
  updatePreferences: async (email, preferences) => {
    return await apiCall('/newsletter/preferences', {
      method: 'PUT',
      body: JSON.stringify({ email, preferences }),
    });
  },

  // Get all subscribers (Admin only)
  getAllSubscribers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiCall(`/newsletter/subscribers?${queryString}`);
  },
};

export default newsletterService;
