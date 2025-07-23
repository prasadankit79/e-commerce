const express = require('express');
const router = express.Router();

// Hardcoded admin login (for demo)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

// Admin login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return res.status(200).json({ message: 'Admin login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
