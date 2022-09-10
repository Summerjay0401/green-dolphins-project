const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Hashtag extends Model {}

Hashtag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hashtag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    modelName: 'hashtag',
  }
);

module.exports = Hashtag;
