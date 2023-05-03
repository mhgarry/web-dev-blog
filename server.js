require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const { engine } = require('express-handlebars');

const app = express();

// make handlebars engine
app.engine('hbs', engine({
	//make extension name 'hbs' isntead of handlebars
	extname: '.hbs',
}));
//app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup the session request
app.use(session({
	// logs the user into the session and make sure the client's cookie matches the secret
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));

// app.use('/', routes)

app.listen(PORT, () => console.log('Sever started on port %s', PORT));
