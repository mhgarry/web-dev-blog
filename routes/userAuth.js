const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// register an account and save to database
router.post('/register', [
  // pass in form data to validate
  check('email').isEmail(),
  check('username').isAlphanumeric(),
  check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=])[A-Za-z\d@#$%^&+!=]+$/i)
    .isLength({ min: 8, max: 32 }),
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
// login to account and start session
// login route
router.post('/login', passport.authenticate('local', (req, res) => {
	// auth successful session started user can access protected routes
	req.session.userId = req.user.id;
	res.status(200).json({ message: 'Login Successful, blog your brain cache!', user: req.user});
}));

// logout route
router.get('/logout', async (req, res) => {
	try {
		// remove session from and redirect to landing page
	req.session.destroy();
	res.redirect('/');
	re.status(200).json({ message: 'See you next time!'});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Something went wrong, please refresh the page and try again.'});
	}
});
module.exports = router;
