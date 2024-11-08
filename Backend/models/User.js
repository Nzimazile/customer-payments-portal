const { Sequelize, DataTypes } = require('sequelize');
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
  },
  createdAt: {
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW,//automatically assign value to database
  },
  updatedAt: {
    type: DataTypes.DATE, // Automatically updated on any record update
    allowNull: false,
    defaultValue: DataTypes.NOW//automatically assign value to database
}
}
);


// Method to find a user by email
User.findByEmail = async (email) => {
  try {
    // get infomation from database based on email
    return await User.findOne({ where: { email } });
  } catch (error) {
    //error handling
    throw new Error('Error finding user by email');
  }
};

// Sync the model
User.sync();

module.exports = User;
