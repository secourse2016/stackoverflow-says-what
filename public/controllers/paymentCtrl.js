App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};
	// $scope.booked

	$scope.Pay = function() {
    	$location.url('/complete');
    	if($scope.bookingData.firstName != undefined && $scope.bookingData.lastName != undefined && $scope.bookingData.email != undefined && $scope.bookingData.passport_no != undefined){
    		$scope.bookingData.type = flightSrv.getType();
    		$scope.bookingData.outFlightNo = flightSrv.getOutgoingFlight();
    		$scope.bookingData.myClass = flightSrv.getClass();
    		if(flightSrv.getType === 'Rpund')
    			$scope.bookingData.inFlightNo = flightSrv.getIngoingFlight();
    		flightSrv.createPayment($scope.bookingData)
    			.success(function (data) {
    				// body...
    				$scope.bookingData = {};
    				$scope.refNo = data;
    			});
    	}
  	};

});
