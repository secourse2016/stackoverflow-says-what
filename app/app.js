var express       = require('express');
var bodyparser = require('body-parser');
var app           = express();
require('dotenv').load();
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
require('./routes')(app);

module.exports = app;
