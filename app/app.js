var express       = require('express');
var bodyParser    = require('body-parser');
var app           = express();
var stripe 		  = require('stripe')("sk_test_Tr18gRe27kRjX4WlBQlMTMum");
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: false}));
require('./routes')(app);

module.exports = app;
