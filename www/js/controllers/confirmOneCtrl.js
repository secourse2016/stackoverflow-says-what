IonicApp.controller('confirmOneCtrl', function($scope,$state, FlightSrv, $location){

	if(FlightSrv.getOriginAirport() !== 'undefined'){
		$scope.originAirport = FlightSrv.getOriginAirport();
	}	
	if(FlightSrv.getDestinationAirport() !== 'undefined'){
		$scope.destinationAirport = FlightSrv.getDestinationAirport();
	}
	if(FlightSrv.getDepartureDate() !== 'undefined'){
		$scope.depDate = FlightSrv.getDepartureDate();		
	}
	if(FlightSrv.getPriceOutgoingFlight() !== 'undefined'){
		$scope.price = FlightSrv.getPriceOutgoingFlight();		
	}
	//console.log('printing the flight   '+ FlightSrv.getOutgoingFlight());
	if(typeof FlightSrv.getOutgoingFlight() !== 'undefined'){
		$scope.flightNo = FlightSrv.getOutgoingFlight().flightNumber;
	}
	if(typeof FlightSrv.getOutgoingFlight() !== 'undefined'){
		$scope.duration = FlightSrv.getOutgoingFlight().duration;
	}
	if(typeof FlightSrv.getOutgoingFlight() !== 'undefined'){
		$scope.airline = FlightSrv.getOutgoingFlight().Airline;
	}
	if(typeof FlightSrv.getClass() !== 'undefined'){
		$scope.class = FlightSrv.getClass();
	}

	$scope.updateO = function() {
    	$location.url('/outGoingFlights');
    };

  
	$scope.confirmOne = function() {
		// console.log('hiiiiiiiiiii');
		$state.go('app.paymentInfo');
	};

});