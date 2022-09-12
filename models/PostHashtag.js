const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const Hashtag = require('./Hashtag');
const Post = require('./Post');

class PostHashtag extends Model {}

PostHashtag.init(
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
    hashtag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hashtag',
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
    modelName: 'post_hashtag',
  }
);

Hashtag.belongsToMany(Post, {
  through: PostHashtag,
  foreignKey: 'hashtag_id'
});

Post.belongsToMany(Hashtag, {
  through: PostHashtag,
  foreignKey: 'post_id'
});

module.exports = PostHashtag;
