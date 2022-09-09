const { Model, DataTypes } = require('sequelize');

const User = require('./User');

const sequelize = require('../config/connection.js');

class Follow extends Model {}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    following_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    modelName: 'follow',
  }
);

User.hasMany(Follow, {
  foreignKey: 'user_id',
  targetKey: 'id'
});

Follow.belongsTo(User, {
  foreignKey: 'following_user_id',
  targetKey: 'id'
});

module.exports = Follow;