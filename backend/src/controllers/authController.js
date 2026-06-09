const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendOTP, verifyOTP } = require('../utils/otpService');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret-key-change-in-production', {
    expiresIn: '30d',
  });
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    
    const result = await sendOTP(email);

    res.status(200).json({
      success: true,
      message: result.message,
      userExists: !!existingUser,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
    });
  }
};

exports.verifyOTPAndLogin = async (req, res) => {
  try {
    const { email, otp, name } = req.body;

    const otpResult = await verifyOTP(email, otp);
    if (!otpResult.success) {
      return res.status(400).json({
        success: false,
        message: otpResult.message,
      });
    }

    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      // Only create new user if name is provided
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'User not found. Please provide name to register.',
        });
      }
      
      user = await User.create({ name, email, role: 'user' });
      isNewUser = true;
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: isNewUser ? 'Registration successful' : 'Login successful',
      token,
      isNewUser,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

exports.getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};
