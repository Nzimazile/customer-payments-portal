const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
  // Define your user model attribute
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Method to find a user by email
User.findByEmail = async (email) => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    throw new Error('Error finding user by email');
  }
};

// Sync the model (optional)
User.sync();

module.exports = User;
