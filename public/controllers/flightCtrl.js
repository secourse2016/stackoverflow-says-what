
App.controller('flightCtrl', function($scope,flightSrv,$location) {
    $scope.predicate = "date";
    $scope.reverse = "price1";
    $scope.upper_bound=10000;
    $scope.lower_bound=0;
    $scope.date = "";
    $scope.selectedClass = flightSrv.getClass();
    function getInFlights(){
      flightSrv.getInFlights(function(result){
          $scope.inflights = result;
      });
    };

    function getOutFlights(){
      flightSrv.getOutFlights(function(result){
          $scope.outflights = result;
      });
    };


  $scope.bookOutgoing = function (flight,price,seatClass){
            flightSrv.setOutgoingFlight(flight);
            flightSrv.setPriceOutgoingFlight(price);
            flightSrv.setOutgoingFlightClass(seatClass);
            if (flightSrv.getType()==='OneWay')
              $location.url("/confirmationO");
            else
              $location.url("/inGoingFlights");
          };

  $scope.bookIngoing = function (flight,price,seatClass){
            flightSrv.setIngoingFlight(flight);
            flightSrv.setPriceIngoingFlight(price);
            flightSrv.setIngoingFlightClass(seatClass);
            $location.url("/confirmationR");
          };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

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
    $scope.byRange = function (flight) {
      return ($scope.lower_bound<=flight.price1&&$scope.upper_bound>=flight.price1)||($scope.lower_bound<=flight.price2&&$scope.upper_bound>=flight.price2)||($scope.lower_bound<=flight.price3&&$scope.upper_bound>=flight.price3);

  };
  getOutFlights();
  if (flightSrv.getType() != 'OneWay')
    getInFlights();   
 
});