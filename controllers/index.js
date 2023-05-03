const router = require('express').Router();
const homeRouter = require('./index_test_route');

router.use('/', homeRouter);

module.exports = router;
