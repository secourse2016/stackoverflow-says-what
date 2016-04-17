App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};

	$scope.Pay = function() {
    	$location.url('/complete');
    	if($scope.bookingData.firstName != undefined && $scope.bookingData.lastName != undefined && $scope.bookingData.email != undefined && $scope.bookingData.passport_no != undefined){

    	}
    	// flightSrv.createPayment()
  	};

});
