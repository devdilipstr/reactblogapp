import { apiCall } from './api';

const contactService = {
  // Submit contact form
  submit: async (contactData) => {
    return await apiCall('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  // Get all messages (Admin only)
  getAllMessages: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiCall(`/contact/messages?${queryString}`);
  },

  // Update message status (Admin only)
  updateStatus: async (id, status) => {
    return await apiCall(`/contact/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

export default contactService;
