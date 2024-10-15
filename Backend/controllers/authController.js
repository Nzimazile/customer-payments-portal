const bcrypt = require('bcrypt');
const User = require('../models/User');
const rateLimit = require('express-rate-limit');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create(email, hashedPassword);
    res.status(201).send({ message: 'User registered successfully' });
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

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    res.status(200).send({ message: 'Login successful' });
  } catch (err) {
    res.status(500).send({ message: 'Error logging in', error: err.message });
  }
};
