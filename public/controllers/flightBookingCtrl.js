App.controller('flightBookingCtrl', function($scope, flightSrv, $location) {

  
  /*$scope.flight = {
    origin      : flightSrv.getSelectedOriginAirport(),
    destination : flightSrv.getSelectedDestinationAirport()
  };*/
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
  $scope.searchOneWay = function() {
    flightSrv.setType('OneWay');
    flightSrv.setOrigin($scope.selectedOriginOneway);
    flightSrv.setDestination($scope.selectedDestinationOneway);
    flightSrv.setDepartureDate($scope.dtOneway);
    $location.url('/outGoingFlights');
  };
  $scope.searchRoundTrip = function() {
    flightSrv.setType('Round');
    flightSrv.setOrigin($scope.selectedOriginRound);
    flightSrv.setDestination($scope.selectedDestinationRound);
    flightSrv.setDepartureDate($scope.dtRound);
    flightSrv.setArrivalDate($scope.atRound);
    $location.url('/outGoingFlights');
  };
  
  AirportCodes();
});