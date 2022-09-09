const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Block extends Model {}

Block.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    block_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    createdAt: true
  }
);

module.exports = Block;