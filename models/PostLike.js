const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const Post = require('./Post');
const User = require('./User');

class PostLike extends Model {}

PostLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
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
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    modelName: 'post_like',
  }
);

PostLike.belongsTo(Post, {
  foreignKey: 'post_id',
  targetKey: 'id'
});

Post.hasMany(PostLike, {
  foreignKey:'post_id',
  sourceKey:'id'
});

PostLike.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
});

User.hasOne(PostLike, {
  foreignKey:'user_id',
  sourceKey:'id'
});

module.exports = PostLike;
