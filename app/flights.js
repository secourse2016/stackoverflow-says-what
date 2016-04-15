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

function seedDB(cb){

	//checking airports collection
	myDB.db().collection("airports").count(function(err,airportCount)
	{
		if(airportCount > 0)//airports have been seeded
			cb(null,false);
		else
		{
			//seeding airports
			myDB.db().collection("airports").insertMany(airports);

			//checking flights collection
			myDB.db().collection("flights").count(function(err,flightCount)
			{
				if(flightCount > 0)//flights have been seeded
					cb(err,false);
				else
				{
					//seeding flights collection
					myDB.db().collection("flights").insertMany(flights);
					cb(err,true);
				}
			});
		}
	});
};
function getOneWayFlightFromDB(cb,origin,destination,departingDate,myClass)
{
	result = {};
	result.outgoingFlights = [];
	myDB.db().collection("flights").find({"origin": origin, "destination": destination, "date": departingDate}).toArray(function(err,flightsArray)
    {
    	if (err || flightsArray.length<1)
    	{
    		cb(err,result);
    	}
    	else
    	{
	    	var myFlight = flightsArray[0];
	    	var schemaFlight = {};
	    	schemaFlight.flightNumber = myFlight.flight_no;
	    	schemaFlight.aircraftType = myFlight.aircraft_type;
	    	schemaFlight.aircraftModel = myFlight.aircraft_model;
	    	schemaFlight.departureDateTime = myFlight.date;
	    	schemaFlight.arrivalDateTime = myFlight.arrival_date;
	    	schemaFlight.origin = origin;
	    	schemaFlight.destination = destination;
	    	schemaFlight.class = myClass;
	    	schemaFlight.Airline = "Hawaiian";
	    	schemaFlight.currency = "USD";
	    	if(myClass == "economy" && myFlight.available_seats.seats_b > 0)
	    	{
	    		schemaFlight.cost = myFlight.price2;
	    		result.outgoingFlights[0]=schemaFlight;
	    		cb(err,result);
	    		console.log('success');
	    	}
	    	else if (myClass == "business" && myFlight.available_seats.seats_a > 0)
	    	{
	    		schemaFlight.cost = myFlight.price1;
	    		result.outgoingFlights[0]=schemaFlight;
	    		cb(err,result);
	    		console.log('success');
	    	}
	    	else
	    	{
	    		cb(err,result);
	    		console.log('failure');
	    	}
	    	
    	}
    });
};
exports.seedDB=seedDB;
exports.getOneWayFlightFromDB = getOneWayFlightFromDB;

exports.getRoundTripFlightFromDB = function(cb, origin, destination, departingDate, returningDate, myClass)
{
	var res = {};
	res.outgoingFlights = getOneWayFlightFromDB(cb, origin, destination, departingDate, myClass);
	res.returningFlights = getOneWayFlightFromDB(cb, destination, origin, returningDate,  myClass);
	cb(err, res);
};
/*    myDB.connect(function(err,db)
    {
   		seedDB(function(err2,seeded)
    	{
    		console.log(err2);
    		console.log(seeded);
        });
    });*/

/* myDB.connect(function(err,db)
    {
   		getOneWayFlightFromDB(function(err2,seeded)
    	{
    		console.log(err2);
    		console.log(seeded);
        },"BOM","DEL","2016-04-12T18:25:43.511Z",'business');
    });*/
/*    myDB.connect(function(err,db)
    {
   		myDB.clearDB(function(){
    	console.log("Databaseis clear");
    	});
    });*/
    
