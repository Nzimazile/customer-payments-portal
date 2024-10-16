// Load environment variables from .env file
require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

// Setup connection to MySQL via Sequelize with error handling
let sequelize;

try {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
  });

  console.log('Connected to the database successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error.message);
}

module.exports = sequelize;
