/*var Database = require("./db.js");
exports.getOneWayFlightFromDB(cb,origin,destination,departingDate,myClass)
{
	Database.db().collection("flights").find().toArray(function(err,flightsArray)
    {
    	if (err)
    	{
    		cb(err,flightsArray);
    	}
    	var myFlight = flightsArray[0];
    	if (myFlight.available_seats.seats_a > 0)
    		console.log('success');
    	else
    		console.log('failure');
    	cb(err,flightsArray);

    });
}*/
var flights  = require('../flights.json');
var airports = require('../airports.json');
var myDB = require('./db.js');
exports.getAirportsFromJSON = function()
{
	return airports;
};

exports.getFlightsFromJSON = function(){
	return flights;
};

exports.seedDB = function(cb){

	//checking airports collection
	myDB.db().collection("airports").count(function(err,airportCount)
	{
		if(airportCount > 0)//airports have been seeded
			cb(err,false);
		else
		{
			//seeding airports
			myDB.db().collection("airports").insert(airports);

			//checking flights collection
			myDB.db().collection("flights").count(function(err,flightCount)
			{
				if(flightCount > 0)//flights have been seeded
					cb(err,false);
				else
				{
					//seeding flights collection
					myDB.db().collection("flights").insert(flights);
					cb(err,true);
				}
			});
		}
	});
};
var myFlight = {
	  "flight_no": "SE28099",
	  "aircraft_model": "Airbus a318",
	  "origin": "IAD",
	  "destination": "JFK",
	    "capacity": "100",
	    "date": "2016-04-23T18:25:43.511Z",
	    "duration": 120,
	    "available_seats" : {
	    "seats_a" : 20,
	    "seats_b" : 32,
	    "seats_c" : 38 
	    },
	    "seatmap":  [{
	        "seat_no" : "A23", 
	              "class" : "A", 
	              "reservation_id" : "VIW23Jfwq8vi3x0ef9",
	              "cost" : 321,
	              "window" : true,
	              "cabin_no": "3"
	              }],
	     "price1"  :1000,
	     "price2"   :100,
	     "price3"   :80

	};
	var myClass = 'economy';
	var flightsArray = [];
	var result = {};
	result.flightNumber = myFlight.flight_no;
	//result.aircraftType = ;
	//result.aircraftModel = ;
	//result.departureDateTime = ;
	//result.arrivalDateTime = ;
	result.origin = myFlight.origin;
	result.destination = myFlight.destination;
	result.currency = "USD";
	//flightsArray[0]=myFlight;
	if (myClass === 'economy')
	{
		if (myFlight.available_seats.seats_a > 0)
		{
			result.cost = myFlight.price2;
			result.class = "economy";
			result.Airline = "Hawaiian";
    		flightsArray[0]=result;
		}
    	
    }
    console.log(flightsArray);