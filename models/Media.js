const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Media extends Model {}

Media.init(
  {
	id: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	  primaryKey: true,
	  autoIncrement: true,
	},
	creator_id: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	},
	content_type: {
	  type: DataTypes.INTEGER, // 0: image, 1: video
	  allowNull: false,
	},
	content_url: {
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
  }
);

module.exports = Media;