const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { otpSendValidation, otpVerifyValidation, validateRequest } = require('../middleware/validate');
const { otpLimiter } = require('../middleware/rateLimiter');
const { authMiddleware } = require('../middleware/auth');

// Send OTP
router.post('/send-otp', otpLimiter, otpSendValidation, validateRequest, authController.sendOTP);

// Verify OTP and login/register
router.post('/verify-otp', otpVerifyValidation, validateRequest, authController.verifyOTPAndLogin);

// Logout
router.post('/logout', authMiddleware, authController.logout);

// Get current user
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
