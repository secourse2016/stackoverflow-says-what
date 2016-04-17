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


getOneWayFlightFromDB =function(cb,origin,destination,departingDate,myClass)
{
	var moment = require('moment');
	result = {};
	var lowerLimit = moment(departingDate,['x','YYYY-MM-DD']).format('YYYY-MM-DDTHH:mm:ss');
	var x = moment(lowerLimit).add(1,'day');
	var upperLimit = moment(x).format('YYYY-MM-DDTHH:mm:ss');
	result.outgoingFlights = [];
	myDB.db().collection("flights").find({"origin": origin, "destination": destination, "date": { "$lt" : upperLimit , 
                                "$gt" : lowerLimit}}).toArray(function(err,flightsArray)
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
	    		console.log(myClass);
	    		console.log('failure');
	    	}
	    	
    	}
    });
};

exports.getRoundTripFlightFromDB = function(cb, origin, destination, departingDate, returningDate, myClass)
{
	var res = {};

	getOneWayFlightFromDB(function(err2, res2){
		res.outgoingFlights =  res2.outgoingFlights;
		getOneWayFlightFromDB(function(err3, res3){
			res.returningFlights = res3.outgoingFlights;
			cb(null, res);
		}, destination, origin, returningDate,  myClass);
	}, origin, destination, departingDate, myClass);

	
	
};

// to be continued
exports.bookOneWay = function(flightNo, class, bookingData, cb){
	var result = {};
	myDB.db().collection('flights').find({flight_no: flightNo}).toArray(function(err, flightsArray){
		if(err || flightsArray.length < 1)
			cb(err, result);
			console.log('No matching flights');
		else{
			var flight = flightsArray[0];
			for (var i = flight.seat_map.length - 1; i >= 0; i--) {
				if(flight.seat_map[i].reservation_id == ""){
					var seatNo = flight.seat_map[i].seat_no;
					var resvID = flightNo.concat(seatNo);
					var receiptNo;
					myDB.db().collection('bookings').count(function(err, No){
						if(err){
							result = {};
							cb(err, result);
							console.log('err');
						}
						else{
							receiptNo = No + 1;
							var booking = {firstName: bookingData.firstName, 
								lastName: bookingData.lastName, 
								passport_no: bookingData.passport_no, 
								email: bookingData.email, seat_no: seatNo, 
								issue_date: bookingData.issueDate, 
								expiray_date: bookingData.expirayDate, 
								receipt_no: receiptNo, 
								flight_no: flightNo
							};
							myDB.db().collection('bookings').insert(booking, function(err, res){
								if(err){
									result = {};
									cb(err, result);
									console.log('err');
								}else{
									myDB.db().collection('flights').update({flight_no: flightNo, "seat_map.seat_no": seatNo }, {seat_map.$.reservation_id: resvID}, function(err, noUpdated){
										if(err){
											result = {};
											cb(err, result);
										}else{
											result = booking;
											cb(null, result);
											console.log('successfully booked');
										}
									});
								}
							});
						}
					});
				}
			}
		}

	});
};

exports.bookRoundTrip = function(depFlightNo, returnFlightNo, classDep, classReturn, bookingData, cb){
	var result = {};
	bookOneWay(depFlightNo, classDep, bookingData, function(err, depBook){
		result.depBooking = depBook;
		bookOneWay(returnFlightNo, classReturn, bookingData, function(err, returnBook){
			result.returnBooking = returnBook;
			cb(null, result);
		});
	});
};

exports.getOneWayFlightFromDB = getOneWayFlightFromDB;
/*var moment = require('moment');
console.log(moment("2016-04-19").toDate().getTime());*/

   /*myDB.connect(function(err,db)
    {
   		seedDB(function(err2,seeded)
	    	{
    		console.log(err2);
    		console.log(seeded);
        });
    });*/

/* myDB.connect(function(err,db)
    {
   		getRoundTripFlightFromDB(function(err2,result)
    	{
    		console.log('hello');
    		console.log(result);
        },"BOM","DEL","2016-04-12T18:25:43.511Z","2016-04-12T18:25:43.511Z",'business');
    });*/
/*    myDB.connect(function(err,db)
    {
   		myDB.clearDB(function(){
    	console.log("Databaseis clear");
    	});
    });*/
    
