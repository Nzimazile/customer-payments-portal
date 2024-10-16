const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const csrf = require('csurf');
const router = express.Router();

// Initialize CSRF protection
const csrfProtection = csrf({ cookie: true });

// Serve CSRF token to the frontend (This route provides a token)
router.get('/get-csrf-token', csrfProtection, (req, res) => {
    // Send the token as a JSON response so frontend can access it
    res.json({ csrfToken: req.csrfToken() });
  });
  
// Register and login routes
router.post('/register', authMiddleware.validateInput, authController.registerUser);

router.post('/login', authMiddleware.validateInput, authController.loginUser);

module.exports = router;
