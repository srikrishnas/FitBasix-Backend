const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routeConfig');
const passport = require('./src/middlewares/passport')
const cors = require('cors');
const logger = require('./config/logger');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

// Apply security headers using helmet middleware
app.use(helmet());

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429, // Too Many Requests
});


app.use(limiter)

app.use(bodyParser.json()); // Parse JSON requests

// Middleware setup
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(passport.initialize()); // Initialize Passport
app.use(cors());

// Use the routes middleware
app.use('/v1', routes);

// // Sample route for testing
app.get('/', (req, res) => {
  res.send('Hello, this is your fitness app backend!');
});

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
