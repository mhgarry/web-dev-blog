const router = require('express').Router();

const blogRoutes = require('./post_routes');
const commentRoutes = require('./comments_routes');
const userRoutes = require('./user_routes');

router.use('/posts', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;
