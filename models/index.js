const { Model, DataTypes } = require('sequelize');
const connect = require('../config/connection');
const User = require('./User');
// creating our index with a 1 to 1 relationship from user to profile


class Profile extends Model {}

Profile.init({
	user_id: {
		type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    },
	username: {
		type: DataTypes.STRING,
    allowNull: false,
		validate: {
			isAlphanumeric: true,
			isUsername: true,
			},
			references: {
				model: 'user',
        key: 'username'
			},
			email: {
				type: DataTypes.STRING,
        allowNull: false,
        validate: {
					isEmail: true,
        },
				references: {
          model: 'user',
          key: 'email'
        },
      },
			// profile pic // feature for future builds
			// pic: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   validate: {
      //     isURL: true,
      //   },
      //
      //   },
      // },
			// settings: {
			// 	type: DataTypes.JSON,
      //   defaultValue: {
			// 	}
			// }
			// feature for future builds
		},
  },
});
