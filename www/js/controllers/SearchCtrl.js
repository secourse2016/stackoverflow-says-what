 IonicApp.controller('SearchCtrl', function($scope,$state,FlightSrv,$ionicPopup) {
 $scope.search={};
 $scope.flight= FlightSrv.getFlight();
 if($scope.flight != undefined)
    console.log("passengers" + $scope.flight);
 
 //refnum = 5726a0c645b95965055819ac
 
/*  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Invalid Booking ID'
    }).then(function(res) {
        
    });
  };*/

  /*$scope.alert = false;
*/
  $scope.searchByRefrence = function() {
       //console.log($scope.search.searchQuery);
  	   FlightSrv.setRefNo($scope.search.searchQuery);

       //synch alert with cb
       $scope.flight=  FlightSrv.getBookings().success(function(result)
				{
            $scope.flight=result;
            $scope.flight.type = result.type;
            $state.go("app.bookingInfo");

            $scope.flight.type=result.type;
            FlightSrv.setFlight($scope.flight);
            $scope.flight.type = result.type;
				});            
  };
 
});
