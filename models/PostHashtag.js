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


PostHashtag.belongsToMany(Post, {
  foreignKey: 'post_id',
  targetKey: 'id'
});

Post.hasMany(PostHashtag, {
  foreignKey: 'post_id',
  sourceKey: 'id'
});

PostHashtag.belongsTo(Hashtag, {
  foreignKey: 'hashtag_id',
  targetKey: 'id'
});

Hashtag.hasMany(PostHashtag, {
  foreignKey: 'hashtag_id',
  sourceKey: 'id'
});

module.exports = PostHashtag;
