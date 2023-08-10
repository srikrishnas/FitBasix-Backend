const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  try {
    const saltRounds = 10; // The number of rounds for salting (work factor)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error while hashing password:', error);
    throw error;
  }
}

module.exports = {
  hashPassword,
};
