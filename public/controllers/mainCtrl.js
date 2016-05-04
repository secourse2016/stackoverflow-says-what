App.controller('mainCtrl', function($scope,flightSrv,$location) {

  function getBookingDetails(){
      flightSrv.getBookings().success(function(booking){
        console.log(booking);
        if (!booking)
          $scope.notFound=true;
        $scope.booking = booking;
      })
      .error(function(data, status){
            $scope.notFound=true;
            console.log("Error status: " + status);
      });
  };

	$scope.BookAFlight = function() {
    $location.url('/flightBooking');
  };

	$scope.homePage = function() {
    $location.url('/');
  };

  //searching for flight by booking ref
  $scope.ref = null;
  $scope.refAlert = false;
  $scope.bookingDetails = function() {
   flightSrv.setRefNo($scope.ref);
    if($scope.ref == null || $scope.ref == "")
      $scope.refAlert = true;
    else
    {
      //console.log("in method bookingDetails");
      $location.url('/bookingDetails');
      
    }
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
    else
      $scope.fnAlert = false;

    if($scope.ln == null || $scope.ln == "")
      $scope.lnAlert = true;
    else
      $scope.lnAlert = false;
    
    if($scope.email == null || $scope.email == "")
      $scope.emailAlert = true;
    else
      $scope.emailAlert = false;
    
    if($scope.comment == null || $scope.comment == "")
      $scope.commentAlert = true;
    else
      $scope.commentAlert = false;

    if($scope.fn != null && $scope.ln != null &&
      $scope.email != null && $scope.comment != null){ 
            
       $location.url('/thankYou');
    }
  };

  getBookingDetails();

});