const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const User = require('./Users');

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
	  references: {
		model: 'user',
		key: 'id',
	  },
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
	modelName: 'media',
  }
);

Media.belongsTo(User, {
    foreignKey: 'creator_id',
    targetKey: 'id'
});

User.hasMany(Media, {
    foreignKey: 'creator_id',
    sourceKey: 'id'
});

module.exports = Media;
