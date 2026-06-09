import { apiCall } from './api';

const showcaseService = {
  // Get active showcases
  getActive: async () => {
    return await apiCall('/showcase/active');
  },

  // Get all showcases (Admin only)
  getAll: async () => {
    return await apiCall('/showcase');
  },

  // Create showcase (Admin only)
  create: async (showcaseData) => {
    return await apiCall('/showcase', {
      method: 'POST',
      body: JSON.stringify(showcaseData),
    });
  },

  // Update showcase (Admin only)
  update: async (id, showcaseData) => {
    return await apiCall(`/showcase/${id}`, {
      method: 'PUT',
      body: JSON.stringify(showcaseData),
    });
  },

  // Delete showcase (Admin only)
  delete: async (id) => {
    return await apiCall(`/showcase/${id}`, {
      method: 'DELETE',
    });
  },
};

export default showcaseService;
