IonicApp.controller('outGoingFlightsCtrl', function($scope, FlightSrv, $state) {

   /* console.log(FlightSrv.getType());
    console.log(FlightSrv.getOriginAirport());
    console.log(FlightSrv.getDestinationAirport());
    console.log(FlightSrv.getDepartureDate());
    console.log(FlightSrv.getArrivalDate());
    console.log(FlightSrv.getClass());
    console.log(FlightSrv.getOtherAirlines());
*/
    $scope.flightData = {};
    function getOutFlights(){
      FlightSrv.getOutFlights(function(result){
          console.log("found out flights: " + result);
          $scope.flightData.outflights = result;
      });
    };

    function getInFlights(){
      FlightSrv.getInFlights(function(result){
          $scope.inflights = result;
      });
    };

    $scope.bookOutgoing = function (flight,price,seatClass){
        FlightSrv.setOutgoingFlight(flight);
        FlightSrv.setPriceOutgoingFlight(price);
        FlightSrv.setOutgoingFlightClass(seatClass);
        if (FlightSrv.getType() === 'OneWay')
            $state.go('app.confirmationOneWay'); //todo
        else
            $state.go('app.inGoingFlights'); 
    }; 

    $scope.bookIngoing = function (flight,price,seatClass){
        FlightSrv.setIngoingFlight(flight);
        FlightSrv.setPriceIngoingFlight(price);
        FlightSrv.setIngoingFlightClass(seatClass);
        $state.go('app.confirmationRoundTrip'); //todo
    };

    getOutFlights();
    if (FlightSrv.getType() != 'OneWay')
    {
    	getInFlights(); 
    }

});