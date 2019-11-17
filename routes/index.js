var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var masterEmail = 'lupitasfurniturewebsite@gmail.com';
var firebase = require('firebase');
var path = require('path');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: masterEmail,
		pass: 'Cabinets2018'
	}
});

// firebase init
/*
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};*/
firebase.initializeApp({
  apiKey: 'AIzaSyAcVkAlPudoOqXwchD_aOu2mhXV_H-mRqY',
  authDomain: 'lupitasfurniture-f583c.firebaseapp.com',
  projectId: 'lupitasfurniture-f583c',
  databaseURL: "https://lupitasfurniture-f583c.firebaseio.com"
});

var database = firebase.firestore();
var reviews = database.collection('reviews');

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/get-reviews', function (req, res, next) {
	reviews.get().then(snapshot => {
		var obj = [];
		snapshot.forEach(doc => {
			var data = doc.data();
			obj.push({
				created: (data.created.getMonth()+1) + '/' + data.created.getDate() + '/' + data.created.getFullYear(),
				name: data.name,
				rating: data.rating,
				review: data.review
			});
		});
		res.send(obj);
	});
});

router.get('/submit-review', function (req, res, next) {
	if (typeof req === 'undefined') {
		return
	}

	var currentTime = new Date();
	var name = req.query.name;
	var rating = req.query.rating;
	var review = req.query.review;
	var ip = req.connection.remoteAddress;

	if (isNaN(rating)) {
		return
	}

	console.log("Updating docs.");
	reviews.doc(ip).set({
		name: name,
		rating: rating,
		review: review,
		created: currentTime
	});

	res.send({success: true})

});

router.get('/emailrequest', function (req, res, next) {
	if (typeof req === 'undefined') {
		return
	}

	// Email and Password input by user
	var email = req.query.email;
	var phone = req.query.phone;

	if (typeof email === 'undefined') {
		return
	}

	// Current Time Formatted
	var currentTime = new Date();
	var timeString = currentTime.toLocaleString('en-US');

	// Email message body
	var message = "";
	message += "Email: ";
	message += email;
	message += "\n";
	message += "Phone: ";
	message += phone;
	message += "\nTime Sent: ";
	message += timeString;

	var mailOptions = {
		from: masterEmail,
		to: masterEmail,
		subject: 'Lupita\'s Furniture ' + timeString,
		text: message
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email send: " + info.response);
		}
	});

});

module.exports = router;
