const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWTSECRET

function generateToken(payload) {
  return 'Bearer ' + jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  generateToken,
  verifyToken,
};
