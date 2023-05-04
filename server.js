
require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const PORT = process.env.PORT || 5000;

const connect = require('./config/connection');
const controller = require('./controllers/controller');
const app = express();

// setup handlebars engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// setup helmet middleware
app.use(helmet());

// setup cors middleware
app.use(cors());

// setup rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// setup session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use('/', controller);

connect.sync().then(() => {
  app.listen(PORT, () => console.log('Server listening on port %s', PORT));
});
