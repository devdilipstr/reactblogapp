const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const blogValidation = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('content').notEmpty().isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('coverImage').trim().notEmpty().withMessage('Cover image URL is required'),
];

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

const newsletterValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
];

const otpSendValidation = [
  body('email').isEmail().withMessage('Valid email address is required'),
];

const otpVerifyValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

module.exports = {
  validateRequest,
  blogValidation,
  contactValidation,
  newsletterValidation,
  otpSendValidation,
  otpVerifyValidation,
};
