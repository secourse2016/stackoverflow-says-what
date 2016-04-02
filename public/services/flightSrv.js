App.factory('flightSrv',function($http){
	return {
		// returns all the flights in the json file
		getFlights : function(){
			return $http.get('/api/data/flights');
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
		setNumberOfAdults : function(value){
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
		},
		// saves an array of adult details as will be provided in the html page
		// i.e. full name, age , nationality etc refernce number to be added after payment
		setAdultDetails : function(value){
			this.arrayOfAdults.push(value);
		},
		// returns the array of adults
		getAdultDetails : function(){
			return this.arrayOfAdults;
		},
		// saves an array of children details as for the adults
		setChildrenDetails : function(value){
			this.arrayOfChildren.push(value);
		},
		// returns the array of children
		getChildrenDetails : function(){
			return this.arrayOfChildren;
		},
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
		// a boolean variable that indicates if the flight being booked is a round trip flight
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
		setOrigin : function(value){
			this.origin = value;
		},
		// returns the passenger's origin
		getOrigin : function(){
			return this.origin;
		},
		// saves the passenger's destination
		setDestination : function(value){
			this.destination = value;
		},
		// returns the passenger's destination
		getDestination : function(){
			return this.destination;
		}
	};
});