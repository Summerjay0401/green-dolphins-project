const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const User = require('./User');

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

Follow.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
});

User.hasMany(Follow,{
  foreignKey:'user_id',
  sourceKey:'id'
});

Follow.belongsTo(User, {
  foreignKey: 'following_user_id',
  targetKey: 'id'
});

User.hasOne(Follow,{
  foreignKey:'following_user_id',
  sourceKey:'id'
});

module.exports = Follow;
