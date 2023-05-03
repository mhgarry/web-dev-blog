const router = require('express').Router();
const homeRouter = require('./index_test_route');
const authRouter = require('./authRoutes');
const { passport } = require('../auth/passport');

router.use('/', homeRouter);
router.use('/dashboard', authRouter);

module.exports = router;
