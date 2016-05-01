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
  $scope.minDate = Date.now();

  $scope.searchOneWay = function() {
    

    if($scope.flightData.selectedOrigin != null && $scope.flightData.selectedOrigin != ""
      && $scope.flightData.selectedDestination != null && $scope.flightData.selectedDestination != ""
      && $scope.flightData.dtOneway != null && $scope.flightData.dtOneway != ""
      && $scope.flightData.selectedClass != null && $scope.flightData.selectedClass != "")
    {
      console.log('HELOOO');
      FlightSrv.setType('OneWay');
      FlightSrv.setOriginAirport($scope.flightData.selectedOrigin);
      FlightSrv.setDestinationAirport($scope.flightData.selectedDestination);
      FlightSrv.setDepartureDate($scope.flightData.dtOneway);
      FlightSrv.setClass($scope.flightData.selectedClass);
      FlightSrv.setOtherAirlines($scope.flightData.otherAirlines);
      $scope.flightData = {};
      $scope.flightData.selectedOrigin = "";
      $scope.flightData.selectedDestination = "";
      $scope.flightData.dtOneway = "";
      $scope.flightData.selectedClass = "";
      $scope.flightData.otherAirlines = false;
      $state.go('app.outGoingFlights');
    }

  };

  $scope.searchRoundTrip = function() {
    
    if($scope.flightData.selectedOrigin != null && $scope.flightData.selectedOrigin != ""
      && $scope.flightData.selectedDestination != null && $scope.flightData.selectedDestination != ""
      && $scope.flightData.dtRound !=null && $scope.flightData.dtRound != "" 
      && $scope.flightData.atRound != null  && $scope.flightData.atRound != ""
      && $scope.flightData.selectedClass != null && $scope.flightData.selectedClass != "")
    {
    FlightSrv.setType('Round');
    FlightSrv.setOriginAirport($scope.flightData.selectedOrigin);
    FlightSrv.setDestinationAirport($scope.flightData.selectedDestination);
    FlightSrv.setDepartureDate($scope.flightData.dtRound);
    FlightSrv.setArrivalDate($scope.flightData.atRound);
    FlightSrv.setClass($scope.flightData.selectedClass);
    FlightSrv.setOtherAirlines($scope.flightData.otherAirlines);
    $scope.flightData = {};
    $scope.flightData.selectedOrigin = "";
    $scope.flightData.selectedDestination = "";
    $scope.flightData.dtRound = "";
    $scope.flightData.atRound = "";
    $scope.flightData.selectedClass = "";
    $scope.flightData.otherAirlines = false;
    $state.go('app.outGoingFlights');
   }
  };

  $scope.validateForm =function() {
    
    
  };

  AirportCodes();

});