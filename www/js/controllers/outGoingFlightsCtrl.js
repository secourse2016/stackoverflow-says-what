IonicApp.controller('outGoingFlightsCtrl', function($scope, FlightSrv, $state, $ionicPopup) {

   /* console.log(FlightSrv.getType());
    console.log(FlightSrv.getOriginAirport());
    console.log(FlightSrv.getDestinationAirport());
    console.log(FlightSrv.getDepartureDate());
    console.log(FlightSrv.getArrivalDate());
    console.log(FlightSrv.getClass());
    console.log(FlightSrv.getOtherAirlines());
*/
    //$state.reload();
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

      $scope.showConfirmOut = function (flight,price,seatClass){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Outgoing Flight',
          template: 'Are you sure you want to select flight number '+ flight.flightNumber +' ?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            FlightSrv.setOutgoingFlight(flight);
            FlightSrv.setPriceOutgoingFlight(price);
            FlightSrv.setOutgoingFlightClass(seatClass);
            if (FlightSrv.getType() === 'OneWay')
                $state.go('app.confirmationOneWay'); //todo
            else
                $state.go('app.inGoingFlights'); 
            } 
          else {
            /*console.log('You are not sure');*/
          }
        });
    }; 

     $scope.showConfirmIn = function (flight,price,seatClass){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Ingoing Flight',
          template: 'Are you sure you want to select flight number '+ flight.flightNumber +' ?'
        });
        confirmPopup.then(function(res) {
          if(res) {
             FlightSrv.setIngoingFlight(flight);
             FlightSrv.setPriceIngoingFlight(price);
             FlightSrv.setIngoingFlightClass(seatClass);
             $state.go('app.confirmationRoundTrip'); //todo
            } 
          else {
            /*console.log('You are not sure');*/
          }
        });
    }; 

    getOutFlights();
    if (FlightSrv.getType() != 'OneWay')
    {
    	getInFlights(); 
    }

});