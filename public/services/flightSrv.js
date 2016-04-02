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
		setFirstDepartureDate : function(value){
			this.firstDepartureDate = value;
		},
		// returns the first departure date
		getFirstDepartureDate : function(){
			return this.firstDepartureDate;
		},
		// saves the second departure date assuming a round trip may be being booked
		setSecondDepartureDate : function(value){
			this.secondDepartureDate = value;
		},
		// returns the second departure date
		getSecondDepartureDate : function(){
			return this.secondDepartureDate;
		},
		// sets the first arrival date
		setFirstArrivalDate : function(value){
			this.firstArrivalDate = value;
		},
		// returns the first arrival date
		getFirstArrivalDate : function(){
			return this.firstArrivalDate;
		},
		// saves the second arrival date assuming a round trip may be being booked
		setSecondArrivalDate : function(value){
			this.secondArrivalDate = value;
		},
		// returns the second arrival time
		getSecondArrivalDate : function(){
			return this.secondArrivalDate;
		},
		// a boolean variable that indicates if the flight being booked is a round trip flight
		setRoundTrip : function(value){
			this.roundTrip = value;
		},
		// returns the boolean that indicates if the flight is round trip
		getRoundTrip : function(){
			return this.roundTrip;
		},
		// a boolean variable that indicates if the flight being booked is a one way flight
		setOneWay : function(value){
			this.oneWay = value;
		},
		// returns the boolean that indicates if the flight is one way
		getOneWay : function(){
			return this.oneWay;
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