const Contact = require('../models/Contact');
const { sendEmail } = require('../config/email');
const { getContactConfirmationTemplate, getAdminContactNotificationTemplate } = require('../utils/emailTemplates');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await Contact.create({ name, email, subject, message });

    const userHtml = getContactConfirmationTemplate(name);
    sendEmail({ to: email, subject: 'Thank you for contacting us', html: userHtml })
      .catch(err => console.error(err));

    const adminHtml = getAdminContactNotificationTemplate(name, email, subject, message);
    sendEmail({ to: process.env.SMTP_USER, subject: `New Contact: ${subject}`, html: adminHtml })
      .catch(err => console.error(err));

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const messages = await Contact.find(filter).sort({ createdAt: -1 });
    
    res.json({ success: true, messages, total: messages.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};
