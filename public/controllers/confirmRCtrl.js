App.controller('confirmRCtrl', function($scope, flightSrv){
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
	$scope.depFlightNo = flightSrv.getOutgoingFlight().flight_no;
	$scope.arrivalFlightNo = flightSrv.getPriceIngoingFlight.flight_no;
	$scope.depDuration = flightSrv.getOutgoingFlightDuration();
	$scope.arrivalDuration = flightSrv.getIngoingFlightDuration();
	$scope.depClass = flightSrv.getOutgoingFlightClass();
	$scope.arrivalClass = flightSrv.getIngoingFlightClass();
});