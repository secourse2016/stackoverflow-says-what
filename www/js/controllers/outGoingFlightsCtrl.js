IonicApp.controller('outGoingFlightsCtrl', function($scope, FlightSrv, $state) {


    console.log(FlightSrv.getType());
    console.log(FlightSrv.getOriginAirport());
    console.log(FlightSrv.getDestinationAirport());
    console.log(FlightSrv.getDepartureDate());
    console.log(FlightSrv.getArrivalDate());
    console.log(FlightSrv.getClass());
    console.log(FlightSrv.getOtherAirlines());
    $scope.flightData = {};
    function getOutFlights(){
      FlightSrv.getOutFlights(function(result){
          console.log(result);
          $scope.flightData.outflights = result;
      });
    };
    $scope.flightData.brebe2= [1,3,4];
    function getInFlights(){
      FlightSrv.getInFlights(function(result){
          $scope.inflights = result;
      });
    };

    $scope.bookOutgoing = function (flight,price,seatClass){
        flightSrv.setOutgoingFlight(flight);
        flightSrv.setPriceOutgoingFlight(price);
        flightSrv.setOutgoingFlightClass(seatClass);
        if (flightSrv.getType() === 'OneWay')
            $location.url('/oneWayBooking');
        else
            $state.go('/inGoingFlights'); 
    }; 

    $scope.bookIngoing = function (flight,price,seatClass){
        flightSrv.setIngoingFlight(flight);
        flightSrv.setPriceIngoingFlight(price);
        flightSrv.setIngoingFlightClass(seatClass);
        $location.url('/ourteam');
    };

    getOutFlights();
    if (FlightSrv.getType() != 'OneWay')
    {
      //console.log('7amada');
    	getInFlights(); 
    }

});