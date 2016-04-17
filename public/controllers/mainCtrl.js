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


  //contactUs
  $scope.fn = null;
  $scope.fnAlert = false;
  $scope.ln = null;
  $scope.lnAlert = false;
  $scope.email = null;
  $scope.emailAlert = false;
  $scope.comment = null;
  $scope.commentAlert = false;

  $scope.contactSubmit = function() {
    if($scope.fn == null || $scope.fn == "")
      $scope.fnAlert = true;

    if($scope.ln == null || $scope.ln == "")
      $scope.lnAlert = true;
    
    if($scope.email == null || $scope.email == "")
      $scope.emailAlert = true;
    
    if($scope.comment == null || $scope.comment == "")
      $scope.commentAlert = true;
    
    else{
       $location.url('/thankYou');
    }
  };

});