const jwt = require('jsonwebtoken');
const sanitize = require('sanitize-html');
require('dotenv').config();  // Load environment variables from .env file

// Input Validation Middleware
exports.validateInput = (req, res, next) => {
  const { email, password } = req.body;

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'Invalid email format' });
  }

  // Check password length
  if (password.length < 8) {
    return res.status(400).send({ message: 'Password must be at least 8 characters long' });
  }

  // Sanitize inputs
  req.body.email = sanitize(email);
  req.body.password = sanitize(password);

  next();
};



// JWT Authentication Middleware
exports.verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Verify the token using the secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Attach decoded user info to the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};
