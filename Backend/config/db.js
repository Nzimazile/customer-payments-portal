const { Sequelize } = require('sequelize');

// Setup connection to MySQL via Sequelize
const sequelize = new Sequelize('payments_db', 'root', '12345', {
  host: 'localhost',  // Change to your host if needed
  dialect: 'mysql'
});

module.exports = sequelize;
