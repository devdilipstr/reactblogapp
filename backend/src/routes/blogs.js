const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { blogValidation, validateRequest } = require('../middleware/validate');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/popular', blogController.getPopularBlogs);
router.get('/:identifier', blogController.getBlog); // slug or ID
router.post('/:identifier/like', blogController.likeBlog);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, blogValidation, validateRequest, blogController.createBlog);
router.put('/:identifier', authMiddleware, adminMiddleware, blogController.updateBlog);
router.delete('/:identifier', authMiddleware, adminMiddleware, blogController.deleteBlog);

module.exports = router;
