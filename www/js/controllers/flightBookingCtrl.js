IonicApp.controller('flightBookingCtrl', function($scope, FlightSrv,$state,$ionicModal) {

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  $scope.flightData = {};
  $scope.Airports = ['BOM','DEL','CAI','JED','HKG','TPE',
  'JNB','CPT','RUH','LHR','JFK','LCF','LAX','SFQ','FRA',
  'TXL','FCO','LIN'];
  $scope.seatClasses = ["economy", "business"];
  $scope.flightData.selectedOrigin = "Flying from";
  $scope.flightData.selectedDestination = "Flying to";
  $scope.flightData.dtOneway = "";
  $scope.flightData.selectedClass = "Seat Class";
  $scope.flightData.otherAirlines = false;

  $scope.flightData.selectedOriginOneWayAlert= false;
  $scope.flightData.selectedDestinationOneWayAlert= false;
  $scope.flightData.dtOnewayAlert=false;
  $scope.flightData.selectedClassOneWayAlert=false;

  $scope.flightData.selectedOriginRoundTripAlert=false;
  $scope.flightData.selectedDestinationRoundTripAlert=false;
  $scope.flightData.dtRoundAlert=false;
  $scope.flightData.atRoundAlert=false;
  $scope.flightData.selectedClassRoundTripAlert=false;

  // function AirportCodes() {
  //   FlightSrv.getAirports().success(function(airports) {
  //        $scope.Airports = airports;
  //    });
  // };

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
      
    if($scope.flightData.selectedOrigin == null || $scope.flightData.selectedOrigin == "" || $scope.flightData.selectedOrigin == "Flying from" ){
      $scope.flightData.selectedOriginOneWayAlert= true;
    }
    if($scope.flightData.selectedDestination == null || $scope.flightData.selectedDestination == "" || $scope.flightData.selectedDestination == "Flying to" ){
      $scope.flightData.selectedDestinationOneWayAlert= true;
    }
    if($scope.flightData.dtOneway == null || $scope.flightData.dtOneway == ""){
      $scope.flightData.dtOnewayAlert=true;

    }
    if($scope.flightData.selectedClass == null || $scope.flightData.selectedClass == "" || $scope.flightData.selectedClass == "Seat Class"){
      $scope.flightData.selectedClassOneWayAlert=true;
    }
    if($scope.flightData.selectedOrigin != null && $scope.flightData.selectedOrigin != "" && $scope.flightData.selectedOrigin != "Flying from"
      && $scope.flightData.selectedDestination != null && $scope.flightData.selectedDestination != "" && $scope.flightData.selectedDestination != "Flying to"
      && $scope.flightData.dtOneway != null && $scope.flightData.dtOneway != ""
      && $scope.flightData.selectedClass != null && $scope.flightData.selectedClass != "" && $scope.flightData.selectedClass != "Seat Class")
    {
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


   if($scope.flightData.selectedOrigin == null || $scope.flightData.selectedOrigin == "" || $scope.flightData.selectedOrigin == "Flying from" ){
    $scope.flightData.selectedOriginRoundTripAlert=true;
   }
   if($scope.flightData.selectedDestination == null || $scope.flightData.selectedDestination == "" || $scope.flightData.selectedDestination == "Flying to"){
    $scope.flightData.selectedDestinationRoundTripAlert=true;
   }
   if($scope.flightData.dtRound ==null || $scope.flightData.dtRound == "" ){
    $scope.flightData.dtRoundAlert=true;
   }
   if($scope.flightData.atRound == null  || $scope.flightData.atRound == ""){
    $scope.flightData.atRoundAlert=true;
   }
   if($scope.flightData.selectedClass == null || $scope.flightData.selectedClass == "" || $scope.flightData.selectedClass == "Seat Class"){
    $scope.flightData.selectedClassRoundTripAlert=true;
   }
   if($scope.flightData.selectedOrigin != null && $scope.flightData.selectedOrigin != "" && $scope.flightData.selectedOrigin != "flying from"
      && $scope.flightData.selectedDestination != null && $scope.flightData.selectedDestination != "" && $scope.flightData.selectedDestination != "Flying to"
      && $scope.flightData.dtRound !=null && $scope.flightData.dtRound != "" 
      && $scope.flightData.atRound != null  && $scope.flightData.atRound != ""
      && $scope.flightData.selectedClass != null && $scope.flightData.selectedClass != "" && $scope.flightData.selectedClass != "Seat Class")
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

  // AirportCodes();

});