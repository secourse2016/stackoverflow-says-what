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


getOneWayFlightFromDB =function(cb,origin,destination,departingDate,myClass,seats)
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
	    	schemaFlight.flightId = myFlight._id;
	    	schemaFlight.flightNumber = myFlight.flight_no;
	    	schemaFlight.aircraftType = myFlight.aircraft_type;
	    	schemaFlight.aircraftModel = myFlight.aircraft_model;
	    	schemaFlight.departureDateTime = moment(myFlight.date).toDate().getTime();
	    	schemaFlight.arrivalDateTime = moment(myFlight.arrival_date).toDate().getTime();
	    	schemaFlight.origin = origin;
	    	schemaFlight.destination = destination;
	    	schemaFlight.class = myClass;
	    	schemaFlight.Airline = "Hawaiian";
	    	schemaFlight.currency = "USD";
	    	if(myClass == "economy" && myFlight.available_seats.seats_b >= seats)
	    	{
	    		schemaFlight.cost = myFlight.price2;
	    		result.outgoingFlights[0]=schemaFlight;
	    		cb(err,result);
	    		/*console.log('success');*/
	    	}
	    	else if (myClass == "business" && myFlight.available_seats.seats_a >= seats)
	    	{
	    		schemaFlight.cost = myFlight.price1;
	    		result.outgoingFlights[0]=schemaFlight;
	    		cb(err,result);
	    		/*console.log('success');*/
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

exports.getRoundTripFlightFromDB = function(cb, origin, destination, departingDate, returningDate, myClass, seats)
{
	var res = {};

	getOneWayFlightFromDB(function(err2, res2){
		res.outgoingFlights =  res2.outgoingFlights;
		getOneWayFlightFromDB(function(err3, res3){
			res.returningFlights = res3.outgoingFlights;
			cb(null, res);
		}, destination, origin, returningDate,  myClass, seats);
	}, origin, destination, departingDate, myClass, seats);

	
	
};

exports.getBooking = function(cb , refNumber)
{
	var ObjectId = require('mongodb').ObjectID;
	var res = {};
	myDB.db().collection("bookings").find({"_id" : ObjectId(refNumber)}).toArray(function(err,flightsArray){
		console.log('The ref number');
		console.log(flightsArray);
		cb(null, flightsArray[0]);
	});
    

};

// to be continued
exports.bookOneWay = function(bookingData, cb){
	var result = {};
	var ObjectId = require('mongodb').ObjectID;
	console.log('el bookng ya sada');
	console.log(bookingData);
	var booking = {};
	booking.type = 'OneWay';
	booking.class = bookingData.class;
	booking.passengers = [];
	myDB.db().collection('bookings').insert(booking, function(err1, insertedBooking)
	{
		if(err1)
		{
			result = {};
			cb(err, result);
		}
		else
		{
			console.log('insertedBooking');
			console.log(insertedBooking.ops[0]);
			myDB.db().collection('flights').find({"_id": ObjectId(bookingData.outgoingFlightId)}).toArray(function(err2, flightsArray)
			{

				if(err2 || flightsArray.length < 1)
				{			
					cb(err2, result);
					console.log('No matching flights');
				}
				else
				{
					var flight = flightsArray[0];
					var seatMap = flight.seatmap; 
					var passengerNum = bookingData.passengerDetails.length;
					var i=0;
					var availableSeats = flight.available_seats.seats_a;
					booking.outgoingFlightNum = flight.flight_no;
					if (booking.class === 'business')
					{	
						var availableSeats = flight.available_seats.seats_a;
						for (i=0;i<passengerNum;i++)
						{	
							var seatNo = 10 - availableSeats;
							var mySeat = flight.seatmap[seatNo];
							seatMap[seatNo].reservation_id = insertedBooking._id;
							booking.passengers[i]=bookingData.passengerDetails[i];
							booking.passengers[i].outgoingFlightSeat = 'A' + '' + (seatNo+1);
							availableSeats--;
						}
						var decreaseby = passengerNum * -1;
						myDB.db().collection('flights').updateOne({"_id": ObjectId(bookingData.outgoingFlightId)},{$set : {"seatmap": seatMap}, $inc : {"available_seats.seats_a" : decreaseby}} , function(err3, numUpdate)
						{
							if(err3)
							{
								result = {};
								cb(err3, result);
							}
							else
							{
								console.log('before updating passengers');
								console.log(booking.passengers);
								myDB.db().collection('bookings').updateOne({"_id": ObjectId(insertedBooking.ops[0]._id)},{$set : {"passengers": booking.passengers,"outgoingFlightNum": booking.outgoingFlightNum}} , function(err4, updatedBooking)
								{
									if(err4)
									{
										result = {};
										cb(err4, result);
									}
									else
									{
										console.log('updatedBooking');
										console.log(insertedBooking.ops[0]._id);
										cb(null, insertedBooking.ops[0]._id);
									}
								});
							}
						});
					}
					else
					{
						var availableSeats = flight.available_seats.seats_b;
						for (i=0;i<passengerNum;i++)
						{	
							var seatNo = 30 - availableSeats;
							var mySeat = flight.seatmap[seatNo];
							seatMap[seatNo].reservation_id = insertedBooking._id;
							booking.passengers[i]=bookingData.passengerDetails[i];
							booking.passengers[i].outgoingFlightSeat = 'B' + '' + (seatNo-9);
							availableSeats--;
						}
						var decreaseby = passengerNum * -1;
						myDB.db().collection('flights').updateOne({"_id": ObjectId(bookingData.outgoingFlightId)},{$set : {"seatmap": seatMap}, $inc : {"available_seats.seats_b" : decreaseby}} , function(err3, numUpdate)
						{
							if(err3)
							{
								result = {};
								cb(err3, result);
							}
							else
							{
								myDB.db().collection('bookings').updateOne({"_id": ObjectId(insertedBooking.ops[0]._id)},{$set : {"passengers": booking.passengers,"outgoingFlightNum": booking.outgoingFlightNum}} , function(err4, updatedBooking)
								{
									if(err4)
									{
										result = {};
										cb(err4, result);
									}
									else
									{
										cb(null, insertedBooking.ops[0]._id);
									}
								});
							}
						});
					}
				}
			});
		}
	});
};

exports.getOneWayFlightFromDB = getOneWayFlightFromDB;
    
