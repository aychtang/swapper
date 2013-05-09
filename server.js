// Insert your gmail address and password at the CLI.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var nodemailer = require("nodemailer");
var fs = require('fs');
var _port = 8080;

// 3rd and 4th argument from process arguments used as authentication for SMTP.
var authentication = process.argv.splice(2);
app.use(express.bodyParser());

// Set up mechanism to send emails
// * TODO *: Modularise all email code and export to this file.
var transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: authentication[0],
        pass: authentication[1]
    }
});

var mailOptions = function(targetAddress) {
	return {
		from: authentication[0], 
    to: targetAddress, 
    subject: "Howard Tang - Thanks for getting in touch", 
    text: "Hello world.",
	};
};

// * TODO *: Modularise this into utils/helper file and export to this file.
var serveFile = function(request, response, path) {
  fs.readFile(path, function(err, data) {
    if (err) {
      throw err;
    }
    response.end(data);
  });
};

// Express request handlers.
app.get('/', function(request, response) {
  serveFile(request, response, 'index.html');
});

app.get('/index.js', function(request, response) {
  serveFile(request, response, 'index.js');
});

app.post('/emails', function(request, response) {
  // Send email out to target.
  // * TODO *: Add to database collection and check the target against the database.
  // * TODO *: Modularise all emailing code and export to this file.
	transport.sendMail(mailOptions(request.body.email), function(error, response) {
    if (error) {
        console.log(error);
    } else {
        console.log("Message sent: " + response.message);
    }
	});
  response.end('Received ' + request.body.email);
});

server.listen(_port);
console.log('we are on port ' + _port);
