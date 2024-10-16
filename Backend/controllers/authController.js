const bcrypt = require('bcrypt');
const User = require('../models/User');
const rateLimit = require('express-rate-limit');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  const trimmedPassword = password.trim();

  if (!email || !trimmedPassword) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword =  await bcrypt.hash(trimmedPassword, salt);
      console.log('hashed password:', hashedPassword);
    const newUser = await User.create({ email, password : hashedPassword });
    res.status(201).send({ message: 'User registered successfully', user: newUser  });
  } catch (err) {
    res.status(500).send({ message: 'Error registering user', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    res.status(200).send({ message: 'Login successful' });
  } catch (err) {
    res.status(500).send({ message: 'Error logging in', error: err.message });
  }
};
