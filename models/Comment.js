
const { Model, DataTypes } = require('sequelize');
const connect = require('../config/connection');
const User = require('./User');
const Post = require('./Posts');

class Comments extends Model {}

Comments.init(
	{
		id: {
			type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER,
      allowNull: false,
			references: {
				model: 'users',
				key: 'id'
      },
	},
	post_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'posts',
			key: 'id'
	},
},
comment_body: {
	type: DataTypes.STRING,
  allowNull: false,
	validate: {
		len: [10, 500],
		isAlphanumeric: true,
	}
},
  created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		allowNull: false,
		allowNull: false,
		validate: {
      isDate: true,
    },
	},
},{
    sequelize: connect,
		timestamps: true,
		createAt: 'created_at',
		updatedAt: false,
		modelName: 'comments',
    },
);


module.exports = Comments;
