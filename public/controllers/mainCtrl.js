App.controller('mainCtrl', function($scope,flightSrv,$location,$http) {

  function getBookingDetails(){
        flightSrv.getBookingDetails().success(function(booking){
        $scope.booking = booking;
      });
    };
/*  function getBookingDetails(){
    $scope.booking=flightSrv.getBookingDetails();
}; */   
	$scope.BookAFlight = function() {
    $location.url('/flightBooking');
  };

	$scope.homePage = function() {
    $location.url('/');
  };

  $scope.bookingDetails = function() {
    flightSrv.setRefNum($scope.refNo);
    $location.url('/bookingDetails');
  };

  $scope.contactSubmit = function() {
    $location.url('/thankYou');
  };
  //$scope.todo="HELLL";
  getBookingDetails();
});