import { apiCall } from './api';

const userService = {
  // Get all users (Admin only)
  getAll: async () => {
    return await apiCall('/users');
  },

  // Get user stats (Admin only)
  getStats: async () => {
    return await apiCall('/users/stats');
  },

  // Update user role (Admin only)
  updateRole: async (userId, role) => {
    return await apiCall(`/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  // Toggle user active status (Admin only)
  toggleStatus: async (userId) => {
    return await apiCall(`/users/${userId}/toggle`, {
      method: 'PATCH',
    });
  },

  // Delete user (Admin only)
  deleteUser: async (userId) => {
    return await apiCall(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

export default userService;
