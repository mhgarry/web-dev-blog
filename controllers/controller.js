const router = require('express').Router();
const viewRouter = require('../routes/viewRoutes');
const authRouter = require('../routes/registerRoutes');

router.use('/', viewRouter);
router.use('/register', authRouter);

// router.use('/dashboard', 'viewRotes');
module.exports = router;
