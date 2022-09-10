const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const Media = require('./Media');
const Post = require('./Post');

class PostMedia extends Model {}

PostMedia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    media_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'media',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
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
    modelName: 'post_media',
  }
);

Media.belongsToMany(Post, {
  through: PostMedia,
  foreignKey: 'media_id'
});

Post.belongsToMany(Media, {
  through: PostMedia,
  foreignKey: 'post_id'
});

module.exports = PostMedia;
