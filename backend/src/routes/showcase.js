const express = require('express');
const router = express.Router();
const showcaseController = require('../controllers/showcaseController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/active', showcaseController.getActiveShowcases);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, showcaseController.getAllShowcases);
router.post('/', authMiddleware, adminMiddleware, showcaseController.createShowcase);
router.put('/:id', authMiddleware, adminMiddleware, showcaseController.updateShowcase);
router.delete('/:id', authMiddleware, adminMiddleware, showcaseController.deleteShowcase);

module.exports = router;
