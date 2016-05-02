 IonicApp
 .controller('SearchCtrl', function($scope,$state,FlightSrv) {
  $scope.search={};
 $scope.flight= FlightSrv.getFlight();
 if($scope.flight!=undefined)
 console.log($scope.flight.passengers);
 console.log("here");
  $scope.searchByRefrence = function() {
       console.log($scope.search.searchQuery);
  	   FlightSrv.setRefNo($scope.search.searchQuery);
       $scope.flight=  FlightSrv.getBookings().success(function(result)
				{
					$scope.flight=result;
					console.log(result.type);
					$scope.flight.type = result.type;
                    $state.go("app.bookingInfo");
                    $scope.flight.type=result.type;

					FlightSrv.setFlight($scope.flight);
					$scope.flight.type = result.type;
                    			console.log($state);
				});              
 
      };
 


 })
