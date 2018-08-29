var express = require('express');
var app = express();
var path = require('path');

// routes
var indexRouter = require('./routes/index');

// Set path
app.use(express.static(path.join(__dirname, '/')));

// Set View Engine
app.set('view engine', 'hjs');

// Set Routes
app.use('/', indexRouter);

// Begin server
app.listen(3000, () => console.log('Listening to Port: 3000'));