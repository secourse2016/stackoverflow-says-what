App.controller('confirmOCtrl', function($scope, flightSrv){
	$scope.originAirport = flightSrv.getOriginAirport();
	$scope.destinationAirport = flightSrv.getDestinationAirport();
	$scope.depDate = flightSrv.getDepartureDate();
	$scope.price = flightSrv.getPriceOutgoingFlight();
	$scope.flightNo = flightSrv.getOutgoingFlight().flight_no;
	$scope.duration = flightSrv.getOutgoingFlightDuration();
	$scope.class = flightSrv.getOutgoingFlightClass();
	// $scope.originAirport = 'JFK';
	// $scope.destinationAirport = 'IAD';
	// $scope.depDate = "2016-04-26T18:25:43.511Z";
	// $scope.price = 130;
	// $scope.flightNo = "SE2805";
	// $scope.duration = 120;
	// $scope.class = "A";
});