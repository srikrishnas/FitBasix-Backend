const { SequelizeConnectionError } = require('sequelize');

function databaseErrorHandler(err, req, res, next) {
  if (err instanceof SequelizeConnectionError) {
    // Handle "Too many connections" error or other database errors
    // console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error (database)' });
  } else {
    // Pass other errors to the default error handler
    next(err);
  }
}

module.exports = databaseErrorHandler;
