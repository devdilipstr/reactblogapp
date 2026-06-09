import { apiCall } from './api';

const authService = {
  // Send OTP to email
  sendOTP: async (email) => {
    return await apiCall('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verify OTP and login/register
  verifyOTP: async (email, otp, name = null) => {
    const body = { email, otp };
    if (name) body.name = name;

    const response = await apiCall('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    // Store token and user in localStorage
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  // Logout
  logout: async () => {
    try {
      await apiCall('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Get current user
  getCurrentUser: async () => {
    return await apiCall('/auth/me');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  // Get stored user data
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getStoredUser();
    return user && (user.role === 'admin' || user.isAdmin);
  },
};

export default authService;
