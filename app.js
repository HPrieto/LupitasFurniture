var express = require('express');
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'duskayame@gmail.com',
		pass: 'somepass'
	}
});

console.log("Directory: " + path.join(__dirname, '/'));
app.use(express.static(path.join(__dirname, '/')));
app.set('view engine', 'hjs');

app.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

app.get('/emailrequest', function (req, res, next) {
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

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email send: " + info.response);
		}
	});

});

app.listen(3000, () => console.log('Listening to Port: 3000'));