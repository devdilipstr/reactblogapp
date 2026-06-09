import { uploadFile, apiCall } from './api';

const uploadService = {
  // Upload image
  uploadImage: async (file, type = 'blog', additionalData = {}) => {
    return await uploadFile('/upload/image', file, { type, ...additionalData });
  },

  // Get media library (Admin only)
  getMediaLibrary: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiCall(`/upload/library?${queryString}`);
  },

  // Delete media (Admin only)
  deleteMedia: async (id) => {
    return await apiCall(`/upload/${id}`, {
      method: 'DELETE',
    });
  },
};

export default uploadService;
