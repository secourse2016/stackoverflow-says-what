//var flights  = require('./flights.json');
var airports = require('./airports.json');
var myDB = require('./db.js');
var flight = {
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

//var Database = require("./db.js");
exports.getOneWayFlightFromDB = function (cb,origin,destination,departingDate,myClass)
{
	myDB.db().collection("flights").find({"origin": origin, "destination": destination, "date": departingDate, "class":myClass}).toArray(function(err,flightsArray)
	{
    	if (!err)
    	{
    		var res = {};
    		if(myClass == "economy" && flightsArray.available_seats.seats_a > 0){
    		res.insert({"flightNumber": flightsArray.flight_no, "aircraftType": flightsArray.aircraft_type,
    					"aircraftModel": flightsArray.aircraft_model, "departureDateTime": flightsArray.date,
    					"arrivalDateTime": flightsArray.arrival_date, "origin": flightsArray.origin, 
    					"destination": flightsArray.destination, "cost": flightsArray.price1, "currency": "USD",
    					"class": "economy", "Airline":"Hawaiian"});
    	}
    	else if (myClass == "business" && flightsArray.available_seats.seats_b > 0){
    		res.insert({"flightNumber": flightsArray.flight_no, "aircraftType": flightsArray.aircraft_type,
    					"aircraftModel": flightsArray.aircraft_model, "departureDateTime": flightsArray.date,
    					"arrivalDateTime": flightsArray.arrival_date, "origin": flightsArray.origin, 
    					"destination": flightsArray.destination, "cost": flightsArray.price2, "currency": "USD",
    					"class": "business", "Airline":"Hawaiian"});
    	}
    		//cb(err,flightsArray);
    		//console.log(flightsArray);
    		cb(err,res);
    		console.log(res);
    	}
    	//var myFlight = flightsArray[0];
    	/*if (myFlight.available_seats.seats_a > 0)
    		console.log('success');
    	else
    		console.log('failure');*/
    	//cb(err,flightsArray);

    });
};

exports.getRoundTripFlightFromDB = function(cb, origin, destination, departingDate, returningDate, myClass)
{
	return {
		outgoingFlights: getOneWayFlightFromDB(cb, origin, destination, departingDate, myClass),
		returningFlights: getOneWayFlightFromDB(cb, destination, origin, returningDate,  myClass)
	};
};
/*var myFlight = {
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
    console.log(flightsArray);*/