const router = require('express').Router();

router.get('/', (res, req) => {
	res.render('index');
});

module.exports = router;
