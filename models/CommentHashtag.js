const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const Comment = require('./Comment');
const Hashtag = require('./Hashtag');

class CommentHashtag extends Model {}

CommentHashtag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    modelName: 'comment_hashtag',
  }
);

CommentHashtag.belongsTo(Comment, {
  foreignKey: 'comment_id',
  targetKey: 'id'
});

Comment.hasMany(CommentHashtag, {
  foreignKey: 'comment_id',
  sourceKey: 'id'
});

CommentHashtag.belongsTo(Hashtag, {
  foreignKey: 'hashtag_id',
  targetKey: 'id'
});

Hashtag.hasMany(CommentHashtag, {
  foreignKey: 'hashtag_id',
  sourceKey: 'id'
});

module.exports = CommentHashtag;
