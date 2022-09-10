const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const User = require('./User');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    text_content: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    updatedAt: true,
    modelName: 'post',
  }
);

Post.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  sourceKey: 'id'
});

module.exports = Post;
