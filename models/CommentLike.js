const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const Comment = require('./Comment');
const User = require('./User');

class CommentLike extends Model {}

CommentLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comment',
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
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    modelName: 'comment_like',
  }
);

Comment.hasMany(CommentLike,{
    foreignKey:'comment_id',
    targetKey:'id'
});

CommentLike.belongsTo(User, {
    foreignKey:'user_id',
    targetKey:'id'
});

module.exports = CommentLike;