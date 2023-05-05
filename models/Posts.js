
const { Model, DataTypes } = require('sequelize');
const connect = require('../config/connection');
const User = require('./User');

class Posts extends Model {}

Posts.init(
	{
		id: {
			type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
		},
		post_title: {
			type: DataTypes.STRING,
      allowNull: false,
			validate: {
        len: [10, 100],
				isAlphanumeric: true
      }
	},
// 	post_images: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
//       validate: {
//         isImage: true,
//       },
// },
	post_content: {
			type: DataTypes.TEXT,
      allowNull: false,
      validate: {
				len: [10, 1000],
				notEmpty: true
	}
},
  user_id: {
		type: DataTypes.INTEGER,
		references: {
			model: 'users',
      key: 'id',
		},
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
		modelName: 'posts',
    },
);


module.exports = Posts;
