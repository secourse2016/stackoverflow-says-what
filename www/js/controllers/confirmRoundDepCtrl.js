IonicApp.controller('confirmRoundDepCtrl', function($scope, $state, FlightSrv){

	if(typeof FlightSrv.getOriginAirport() !== 'undefined'){
		$scope.originAirport = FlightSrv.getOriginAirport();
	}
	if(typeof FlightSrv.getDestinationAirport() !== 'undefined'){
		$scope.destinationAirport = FlightSrv.getDestinationAirport();
	}
	if(typeof FlightSrv.getDepartureDate() !== 'undefined'){
		$scope.depDate = FlightSrv.getDepartureDate();
	}
	if(typeof FlightSrv.getArrivalDate() !== 'undefined'){
		$scope.arrivalDate = FlightSrv.getArrivalDate();
	}
	if(typeof FlightSrv.getPriceOutgoingFlight() !== 'undefined'){
		$scope.depPrice = FlightSrv.getPriceOutgoingFlight();
	}
	if(typeof FlightSrv.getPriceIngoingFlight() !== 'undefined'){
		$scope.arrivalPrice = FlightSrv.getPriceIngoingFlight();
	}
	if(typeof FlightSrv.getOutgoingFlight() !== 'undefined'){
		$scope.depFlightNo = FlightSrv.getOutgoingFlight().flightNumber;
	}
	if(typeof FlightSrv.getIngoingFlight() !== 'undefined'){
		$scope.arrivalFlightNo = FlightSrv.getIngoingFlight().flightNumber;
	}
	if(typeof FlightSrv.getOutgoingFlight() !== 'undefined'){
		$scope.depDuration = FlightSrv.getOutgoingFlight().duration;
	}
	if(typeof FlightSrv.getIngoingFlight() !== 'undefined'){
		$scope.arrivalDuration = FlightSrv.getIngoingFlight().duration;
	}
	if(typeof FlightSrv.getClass() !== 'undefined'){
		$scope.depClass = FlightSrv.getClass();
	}
	if(typeof FlightSrv.getClass() !== 'undefined'){
		$scope.arrivalClass = FlightSrv.getClass();
	}
	if(typeof FlightSrv.getOutgoingFlight() !== 'undefined'){
		$scope.outAirline = FlightSrv.getOutgoingFlight().Airline;
	}
	if(typeof FlightSrv.getIngoingFlight() !== 'undefined'){
		$scope.inAirline = FlightSrv.getIngoingFlight().Airline;
	}

	$scope.updateR = function() {
	    $location.url('/outGoingFlights');
	};


	$scope.confirmR = function() {
	    $location.url('/payment');
	};

	$scope.goToArrivingFlightDetails = function(){
		$state.go('app.confirmRoundArr');
	};

});