const router = require('express').Router(); // is the main router for our api routes
const { User, Post, Comment } = require('../../models'); // brings in all models we need for our apis

const permissionsRoutes = require('./permissionsRoute'); // give access to protected routes when authenticated in user api
const registerRoutes = require('./registerRoute'); // registers a user our user api and db
const postRoutes = require('./postRoutes'); // saves post data to the db
const commentRoutes = require('./commentRoutes'); // saves comment data to the db

router.use('/permissions', permissionsRoutes);
router.use('/register', registerRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
