var flights  = require('./flights.json');
var airports = require('./airports.json');
var myDB = require('./db.js');

exports.getAirportsFromJSON = function(){
	return airport;
};

exports.getFlightsFromJSON = function(){
	return flights;
};

exports.seedFlights = function(cb){

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