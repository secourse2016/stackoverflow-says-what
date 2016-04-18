App.controller('flightBookingCtrl', function($scope, flightSrv, $location) {

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
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

  $scope.checkboxModel = false;

  $scope.searchOneWay = function() {
    if($scope.selectedOrigin == null || $scope.selectedOriginOneway == "")
        $scope.originAlert =true;
    else
        $scope.originAlert =false;      

    if($scope.selectedDestination == null || $scope.selectedDestination == "")
      $scope.destAlert =true;
    else
      $scope.destAlert =false;

    if($scope.dtOneway == null || $scope.dtOneway == "")
      $scope.departureAlert =true;
    else
      $scope.departureAlert =false;

    if($scope.selectedClass == null || $scope.selectedClass == "")
      $scope.classAlert =true;
    else
      $scope.classAlert =false;

    if($scope.selectedOrigin != null && $scope.selectedDestination != null
      && $scope.dtOneway != null && $scope.selectedClass != null)
    {
    flightSrv.setType('OneWay');
    flightSrv.setOriginAirport($scope.selectedOrigin);
    flightSrv.setDestinationAirport($scope.selectedDestination);
    var date =  $scope.dtOneway.getDate();
    var month = '0' + ($scope.dtOneway.getMonth() + 1); //Months are zero based
    var year =  $scope.dtOneway.getFullYear();
    $scope.newDate = year + "-" + month + "-" + date;
    flightSrv.setDepartureDate($scope.newDate);
    flightSrv.setClass($scope.selectedClass);
    $location.url('/outGoingFlights');
   }

  };

  $scope.searchRoundTrip = function() {
    if ($scope.selectedOrigin == null || $scope.selectedOriginOneway == "")
        $scope.originAlert =true;  
    else
        $scope.originAlert =false;      

    if($scope.selectedDestination == null || $scope.selectedDestination == "")
      $scope.destAlert =true;
    else
      $scope.destAlert =false;

    if($scope.dtRound ==null || $scope.dtRound =="")
      $scope.departureAlert =true;
    else
      $scope.departureAlert =false;

    if($scope.atRound == null || $scope.atRound == "")
      $scope.arrivalAlert =true;
    else
      $scope.arrivalAlert =false;

    if($scope.selectedClass == null || $scope.selectedClass == "")
      $scope.classAlert =true;
    else
      $scope.classAlert =false;

    if($scope.selectedOrigin != null && $scope.selectedDestination != null
      && $scope.dtRound !=null && $scope.atRound != null && $scope.selectedClass != null){
    flightSrv.setType('Round');
    flightSrv.setOriginAirport($scope.selectedOrigin);
    flightSrv.setDestinationAirport($scope.selectedDestination);
    var date =  $scope.dtRound.getDate();
    var month = '0' + ($scope.dtRound.getMonth() + 1); //Months are zero based
    var year =  $scope.dtRound.getFullYear();
    $scope.newDateD = year + "-" + month + "-" + date;
    flightSrv.setDepartureDate($scope.newDateD);
    date = $scope.atRound.getDate();
    month = '0' + ($scope.atRound.getMonth() + 1);
    year =  $scope.atRound.getFullYear();
    $scope.newDateA = year + "-" + month + "-" + date;
    flightSrv.setArrivalDate($scope.newDateA);
    flightSrv.setClass($scope.selectedClass);
    $location.url('/outGoingFlights');
   }
  };
$scope.validateForm =function() {
    
    
}
  AirportCodes();
});