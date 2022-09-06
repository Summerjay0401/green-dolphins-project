const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class PostHashtag extends Model {}

PostHashtag.init(
  {
    post_id: {
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
    modelName: 'post_hashtag',
  }
);

module.exports = PostHashtag;