var express       = require('express');
var bodyParser    = require('body-parser');
var app           = express();
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// =======
// var bodyparser = require('body-parser');
// var app           = express();
// >>>>>>> ea7076ae98fa13d7c1803d28741e3f9aee2a9474
app.use(express.static('public'));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: false}));
require('./routes')(app);

module.exports = app;
