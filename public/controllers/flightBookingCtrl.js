App.controller('flightBookingCtrl', function($scope, flightSrv, $location) {

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
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

  $scope.originAlert =false;
  $scope.destAlert =false;
  $scope.departureAlert =false;
  $scope.arrivalAlert =false;
  $scope.classAlert =false;


  $scope.setOrigin = function(originAirport)
  {
    $scope.selectedOrigin = originAirport;
  };
  $scope.setDestination = function(destinationAirport)
  {
    $scope.selectedDestination = destinationAirport;
  };
  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };
  $scope.setClass = function(flightClass)
  {
    $scope.selectedClass = flightClass;
    flightSrv.setClass(flightClass);
  };

  $scope.searchOneWay = function() {
     /*alert("Name must be filled out");*/
    if ($scope.selectedOrigin == null || $scope.selectedOriginOneway == "")
        $scope.originAlert =true;      

    if($scope.selectedDestination == null || $scope.selectedDestination == "")
      $scope.destAlert =true;

    if($scope.dtOneway == null || $scope.dtOneway == "")
      $scope.departureAlert =true;

    if($scope.selectedClass == null || $scope.selectedClass == "")
      $scope.classAlert =true;
    else
    {
    flightSrv.setType('OneWay');
    flightSrv.setOriginAirport($scope.selectedOrigin);
    flightSrv.setDestinationAirport($scope.selectedDestination);
    flightSrv.setDepartureDate($scope.dtOneway);
    flightSrv.setClass($scope.selectedClass);
    $location.url('/outGoingFlights');
  }
  };

  $scope.searchRoundTrip = function() {
    if ($scope.selectedOrigin == null || $scope.selectedOriginOneway == "")
        $scope.originAlert =true;      

    if($scope.selectedDestination == null || $scope.selectedDestination == "")
      $scope.destAlert =true;

    if($scope.dtRound ==null || $scope.dtRound =="")
      $scope.departureAlert =true;

    if($scope.atRound == null || $scope.atRound == "")
      $scope.arrivalAlert =true;

    if($scope.selectedClass == null || $scope.selectedClass == "")
      $scope.classAlert =true;
    else{
    flightSrv.setType('Round');
    flightSrv.setOriginAirport($scope.selectedOrigin);
    flightSrv.setDestinationAirport($scope.selectedDestination);
    flightSrv.setDepartureDate($scope.dtRound);
    flightSrv.setArrivalDate($scope.atRound);
    flightSrv.setClass($scope.selectedClass);
    $location.url('/outGoingFlights');
   }
  };
$scope.validateForm =function() {
    
    
}
  AirportCodes();
});