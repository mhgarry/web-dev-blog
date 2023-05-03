/* eslint-disable linebreak-style */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
// creates a new passport strategy to authenticate instace of User model
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  // tries to find the user by email, if it's not the correct email returns an error message
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'Incorrect email' });
    }
    // tries to find the user by password using the hashed bcrypt password created in user model
    const isValid = await user.verifyPassword(password);
    if (!isValid) {
      return done(null, false, { message: 'Incorrect password' });
    }
    // if finds email and password user is validated
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));
// eslint-disable-next-line max-len
// gives the user access to protected routes through serializing their model instance for this session
// finds user by the id automatically created by the user model
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// when the user leaves takes away session access by deserializing the instance
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = {
  passport,
};
