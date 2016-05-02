IonicApp.factory('FlightSrv',function($http){
	return {
		// returns all the flights in the json file
		getInFlights : function(cb){
			var myUrl = this.destination;
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.origin);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.arrivalDate);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.flightClass);
			myUrl = myUrl.concat('/1');
			var pingOthers = this.otherAirlines;
			this.getToken(function(token){
				myUrl = myUrl.concat('?wt=');
				myUrl = myUrl.concat(token);
				if (!pingOthers)
					$http.get('http://54.93.36.94/api/flights/search/'.concat(myUrl)).success(function(flights)
				 		{
				 			cb(flights.outgoingFlights);
				 		});
				else
					$http.get('http://54.93.36.94/api/flights/searchAll/'.concat(myUrl)).success(function(flights)
				 		{
				 			cb(flights.outgoingFlights);
				 		});
			});
		},
		getOutFlights : function(cb){
			var myUrl = this.origin;
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.destination);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.departureDate);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.flightClass);
			myUrl = myUrl.concat('/1');
			var pingOthers = this.otherAirlines;
			this.getToken(function(token){
				myUrl = myUrl.concat('?wt=');
				myUrl = myUrl.concat(token);
				if (!pingOthers)
				 	$http.get('http://54.93.36.94/api/flights/search/'.concat(myUrl)).success(function(flights)
				 		{
				 			cb(flights.outgoingFlights);
				 		});
				else
					$http.get('http://54.93.36.94/api/flights/searchAll/'.concat(myUrl)).success(function(flights)
				 		{
				 			cb(flights.outgoingFlights);
				 		});
			});
		},
		getToken : function(callback)
		{
			$http.get('http://54.93.36.94/api/data/generatingToken').success(function(result)
				{
					callback(result.token);	
				});
		},
		createPayment : function(bookingData,cb){
			this.getToken(function(token){
				var myUrl = 'http://54.93.36.94/booking';
				myUrl = myUrl.concat('?wt=');
				myUrl = myUrl.concat(token);
				$http.post(myUrl, bookingData).success(function(data)
					{
						cb(data);
					});
			});
			//return $http.post('/booking', bookingData);
		},
		// returns all airports in the json file
		getAirports : function(){
			return $http.get('http://54.93.36.94/api/data/airports');
		},
		// returns all bookings in the json file
		getBookings : function(){
			var myUrl='http://54.93.36.94/api/bookings/search/';
			myUrl = myUrl.concat(this.RefNo);
			return $http.get(myUrl);
		},
		// returns all aircrafts in the json file
		getAircrafts : function(){
			return $http.get('http://54.93.36.94/api/data/aircrafts');
		},
		// saves the number adults the flight is being booked for
		/*setNumberOfAdults : function(value){
			this.noOfAdults = value;
		},
		// returns the number of adults the flight is being booked for
		getNumberOfAdults : function(){
			return this.noOfAdults;
		},
		// saves the number of children the flight is being booked for
		setNumberOfChildren : function(value){
			this.noOfChildren = value;
		},
		// returns the number of children the flight is being booked for
		getNumberOfChildren : function(){
			return this.noOfChildren;
		},*/
		// sets the first departure date
		setDepartureDate : function(value){
			this.departureDate = value;
		},
		// returns the first departure date
		getDepartureDate : function(){
			return this.departureDate;
		},
		// sets the first arrival date
		setArrivalDate : function(value){
			this.arrivalDate = value;
		},
		// returns the first arrival date
		getArrivalDate : function(){
			return this.arrivalDate;
		},
		// a boolean variable that indicates if the flight being booked is a round trip flight or a one-way flight
		// if true, then the flight booked is one-way, else the flight booked is roundtrip
		setType : function(value){
			this.type = value;
		},
		// returns the boolean that indicates if the flight is round trip
		getType : function(){
			return this.type;
		},
		// saves the departure flight
		setOutgoingFlight : function(value){
			this.outgoingFlight = value;
		},
		// returns the passenger's departure flight
		getOutgoingFlight : function(){
			return this.outgoingFlight;
		},
		// saves the arriving flight
		setIngoingFlight : function(value){
			this.ingoingFlight = value;
		},
		// returns the passenger's arriving flight
		getIngoingFlight : function(){
			return this.ingoingFlight;
		},
		// saves the passenger's origin
		setOriginAirport : function(value){
			this.origin = value;
		},
		setClass : function(value){
			this.flightClass = value;
		},
		getClass : function(){
			return this.flightClass;
		},
		// returns the passenger's origin
		getOriginAirport : function(){
			return this.origin;
		},
		// saves the passenger's destination
		setDestinationAirport : function(value){
			this.destination = value;
		},
		// returns the passenger's destination
		getDestinationAirport : function(){
			return this.destination;
		},
		setPriceOutgoingFlight : function(value){
			this.priceOutgoing = value;
		},
		getPriceOutgoingFlight : function(){
			return this.priceOutgoing;
		},
		setPriceIngoingFlight : function(value){
			this.priceIngoing = value;
		},
		getPriceIngoingFlight : function(){
			return this.priceIngoing;
		},
		setOutgoingFlightDuration : function(value){
			this.outgoingFlightDuration = value;
		},
		getOutgoingFlightDuration : function(){
			return this.outgoingFlightDuration;
		},
		setIngoingFlightDuration : function(value){
			this.ingoingFlightDuration = value;
		},
		getIngoingFlightDuration : function(){
			return this.ingoingFlightDuration;
		},
		setOutgoingFlightClass : function(value){
			this.outgoingFlightClass = value;
		},
		getOutgoingFlightClass : function(){
			return this.outgoingFlightClass;
		},
		setIngoingFlightClass : function(value){
			this.ingoingFlightClass = value;
		},
		getIngoingFlightClass : function(){
			return this.ingoingFlightClass;
		},
		setRefNo : function(value){
			this.RefNo = value;
		},
		getRefNo : function(){
			return this.RefNo;
		},
		setOutRefNo : function(value){
			this.outRefNo = value;
		},
		getOutRefNo : function(){
			return this.outRefNo;
		},
		setInRefNo : function(value){
			this.inRefNo = value;
		},
		getInRefNo : function(){
			return this.inRefNo;
		},
		setOtherAirlines: function(value)
		{
			this.otherAirlines = value;
		},
		getOtherAirlines: function()
		{
			return this.otherAirlines;
		},
		setFlight: function(value)
		{
			this.flight = value;
		},
		getFlight: function()
		{
			return this.flight;
		}

	};
});