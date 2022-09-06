const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class PostMedia extends Model {}

PostMedia.init(
  {
    media_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post_media',
  }
);

module.exports = PostMedia;