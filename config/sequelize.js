const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const logger = require('./logger');

// Load environment variables from .env file
dotenv.config();

// Read database credentials from environment variables
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});



// Test the database connection
async function testConnection() {

  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
