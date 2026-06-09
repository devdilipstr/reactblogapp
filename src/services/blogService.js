import { apiCall } from './api';

const blogService = {
  // Get all blogs with filters
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiCall(`/blogs?${queryString}`);
  },

  // Get single blog by slug or ID
  getOne: async (identifier) => {
    return await apiCall(`/blogs/${identifier}`);
  },

  // Get featured blogs
  getFeatured: async (limit = 3) => {
    return await apiCall(`/blogs/featured?limit=${limit}`);
  },

  // Get popular blogs
  getPopular: async (limit = 5) => {
    return await apiCall(`/blogs/popular?limit=${limit}`);
  },

  // Create new blog (Admin only)
  create: async (blogData) => {
    return await apiCall('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },

  // Update blog (Admin only)
  update: async (identifier, blogData) => {
    return await apiCall(`/blogs/${identifier}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  },

  // Delete blog (Admin only)
  delete: async (identifier) => {
    return await apiCall(`/blogs/${identifier}`, {
      method: 'DELETE',
    });
  },

  // Like a blog
  like: async (identifier) => {
    return await apiCall(`/blogs/${identifier}/like`, {
      method: 'POST',
    });
  },

  // Search blogs
  search: async (query, params = {}) => {
    return await blogService.getAll({ search: query, ...params });
  },

  // Get blogs by category
  getByCategory: async (category, params = {}) => {
    return await blogService.getAll({ category, ...params });
  },
};

export default blogService;
