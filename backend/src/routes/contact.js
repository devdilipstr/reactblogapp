const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { contactValidation, validateRequest } = require('../middleware/validate');

// Public routes
router.post('/submit', contactValidation, validateRequest, contactController.submitContact);

// Admin routes
router.get('/messages', authMiddleware, adminMiddleware, contactController.getAllMessages);
router.patch('/messages/:id', authMiddleware, adminMiddleware, contactController.updateMessageStatus);

module.exports = router;
