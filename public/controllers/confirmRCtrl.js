App.controller('confirmRCtrl', function($scope, flightSrv, $location){
	// flightSrv.setOriginAirport('IAD');
	// flightSrv.setDestinationAirport('batee5');
	// flightSrv.setOutgoingFlight({flight_no: 44444, capacity: 200,date:"2016-04-26T18:25:43.511Z"});
	// flightSrv.setDepartureDate(flightSrv.getOutgoingFlight().date);
	$scope.originAirport = flightSrv.getOriginAirport();
	$scope.destinationAirport = flightSrv.getDestinationAirport();
	$scope.depDate = flightSrv.getDepartureDate();
	$scope.arrivalDate = flightSrv.getArrivalDate();
	$scope.depPrice = flightSrv.getPriceOutgoingFlight();
	$scope.arrivalPrice = flightSrv.getPriceIngoingFlight();
	$scope.depFlightNo = flightSrv.getOutgoingFlight().flightNumber;
	$scope.arrivalFlightNo = flightSrv.getIngoingFlight().flightNumber;
	$scope.depDuration = flightSrv.getOutgoingFlight().duration;
	$scope.arrivalDuration = flightSrv.getIngoingFlight().duration;
	$scope.depClass = flightSrv.getClass();
	$scope.arrivalClass = flightSrv.getClass();
	$scope.outAirline = flightSrv.getOutgoingFlight().Airline;
	$scope.inAirline = flightSrv.getIngoingFlight().Airline;

	$scope.updateR = function() {
    $location.url('/outGoingFlights');
  };


	$scope.confirmR = function() {
    $location.url('/payment');
  };

});