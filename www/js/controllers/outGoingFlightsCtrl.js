IonicApp.controller('outGoingFlightsCtrl', function($scope, FlightSrv,$location) {

    /*function getOutFlights(){
      flightSrv.getOutFlights(function(result){
          $scope.outflights = result;
      });
    };

    function getInFlights(){
      flightSrv.getInFlights(function(result){
          $scope.inflights = result;
      });
    };
*/
   // $scope.test = "bate5";
    $scope.bookOutgoing = function (flight,price,seatClass){
    	//$scope.test = "potato";
        flightSrv.setOutgoingFlight(flight);
        flightSrv.setPriceOutgoingFlight(price);
        flightSrv.setOutgoingFlightClass(seatClass);
        if (flightSrv.getType() === 'OneWay')
            $location.url(""); //todo
        else
            $location.url(""); //todo
    }; 

    $scope.bookIngoing = function (flight,price,seatClass){
        flightSrv.setIngoingFlight(flight);
        flightSrv.setPriceIngoingFlight(price);
        flightSrv.setIngoingFlightClass(seatClass);
        $location.url(""); //todo
    };


/*
    getOutFlights();
    if (flightSrv.getType() != 'OneWay')
    	getInFlights(); 
*/
});