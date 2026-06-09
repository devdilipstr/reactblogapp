const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { newsletterValidation, validateRequest } = require('../middleware/validate');

// Public routes
router.post('/subscribe', newsletterValidation, validateRequest, newsletterController.subscribe);
router.post('/unsubscribe', newsletterValidation, validateRequest, newsletterController.unsubscribe);

// Admin routes
router.get('/subscribers', authMiddleware, adminMiddleware, newsletterController.getAllSubscribers);

module.exports = router;
