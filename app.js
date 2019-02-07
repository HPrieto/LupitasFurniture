var express = require('express');
var app = express();
var path = require('path');
var firebase = require('firebase');

// Initialize Fireabse
var firebaseConfig = {
    apiKey: "AIzaSyAcVkAlPudoOqXwchD_aOu2mhXV_H-mRqY",
    authDomain: "lupitasfurniture-f583c.firebaseapp.com",
    databaseURL: "https://lupitasfurniture-f583c.firebaseio.com",
    projectId: "lupitasfurniture-f583c",
    storageBucket: "lupitasfurniture-f583c.appspot.com",
    messagingSenderId: "75776435304"
};
firebase.initializeApp(firebaseConfig);

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
