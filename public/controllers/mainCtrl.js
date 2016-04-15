App.controller('mainCtrl', function($scope,flightSrv,$location) {

  
	$scope.BookAFlight = function() {
    $location.url('/flightBooking');
  };

  
	$scope.homePage = function() {
    $location.url('/');
  };

    $scope.bookingDetails = function() {
    $location.url('/bookingDetails');
    };

    $scope.contactSubmit = function() {
    $location.url('/thankYou');
  };

});