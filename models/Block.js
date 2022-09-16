const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const User = require('./Users');

class Block extends Model {}

Block.init(
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
    block_user_id: {
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
    modelName: 'block',
  }
);

Block.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
});

User.hasMany(Block, {
  foreignKey: 'user_id',
  sourceKey: 'id'
});

Block.belongsTo(User, {
  foreignKey: 'block_user_id',
  targetKey: 'id'
});

User.hasOne(Block, {
  foreignKey: 'block_user_id',
  sourceKey: 'id'
});

module.exports = Block;
