App.controller('mainCtrl', function($scope,flightSrv,$location) {

  
	$scope.BookAFlight = function() {
    $location.url('/flightBooking');
  };

});

