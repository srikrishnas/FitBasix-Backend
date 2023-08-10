const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Custom column names for timestamps
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});


// Static method to find a user by their email
User.findUserByEmail = async function (email) {
  try {
    const user = await User.findOne({
      where: {
        email: email, // Assuming 'email' field stores the email address
      },
    });
    return user;
  } catch (error) {
    console.error('Error while finding user by ID:', error);
    return { error: 'Error finding user id' };
  }
};

User.findUserById = async function (id) {
  try {
    const user = await User.findOne({
      where: {
        id: id, // Assuming 'email' field stores the email address
      },
    });
    return user;
  } catch (error) {
    console.error('Error while finding user by ID:', error);
    return 1;
  }
};

module.exports = User;
