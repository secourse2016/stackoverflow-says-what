App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};
	

	$scope.Pay = function() {
    if (($scope.bookingData.firstName == null || $scope.bookingData.firstName == "")
     || ($scope.bookingData.lastName == null || $scope.bookingData.lastName == "")
     || ($scope.gender == null || $scope.gender == "")
     || ($scope.bookingData.email == null || $scope.bookingData.email == "")
     || ($scope.mobile == null || $scope.mobile == "")
     || ($scope.bookingData.passport_no == null || $scope.bookingData.passport_no == "")
     || ($scope.credit == null || $scope.credit == "")
     || ($scope.pass == null || $scope.pass == ""))
         alert("Please fill out all fields");
     else
     {
        $location.url('/complete');
        if($scope.bookingData.firstName != undefined && $scope.bookingData.lastName != undefined && $scope.bookingData.email != undefined && $scope.bookingData.passport_no != undefined){
            $scope.bookingData.type = flightSrv.getType();
            $scope.bookingData.outFlightNo = flightSrv.getOutgoingFlight();
            $scope.bookingData.myClass = flightSrv.getClass();
            if(flightSrv.getType() === 'Round')
                $scope.bookingData.inFlightNo = flightSrv.getIngoingFlight();
            flightSrv.createPayment($scope.bookingData)
                .success(function (data) {
                    // body...
                    $scope.bookingData = {};
                    $scope.refNo = data;
                    if(flightSrv.getType() === 'OneWay')
                        flightSrv.setOutRefNo(data.receipt_no);
                    else{
                        flightSrv.setOutRefNo(data.outDetails.receipt_no);
                        flightSrv.setInRefNo(data.inDetails.receipt_no);
                    }
                });
        }
     }
    	
  	};
// =======
// App.controller('paymentCtrl', function($scope,flightSrv,$location) {

// $scope.fn = null;
// $scope.ln = null;
// $scope.gender = null;
// $scope.email = null;
// $scope.mobile = null;
// $scope.passport = null;
// $scope.credit = null;
// $scope.pass = null;

// $scope.Pay = function() {
// 	 if (($scope.fn == null || $scope.fn == "")
// 	 	|| ($scope.ln == null || $scope.ln == "")
// 	 	|| ($scope.gender == null || $scope.gender == "")
// 	 	|| ($scope.email == null || $scope.email == "")
// 	 	|| ($scope.mobile == null || $scope.mobile == "")
// 	 	|| ($scope.passport == null || $scope.passport == "")
// 	 	|| ($scope.credit == null || $scope.credit == "")
// 	 	|| ($scope.pass == null || $scope.pass == ""))
// 	 	 alert("Please fill out all fields");
// 	 else
// 	 {
//     	 $location.url('/complete');
//      }   
//   };
// >>>>>>> 4ff1890acbab326d05c41acac4ac5cd058f321ae

});
