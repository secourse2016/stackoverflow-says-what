var express       = require('express');
var app           = express();
require('dotenv').load();
app.use(express.static('public'));
require('./routes')(app);

module.exports = app;
