// proctected routes
const router = require('express').Router();
const { passport } = require('../auth/passport');

// user must be authenticated to get in to dashbaord or else will be thrown to login page again
router.get(
  '/dashboard',
  passport.authenticate('local'),
  (req, res) => {
    res.send('Got something on your mind, create a new blog post!');
  },
);

module.exports = router;
