var express       = require('express');
var app           = express();
var flights       = require('../flights.js');
var db            = require('../db.js');

app.use(express.static('public'));
require('./routes')(app);

module.exports = app;

//
/* SEED DB */
    app.get('/db/seed', function(req, res) {
    	flights.seedFlights(function(err, seeded){
            console.log('seeded the flights');
            res.send(seeded);
        });
    });      

    /* DELETE DB */
    app.get('/db/delete', function(req, res) {
    	db.clearDB(function(done){
            console.log('DB is deleted');
            res.send(done);
    
        });
    });     

    /* ******************************************** */
    /*  ROUTES IN WHICH YOUR APPLICATION REQUIRES   */
    /* ******************************************** */

    /* Middleware */
   /* app.use(function(req, res, next) {
    });*/

    /**
     * ROUND-TRIP SEARCH REST ENDPOINT
     * @param origin - Flight Origin Location
     * @param destination - Flight Destination Location
     * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
     * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
     * @param class - economy or business only
     * @returns {Array}
     */        
    app.get('/api/flights/search/:origin/:destination/:departingDate/returningDate/:class', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
        // return this exact format
        res = flights.getRoundTripFlightFromDB(cb, ":origin", ":destination", ":departingDate", ":returningDate", ":class");
/*
        return 
        {
          outgoingFlights: 
            [{
                "flightNumber"      : "SE2804",
                "aircraftType"      : "Boeing",
                "aircraftModel"     : "747",
                "departureDateTime" : 1460478300000,
                "arrivalDateTime"   : 1460478300000,
                "origin"            : "JFK",
                "destination"       : "CAI",
                "cost"              : "750",
                "currency"          : "USD",
                "class"             : "economy",
                "Airline"           : "United"
            },
            {
                        // more flights
            }],
          returnFlights:
            [{
                "flightNumber"      : "SE2805",
                "aircraftType"      : "Boeing",
                "aircraftModel"     : "747",
                "departureDateTime" : 1460478300000,
                "arrivalDateTime"   : 1460478300000,
                "origin"            : "CAI",
                "destination"       : "JFK",
                "cost"              : "845",
                "currency"          : "USD",
                "class"             : "economy",
                "Airline"           : "United"
            }]
        };*/
    });  

    /**
     * ONE-WAY SEARCH REST ENDPOINT 
     * @param origin - Flight Origin Location
     * @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
     * @param class - economy or business only
     * @returns {Array}
     */    
    app.get('/api/flights/search/:origin/:departingDate/:class', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
        // return this exact format
        res = flights.getOneWayFlightFromDB(cb, ":origin", ":destination", ":departingDate", ":class");
       /* return 
        {
          outgoingFlights: 
            [{
                "flightNumber"      : "SE2804",
                "aircraftType"      : "Airbus",
                "aircraftModel"     : "A320",
                "departureDateTime" : 1460478300000,
                "arrivalDateTime"   : 1460478300000,
                "origin"            : "JFK",
                "destination"       : "CAI",
                "cost"              : "1567",
                "currency"          : "USD",
                "class"             : "economy",
                "Airline"           : "United"
            }]
        };*/
    });

    /* STRIPE REST ENDPOINT -> NEXT SPRINT */
