App.controller('mainCtrl', function($scope,$location) {
	$scope.flights = function() {
    $location.url('/flightBooking');
  };
});