const nodemailer = require('nodemailer');

async function sendContactEmail({ name, email, subject, message }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.CONTACT_RECEIVER) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_RECEIVER,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  });
}

module.exports = { sendContactEmail };
