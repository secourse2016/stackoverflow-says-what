module.exports = function(app,mongo) {

    /* GET ALL STATES ENDPOINT */
    //app.get('/api/data/codes', function(req, res) {
    //  var codes =  require('../airports.json');
    //  res.json( codes );
    //});

    app.get('/api/data/flights', function(rep, res){
    	var flights = require('../flights.json');
    	res.json(flights);
    });

    app.get('/api/data/airports', function(rep, res){
    	var airports = require('../airports.json');
    	res.json(airports);
    });

    app.get('/api/data/aircrafts', function(req, res){
    	var aircrafts = require('../aircrafts.json');
    	res.json(aircrafts);
    });

    app.get('/api/data/bookings', function(req, res){
    	var bookings = require('../bookings.json');
    	res.json(bookings);
    });
    
    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

};
