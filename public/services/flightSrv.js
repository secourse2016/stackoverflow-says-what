App.factory('flightSrv',function($http){
	return {
		// returns all the flights in the json file
		getInFlights : function(){
			var myUrl='/api/flights/search/';
			myUrl = myUrl.concat(this.destination);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.origin);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat('2016-04-13T18:25:43.511Z');
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.flightClass);
			return $http.get(myUrl);
		},
		getOutFlights : function(){
			var myUrl='/api/flights/search/';
			myUrl = myUrl.concat(this.origin);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.destination);
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat('2016-04-12T18:25:43.511Z');
			myUrl = myUrl.concat('/');
			myUrl = myUrl.concat(this.flightClass);
			return $http.get(myUrl);
		},
		createPayment : function(bookingData){
			return $http.post('/api/pay', bookingData);
		},
		// returns all airports in the json file
		getAirports : function(){
			return $http.get('/api/data/airports');
		},
		// returns all bookings in the json file
		getBookings : function(){
			return $http.get('/api/data/bookings');
		},
		// returns all aircrafts in the json file
		getAircrafts : function(){
			return $http.get('/api/data/aircrafts');
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
			// return value;
			// return this.origin;
			// return 'JFK';
		},
		// saves the passenger's destination
		setDestinationAirport : function(value){
			this.destination = value;
		},
		// returns the passenger's destination
		getDestinationAirport : function(){
			return this.destination;
			// return 'IAD';
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
		}
	};
});