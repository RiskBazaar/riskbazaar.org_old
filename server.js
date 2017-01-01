// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');

var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

// instantiate the app
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './')));

app.listen(8000, function() {
  console.log('server listening on: 8000');
  console.log('RiskBazaar');
});



var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'riskbazaar.info@gmail.com',
        pass: 'myriskbazaarinfo1'
    }
});

app.post('/send_contact_form', function(req, res) {

  // console.log(req.body);
  // console.log('in the server!!!');

  //construct email 
  //----------------------------------------------------------------------------

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '<riskbazaar.info@gmail.com>', // sender address //does not change
	    to: '<alexandra@riskbazaar.org>', // receivers //changes based on the student
	    subject: 'Contact Form submitted from RiskBazaar Marketing Page', // Subject line

	    html: '<div style="font-family:Georgia;font-size:15px"><h3> Contact form sent from RiskBazaar landing website </h3><h4> The following information was submitted: </h4><br>' + 
	    "<b>Name</b>: " + req.body.name+ " "+"<br>"+
	    "<b>Email</b>: "+ req.body.email+"<br>"+
	    "<b>Message</b>: "+ req.body.message+"<br>"
	};

	// console.log("mailOPTIONS", mailOptions);

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	       console.log(error);
	       res.send(error);
	    }
	    // console.log('Message sent: ' + info.response);
	    res.json(info.response);
	});


	//----------------------------------------------------------------------------

});


app.post('/send_update_form', function(req, res) {

  // console.log(req.body);
  // console.log('in the server!!!');

  //construct email 
  //----------------------------------------------------------------------------

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '<riskbazaar.info@gmail.com>', // sender address //does not change
	    to: '<alexandra@riskbazaar.org>', // receivers //changes based on the student
	    subject: 'Stay Updated submitted from RiskBazaar Marketing Page', // Subject line

	    html: '<div style="font-family:Georgia;font-size:15px"><h3> Subscription UPDATE form sent from RiskBazaar landing website </h3><h4> The following information was submitted: </h4><br>' + 
	    "<b>Email</b>: "+ req.body.email +"<br>"
	};

	// console.log("mailOPTIONS", mailOptions);

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	       console.log(error);
	       res.send(error);
	    }
	    // console.log('Message sent: ' + info.response);
	    res.json(info.response);
	});


	//----------------------------------------------------------------------------

});





