# SendGrid Parse Webhook Example
Written in node.js, this app utilizes SendGrid's parse webhook API to enable two-way email communication between two separate clients via an independent endpoint.  Emails are first sent to a specified endpoint email address, at which point they are re-routed to a specified email address.  Reply-to is set such that a reply will automatically be sent to the original sender.
------
## Use Case
This may be used to enable messaging inside of an application.  With this setup, users can communicate with each other over the application, enabling data storage, but not requiring users to visit the app.  All communication can be completed in users' inboxes.
------
## Setup
The following steps are required to begin parsing email:
- Point the MX Record of the Domain/Hostname or Subdomain to mx.sendgrid.net
- Associate the Domain/Hostname and the URL in the Parse API settings page. This can also be done using the Parse Settings Endpoint.
------
## Resources
[SendGrid Inbound Parse Webhook](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html)
[SendGrid Node.js Library](https://github.com/sendgrid/sendgrid-nodejs)


