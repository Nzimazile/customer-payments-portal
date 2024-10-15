const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register and login routes
router.post('/register', authMiddleware.validateInput, authController.registerUser);

router.post('/login', authMiddleware.validateInput, authController.loginUser);

module.exports = router;
