const Contact = require('../models/Contact');
const { sendContactEmail } = require('../services/emailService');

exports.createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
  }

  const contact = await Contact.create({ name, email, subject, message });

  try {
    await sendContactEmail({ name, email, subject, message });
  } catch (error) {
    console.warn('Email could not be sent:', error.message);
  }

  res.status(201).json({ success: true, message: 'Your message has been received.', data: contact });
};

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data: contacts });
};
