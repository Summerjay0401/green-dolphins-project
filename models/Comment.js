const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const Post = require('./Post');
const User = require('./Users');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    content: {
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
    updatedAt: true,
    modelName: 'comment',
  }
);

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  targetKey: 'id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  sourceKey: 'id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
});

User.hasOne(Comment, {
  foreignKey: 'user_id',
  sourceKey: 'id'
});

module.exports = Comment;
