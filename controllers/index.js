const router = require('express').Router();

const apiRoutes = require('./api');
const viewRoutes = require('./view_routes');
const authRoutes = require('./auth_routes');

router.use('/api', apiRoutes);
router.use('/', viewRoutes);
router.use('/', authRoutes);

module.exports = router;
