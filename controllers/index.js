const router = require('express').Router();
const homeRouter = require('./index_test_route');
const authRouter = require('./authRoutes');

router.use('/', homeRouter);
router.use('/register', authRouter);
router.use('/login', authRouter)
// router.use('/dashboard', 'viewRotes');
module.exports = router;
