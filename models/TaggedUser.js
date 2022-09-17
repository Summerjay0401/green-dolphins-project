const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const Post = require('./Post');
const User = require('./Users');

class TaggedUser extends Model {}

TaggedUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'tagged_user',
  }
);

TaggedUser.belongsTo(Post,{
  foreignKey:'post_id',
  targetKey:'id'
});

Post.hasMany(TaggedUser,{
  foreignKey:'post_id',
  sourceKey:'id'
});

TaggedUser.belongsTo(User,{
  foreignKey:'user_id',
  targetKey:'id'
});

User.hasMany(TaggedUser,{
  foreignKey:'user_id',
  sourceKey:'id'
});

module.exports = TaggedUser;
