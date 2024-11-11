const bcrypt = require('bcrypt');
const User = require('../models/User');
const rateLimit = require('express-rate-limit');


exports.loginUser = async (req, res) => {
  // getting values from body
  const { email, password } = req.body;

  try {

    // calling funtion that returns user info from database
    const user = await User.findByEmail(email);
    // check to see if user has actually been retunred
    if (!User) {
      return res.status(404).send({ message: 'User not found' });
    }
    // matching password from database to password in body
    if (typeof password !== 'string' || typeof user.password !== 'string') {
      throw new Error('Password and hash must be strings');
    }


    try {
    
      
      const validPassword = await bcrypt.compare(password, user.password);
    
      console.log('Password comparison result:', validPassword);
    
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
    
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      console.error('Error during password comparison:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
    // return value for succeful login
    
  } catch (err) {
    //error handling if issues are found
    res.status(500).send({ message: 'Error logging in', error: err.message });
  }
};
