App.controller('mainCtrl', function($scope,$location) {
	$scope.BookAFlight = function() {
    $location.url('/flightBooking');
  };
});

