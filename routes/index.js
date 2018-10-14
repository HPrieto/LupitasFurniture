var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var masterEmail = 'lupitasfurniturewebsite@gmail.com';

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

router.get('/emailrequest', function (req, res, next) {
	if (typeof req === 'undefined') {
		return
	}

	var email = req.query.email;
	var phone = req.query.phone;

	if (typeof email === 'undefined') {
		return
	}

	var currentTime = new Date();
	var timeString = currentTime.toLocaleString('en-US');

	var message = "Email: ";
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

	console.log(mailOptions);

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email send: " + info.response);
		}
	});

});

module.exports = router;