require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

const connect = require('./config/connection');
const indexRouter = require('./controllers/index');

const app = express();

// setup handlebars engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);

connect.sync().then(() => {
  app.listen(PORT, () => console.log('Server listening on port %s', PORT));
});
