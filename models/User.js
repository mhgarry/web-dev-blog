/* eslint-disable max-len */
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const { check } = require('express-validator');
const connect = require('../config/connection');

class User extends Model {
  // rename checkPass to verifyPassword for clarity
  async verifyPassword(password) {
    const isValid = await bcrypt.compare(password, this.password);
    // returns true if password is valid, false otherwise
    return isValid;
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    // fix typo in username property
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // modify password validation to allow for special characters
        len: [8, 32],
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=])[A-Za-z\d@#$%^&+!=]+$/i,
      },
    },
  },
  {
    sequelize: connect,
    modelName: 'user',
    hooks: {
      async beforeCreate(user) {
        // hash the user's password before storing it in the database
        const hashPass = await bcrypt.hash(user.password, 10);
        user.password = hashPass;
      },
    },

  },
);
// use express-validator to validate email before creating a new user
// modify checkEmail function to return a Promise that resolves if the email is valid, or rejects with an error message if it is not
// eslint-disable-next-line arrow-body-style
User.beforeValidate((user) => {
  return check(user.email)
    .notEmpty()
    .isEmail()
    .run(user);
});

module.exports = User;
