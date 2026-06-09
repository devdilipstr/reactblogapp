const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Admin only routes
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/stats', authMiddleware, adminMiddleware, userController.getUserStats);
router.patch('/:id/role', authMiddleware, adminMiddleware, userController.updateUserRole);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, userController.toggleUserStatus);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
