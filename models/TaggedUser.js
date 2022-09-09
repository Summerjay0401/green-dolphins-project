const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class TaggedUser extends Model {}

TaggedUser.init(
  {
    target_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    target_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    createdAt: true
  }
);

module.exports = Post;