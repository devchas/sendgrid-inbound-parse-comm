'use strict';

const EventEmitter = require('events');

// create new event object email
class Email extends EventEmitter {}
const email = new Email();

var sendgrid  = require('sendgrid')(process.env.{APIK_KEY});

// create the send action for the email object
email.on('send', function(payload) {
	sendgrid.send(payload, function(err, json) {
	  if (err) { console.error(err); }
	  console.log(json);
	});
});

module.exports = email;
