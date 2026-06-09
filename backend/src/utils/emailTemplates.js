const getNewsletterTemplate = (blogTitle, blogCategory, blogLink) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #333; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .button { display: inline-block; padding: 12px 24px; background: #333; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Blog Published!</h1>
    </div>
    <div class="content">
      <h2>${blogTitle}</h2>
      <p><strong>Category:</strong> ${blogCategory}</p>
      <p>We've just published a new blog post that we think you'll love!</p>
      <a href="${blogLink}" class="button">Read Now</a>
    </div>
    <div class="footer">
      <p>You're receiving this email because you subscribed to our newsletter.</p>
      <p>© ${new Date().getFullYear()} Blog App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

const getContactConfirmationTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #333; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p>Thank you for reaching out!</p>
      <p><strong>Best regards,</strong><br>Blog App Team</p>
    </div>
  </div>
</body>
</html>
  `;
};

const getAdminContactNotificationTemplate = (name, email, subject, message) => {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;">
  <h2>New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name} (${email})</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <p><strong>Message:</strong></p>
  <p>${message}</p>
</body>
</html>
  `;
};

module.exports = {
  getNewsletterTemplate,
  getContactConfirmationTemplate,
  getAdminContactNotificationTemplate,
};
