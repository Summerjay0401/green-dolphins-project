const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Follow extends Model {}

Follow.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'follows',
  }
);

module.exports = Follow;