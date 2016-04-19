App.controller('confirmOCtrl', function($scope, flightSrv, $location){
	// flightSrv.setOriginAirport('IAD');
	// flightSrv.setDestinationAirport('batee5');
	// flightSrv.setOutgoingFlight({flight_no: 44444, capacity: 200,date:"2016-04-26T18:25:43.511Z"});
	// flightSrv.setDepartureDate(flightSrv.getOutgoingFlight().date);
	// console.log(flightSrv.origin);
	// flightSrv.setDestinationAirport('IAD');
	$scope.originAirport = flightSrv.getOriginAirport();
	$scope.destinationAirport = flightSrv.getDestinationAirport();
	$scope.depDate = flightSrv.getDepartureDate();
	$scope.price = flightSrv.getPriceOutgoingFlight();
	$scope.flightNo = flightSrv.getOutgoingFlight().flightNumber;
	$scope.duration = flightSrv.getOutgoingFlight().duration;
	$scope.airline = flightSrv.getOutgoingFlight().Airline;
	$scope.class = flightSrv.getClass();
	// $scope.originAirport = 'JFK';
	// $scope.destinationAirport = 'IAD';
	// $scope.depDate = "2016-04-26T18:25:43.511Z";
	// $scope.price = 130;
	// $scope.flightNo = "SE2805";
	// $scope.duration = 120;
	// $scope.class = "A";

	$scope.updateO = function() {
    $location.url('/outGoingFlights');
  };

  
	$scope.confirmO = function() {
    $location.url('/payment');
  };

});