const router = require('express').Router();

const blogRoutes = require('./post_routes');
const userRoutes = require('./user_routes');
const commentRoutes = require('./comments_routes');

app.use('/posts', blogRoutes);
app.use('/posts/comments', commentRoutes);
app.use('/user', userRoutes);

module.exports = router;
