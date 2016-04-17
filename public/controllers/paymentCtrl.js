App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};
	// $scope.booked

	$scope.Pay = function() {
    	$location.url('/complete');
    	if($scope.bookingData.firstName != undefined && $scope.bookingData.lastName != undefined && $scope.bookingData.email != undefined && $scope.bookingData.passport_no != undefined){
    		flightSrv.createPayment($scope.bookingData)
    			.success(function (data) {
    				// body...
    				$scope.bookingData = {};
    				$scope.refNo = data;
    			});
    	}
  	};

});
