const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ success: false, message: 'Admin credentials are not configured.' });
  }

  const validEmail = email.toLowerCase() === adminEmail.toLowerCase();
  const validPassword = password === adminPassword || await bcrypt.compare(password, adminPassword).catch(() => false);

  if (!validEmail || !validPassword) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ role: 'admin', email: adminEmail }, process.env.JWT_SECRET, { expiresIn: '4h' });
  res.json({ success: true, token });
};
