// Export all services
export { default as authService } from './authService';
export { default as blogService } from './blogService';
export { default as newsletterService } from './newsletterService';
export { default as contactService } from './contactService';
export { default as showcaseService } from './showcaseService';
export { default as uploadService } from './uploadService';
export { default as userService } from './userService';

// Also export API utilities
export { apiCall, uploadFile, getAuthToken, API_BASE_URL } from './api';
