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
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
