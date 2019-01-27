var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var masterEmail = 'lupitasfurniturewebsite@gmail.com';
var firebase = require('firebase');
var path = require('path');

var firebaseConfig = {
    apiKey: "AIzaSyAcVkAlPudoOqXwchD_aOu2mhXV_H-mRqY",
    authDomain: "lupitasfurniture-f583c.firebaseapp.com",
    databaseURL: "https://lupitasfurniture-f583c.firebaseio.com",
    projectId: "lupitasfurniture-f583c",
    storageBucket: "lupitasfurniture-f583c.appspot.com",
    messagingSenderId: "75776435304"
};
firebase.initializeApp(firebaseConfig);

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: masterEmail,
		pass: 'Cabinets2018'
	}
});

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/reviews', function (req, res, next) {
	res.render('reviews_modal');
});

router.post('/ratingsubmit', function (req, res, next) {
	if (typeof req === 'undefined') {
		return
	}

	var currentTime = new Date();
	var name = req.query.name;
	var rating = req.query.rating;
	var comment = req.query.comment;
	var ip = req.connection.remoteAddress;

	if (isNaN(rating)) {
		return
	}

	return;
	var database = firebase.database();
	var ref = database.ref('ratings');

	ref.set({
		name: name,
		rating: rating,
		comment: comment,
		ip: ip
	});

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
