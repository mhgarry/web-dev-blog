const express = require('express')
const permissions = require('./api/permissionsRoute');



router.get('/dashboard', async (req, res, next) => {
	try {
	await permissions()(req, res, next);
	res.render('dashboard', { user: req.user });
	res.status(200).json({successfulLogin});
	} catch (error) {
    console.error(error);
    res.status(500).json({ message: somethingWentWrong });
  }
});

router.get('/post', async (req, res, next) => {
	try {
	await permissions()(req, res, next);
	res.render('dashboard', { user: req.user });
	res.status(200).json({successfulLogin});
	} catch (error) {
    console.error(error);
    res.status(500).json({ message: somethingWentWrong });
  }
});

router.get('/interact', async (req, res, next) => {
	try {
	await permissions()(req, res, next);
	res.render('dashboard', { user: req.user });
	res.status(200).json({successfulLogin});
	} catch (error) {
    console.error(error);
    res.status(500).json({ message: somethingWentWrong });
  }
});

module.exports = router;

