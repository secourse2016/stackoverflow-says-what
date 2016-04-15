App.controller('flightBookingCtrl', function($scope, flightSrv, $location) {

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  function AirportCodes() {
    flightSrv.getAirports().success(function(airports) {
         $scope.Airports = airports;
     });
  };
  $scope.setOrigin = function(originAirport)
  {
    $scope.selectedOrigin = originAirport;
  };
  $scope.setDestination = function(destinationAirport)
  {
    $scope.selectedDestination = destinationAirport;
  };
  $scope.searchOneWay = function() {
    flightSrv.setType('OneWay');
    flightSrv.setOriginAirport($scope.selectedOrigin);
    flightSrv.setDestinationAirport($scope.selectedDestination);
    flightSrv.setDepartureDate($scope.dtOneway);
    $location.url('/outGoingFlights');
  };
  $scope.searchRoundTrip = function() {
    flightSrv.setType('Round');
    flightSrv.setOriginAirport($scope.selectedOrigin);
    flightSrv.setDestinationAirport($scope.selectedDestination);
    flightSrv.setDepartureDate($scope.dtRound);
    flightSrv.setArrivalDate($scope.atRound);
    $location.url('/outGoingFlights');
  };
  
  AirportCodes();
});