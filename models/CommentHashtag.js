const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class CommentHashtag extends Model {}

CommentHashtag.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'comment_hashtag',
  }
);

module.exports = CommentHashtag;