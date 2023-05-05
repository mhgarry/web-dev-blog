const router = require("express").Router();

const apiRoutes = reuqire('./api');
const userRoutes = require('./userRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/user', userRoutes);

module.exports = router;
