const User = require('../models/users');
const { hashPassword } = require('../utils/hashPassword');
const { isStrongPassword, isValidEmail } = require("../utils/validation")
const { findUserByEmail } = require('../models/users');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const userService = require('../service/userService')

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error: 'Weak password. Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.',
      });
    }

    const user = await findUserByEmail(email);

    if (user && user.dataValues) {
      return res.status(401).json({ error: 'User Exists!' });
    }

    const hashedPassword = await hashPassword(password);

    User.create({
      name,
      email,
      password_hash: hashedPassword,
    })
    .then(newUser => {
      const tokenPayload = {
        userId: newUser.id,
        email: newUser.email,
      };
      const token = generateToken(tokenPayload);

    res.json({
        message: 'User registered successfully!',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      });

    })
    .catch(dbError => {
      console.error('Error during user registration:', dbError);
      res.status(500).json({ error: 'Internal server error' });
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email
    };
    const token = generateToken(tokenPayload);

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserInfo = (req, res) => {
    const userId = req.params.userId;
  
    User.findUserById(userId, {
      attributes: { exclude: ["password_hash"] }
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ user });
    })
    .catch(error => {
      console.error("Error fetching user information:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error while fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserInfo = async (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
    }

    User.update(
      { name, email: email || user.email },
      { where: { id: userId } }
    )
    .then(result => {
      if (result[0] === 1) {
        res.json({ message: 'User information updated successfully' });
      } else {
        res.status(500).send('Error updating user information');
      }
    })
    .catch(error => {
      console.error('Error updating user information:', error);
      res.status(500).send('Internal server error');
    });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
  getAllUsers,
  updateUserInfo
};
