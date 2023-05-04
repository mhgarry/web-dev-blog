const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = require('express').Router();

router.post('/register', [
  // pass in form data to validate
  check('email').isEmail(),
  check('username').isAlphanumeric(),
  check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=])[A-Za-z\d@#$%^&+!=]+$/i)
    .isLength({ min: 8, max: 24 }),
], async (req, res) => {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // create and save new user from form data
  const { email, password, username } = req.body;
  const user = await User.create({ email, username, password });
	user = user.save();
  // send user to dashboard page and successfully star their session
  res.redirect('/dashboard');
});

module.exports = router;
