IonicApp.controller('flightBookingCtrl', function($scope, FlightSrv,$state) {

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  $scope.flightData = {};
  $scope.flightData.selectedOrigin = "";
  $scope.flightData.selectedDestination = "";
  $scope.flightData.dtOneway = "";
  $scope.flightData.selectedClass = "";
  $scope.flightData.otherAirlines = false;
  function AirportCodes() {
    FlightSrv.getAirports().success(function(airports) {
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
    FlightSrv.setClass(flightClass);
  };

  $scope.checkboxModel = false;
  $scope.minDate=Date.now();

  $scope.searchOneWay = function() {
    

    if($scope.flightData.selectedOrigin != null && $scope.flightData.selectedDestination != null
      && $scope.flightData.dtOneway != null && $scope.flightData.selectedClass != null && $scope.flightData.selectedClass != "")
    {
      FlightSrv.setType('OneWay');
      FlightSrv.setOriginAirport($scope.flightData.selectedOrigin);
      FlightSrv.setDestinationAirport($scope.flightData.selectedDestination);
      FlightSrv.setDepartureDate($scope.flightData.dtOneway);
      FlightSrv.setClass($scope.flightData.selectedClass);
      FlightSrv.setOtherAirlines($scope.flightData.otherAirlines);
      $state.go('app.welcomePage');
    }

  };

  $scope.searchRoundTrip = function() {
    
    if($scope.flightData.selectedOrigin != null && $scope.flightData.selectedDestination != null
      && $scope.flightData.dtRound !=null && $scope.flightData.atRound != null && $scope.flightData.selectedClass != null && $scope.flightData.selectedClass != "")
    {
    FlightSrv.setType('Round');
    FlightSrv.setOriginAirport($scope.flightData.selectedOrigin);
    FlightSrv.setDestinationAirport($scope.flightData.selectedDestination);
    FlightSrv.setDepartureDate($scope.flightData.dtRound);
    FlightSrv.setArrivalDate($scope.flightData.atRound);
    FlightSrv.setClass($scope.flightData.selectedClass);
    FlightSrv.setOtherAirlines($scope.flightData.otherAirlines);
    console.log(FlightSrv.getType());
    console.log(FlightSrv.getOriginAirport());
    console.log(FlightSrv.getDestinationAirport());
    console.log(FlightSrv.getDepartureDate());
    console.log(FlightSrv.getArrivalDate());
    console.log(FlightSrv.getClass());
    console.log(FlightSrv.getOtherAirlines());
    $scope.go('outGoingFlights');
   }
  };
$scope.validateForm =function() {
    
    
}

  AirportCodes();
});