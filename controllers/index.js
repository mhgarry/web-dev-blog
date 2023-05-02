const router = require('express').Router();

const apiRoutes = require('./api');
const landingRoutes = require('./view_routes');
const authRoutes = require('./auth_routes');


router.use('/api', apiRoutes);
router.use('/', landingRoutes);
router.use('/', authRoutes);

module.exports = router;
