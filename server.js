var express = require('express');
var multiparty = require('multiparty');
var bodyParser = require('body-parser');
var email = require('./email');

var app = express();
app.use(bodyParser.json());

// insert your parse webhook email address
var parseMail = '{PARSE WEBHOOK EMAIL ADDRESS}';
// clientMail addresses can be inserted from the application
var clientAMail = '{CLIENTA@EXAMPLE.COM}';
var clientBMail = '{CLIENTB@EXAMPLE.COM}';

// assumes conversation is between two people and sets recipient as non-sender
function getRecipient(fields, callback) {
	var fromField = fields.from[0];

	// from field comes formatted as: "Joe Shmoe" <email@example.com>
	sender = fromField.slice((fromField.indexOf("<") + 1), -1);

	var recipient;

	// set recipient choose opposite of sender from clients A/B
	if (sender == clientAMail) {
		recipient = clientBMail;
	} else if (sender == clientBMail) {
		recipient = clientAMail;
	}

	callback(recipient);
}

// parse webhook route
app.post('/incoming', function (req, res) {
	var form = new multiparty.Form();

	form.parse(req, function(err, fields, files) {
		getRecipient(fields, function(recipient) {

			var payload = {
				to: recipient,
				from: fields.from[0],
				replyto: parseMail,
				subject: fields.subject[0],
				html: fields.html[0],
			};

			email.emit('send', payload);
		});

		// response required or webhook will keep trying to send email
		res.send('OK');
    });
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});