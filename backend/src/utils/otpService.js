const OTP = require('../models/OTP');
const { sendEmail } = require('../config/email');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOTPEmailTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #333; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 5px 5px; }
    .otp-box { background: #fff; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333; border: 2px dashed #333; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p>Your verification code is:</p>
      <div class="otp-box">${otp}</div>
      <p>This code will expire in <strong>10 minutes</strong>.</p>
      <p>If you didn't request this code, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Blog App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

const sendOTP = async (email) => {
  try {
    // Delete old OTPs for this email
    await OTP.deleteMany({ email: email });

    // Generate new OTP
    const otp = generateOTP();
    
    // Save to database
    await OTP.create({
      email: email, // Using mobile field for email to reuse model
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send via email
    const html = getOTPEmailTemplate(otp);
    await sendEmail({
      to: email,
      subject: 'Your Verification Code',
      html,
      text: `Your verification code is: ${otp}. Valid for 10 minutes.`,
    });

    return { success: true, message: 'OTP sent successfully to your email' };
  } catch (error) {
    console.error('Send OTP error:', error);
    throw error;
  }
};

const verifyOTP = async (email, otp) => {
  try {
    const otpDoc = await OTP.findOne({
      email: email, // Using mobile field for email
      otp,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpDoc) {
      return { success: false, message: 'Invalid or expired OTP' };
    }

    // Mark as verified
    otpDoc.verified = true;
    await otpDoc.save();

    return { success: true, message: 'OTP verified successfully' };
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error;
  }
};

module.exports = { sendOTP, verifyOTP };
