var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'duskayame@gmail.com',
		pass: 'somepass'
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

	if (typeof email === 'undefined') {
		return
	}

	var mailOptions = {
		from: 'duskayame@gmail.com',
		to: email,
		subject: 'Lupita\'s Furniture',
		text: 'That was easy!'
	}

	console.log(mailOptions);

	// transporter.sendMail(mailOptions, function (error, info) {
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log("Email send: " + info.response);
	// 	}
	// });

});

module.exports = router;