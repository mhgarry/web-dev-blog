const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const passport = require('passport');

// register route
router.post('/register', [
  // pass in form data to validate
  check('email').isEmail(),
  check('username').isAlphanumeric(),
  check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=])[A-Za-z\d@#$%^&+!=]+$/i)
    .isLength({ min: 8, max: 24 }),
], async (req, res) => {
  try {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // create new user from form data
    const user = req.body;
    const newUser = await User.create(user);

    // check for valid user and redirect/error throw
    if (!newUser) {
      throw new Error('Could not create a user');
    }

    //tell user they successfully created an account and direct them to the dashboard
    return res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.status(200).json({ message: 'Internal brain wiring goes in blog post' });
});

module.exports = router;
