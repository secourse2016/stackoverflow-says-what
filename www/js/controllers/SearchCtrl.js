 IonicApp.controller('SearchCtrl', function($scope,$state,FlightSrv,$ionicPopup) {
 $scope.search={};
 $scope.found=false;
 $scope.flight= FlightSrv.getFlight();
 //console.log($scope.searchQuery);
 //refnum = 5726a0c645b95965055819ac
 
 $scope.myStyle = {'color':'white','border-color':'white'};
 $scope.change=function(){
  $scope.found = false;
 }
 $scope.changeEnter = function(){
  $scope.myStyle = {'color':'white' ,'border': '2px solid',
    'border-radius': '25px'};
 }
 $scope.changeLeave = function(){
  $scope.myStyle = {'color':'white','border-color':'white'};
 }
 
/*  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Invalid Booking ID'
    }).then(function(res) {
        
    });
  };*/
  $scope.searchByRefrence = function() {
  	   FlightSrv.setRefNo($scope.search.searchQuery);

       $scope.flight=  FlightSrv.getBookings().success(function(result)
				{
            $scope.flight=result;
            $scope.flight.type = result.type;
            $state.go("app.bookingInfo");

            $scope.flight.type=result.type;
            FlightSrv.setFlight($scope.flight);
            $scope.flight.type = result.type;
				})
        .error(function(data, status) {
           console.error('Repos error', status, data);
           $scope.found = true ; 
       }
      ) 
    .finally(function() {
      console.log("finally finished repos");
    });   
   
           
};
 
});
