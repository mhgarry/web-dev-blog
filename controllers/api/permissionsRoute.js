// creating permissions for our user api
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = require('express').Router();

const jwtSecret = process.env.JWT_SECRET;
const invalidCredentials = 'Invalid username or password';
const somethingWentWrong = 'Something went wrong';
const successfulLogin = 'You/re in, time to dump your memory to this some posts';

const givePermissions = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId).exec();

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: invalidCredentials });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: somethingWentWrong });
  }
};

modules.export = { router, givePermissions };
