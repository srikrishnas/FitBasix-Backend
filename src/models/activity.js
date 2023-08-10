const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize'); // Import your Sequelize instance

const Activity = sequelize.define('activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  duration: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  distance: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  distance_unit: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
},{
  tableName: 'activity',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  });

module.exports = Activity;
