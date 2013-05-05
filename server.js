var express = require('express');
var app = express();
var server = require('http').createServer(app);
var nodemailer = require("nodemailer");
var fs = require('fs');
var _port = 8080;
var authentication = process.argv.splice(2);
app.use(express.bodyParser());

var transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: authentication[0],
        pass: authentication[1]
    }
});

var mailOptions = function(address) {
	return {
		from: authentication[0], 
    to: address, 
    subject: "Howard Tang - Thanks for getting in touch", 
    text: "Hello world.",
	};
};

var serveFile = function(request, response, path) {
  fs.readFile(path, function(err, data) {
    if (err) {
      throw err;
    }
    response.end(data);
  });
};

app.get('/', function(request, response) {
  serveFile(request, response, 'index.html');
});

app.get('/index.js', function(request, response) {
  serveFile(request, response, 'index.js');
});

app.post('/emails', function(request, response) {
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
