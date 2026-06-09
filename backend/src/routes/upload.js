const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { upload } = require('../config/storage');
const { uploadLimiter } = require('../middleware/rateLimiter');

// Admin only routes
router.post(
  '/image',
  authMiddleware,
  adminMiddleware,
  uploadLimiter,
  upload.single('file'),
  uploadController.uploadImage
);

router.get(
  '/library',
  authMiddleware,
  adminMiddleware,
  uploadController.getMediaLibrary
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  uploadController.deleteMedia
);

module.exports = router;
