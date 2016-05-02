IonicApp.controller('outGoingFlightsCtrl', function($scope, FlightSrv, $state, $ionicPopup) {

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
          $scope.flightData.inflights = result;
      });
    };

      $scope.showConfirmOut = function (flight,price){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Outgoing Flight',
          template: 'Are you sure you want to select flight number '+ flight.flightNumber +' ?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            FlightSrv.setOutgoingFlight(flight);
            FlightSrv.setPriceOutgoingFlight(price);
            $scope.flightData.outflights=[];
            if (FlightSrv.getType() === 'OneWay')
                $state.go('app.confirmOneWay'); //todo
            else
                $state.go('app.inGoingFlights'); 
            } 
          else {
            /*console.log('You are not sure');*/
          }
        });
    }; 

     $scope.showConfirmIn = function (flight,price){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Ingoing Flight',
          template: 'Are you sure you want to select flight number '+ flight.flightNumber +' ?'
        });
        confirmPopup.then(function(res) {
          if(res) {
             FlightSrv.setIngoingFlight(flight);
             FlightSrv.setPriceIngoingFlight(price);
             $scope.flightData.inflights=[];
             $state.go('app.confirmRoundTripDep'); //todo
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