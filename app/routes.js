

module.exports = function(app,mongo) {

    var flights=require('./flights.js');
    var db=require('./db.js');

    app.get('/api/data/inflights', function(rep, res){
    	var flights = require('../inFlights.json');
        // console.log(flights);
    	res.json(flights);
    });

    app.get('/api/data/outflights', function(rep, res){
        var flights = require('../outFlights.json');
        // console.log(flights);
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

    /* SEED DB */
    app.get('/db/seed', function(req, res) {


        flights.seedDB(function(){                 
             db.db().collection('flights').count(function(err,count){     //testing seed
                console.log(count);
    
             });
        });

    });

    /* DELETE DB */
    app.get('/db/delete', function(req, res) {

        db.clearDB(function(){    

            db.db().collection('flights').count(function(err,count){     //testing delete

                console.log(count);                                      //  (new) make sure if it should be dropped instead
    
             });              
                   
        });

    }); 

    app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res){

        

        flights.getOneWayFlightFromDB(function(err,result){             //new

            res.send(result);

        },req.params.origin,req.params.destination,req.params.departingDate,req.params.class);

    });
    
    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

};
