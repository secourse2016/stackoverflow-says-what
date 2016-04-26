App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};
    $scope.alert = false;

   /* if($scope.bookingData.firstName != undefined && 
       $scope.bookingData.lastName != undefined && 
       $scope.bookingData.email != undefined 
       && $scope.bookingData.passport_no != undefined){

       $scope.bookingData.type = flightSrv.getType();
       $scope.bookingData.outFlightNo = flightSrv.getOutgoingFlight().flightNumber;
       $scope.bookingData.myClass = flightSrv.getClass();

        if(flightSrv.getType() === 'Round')
           $scope.bookingData.inFlightNo = flightSrv.getIngoingFlight().flightNumber;

        flightSrv.createPayment($scope.bookingData).success(function (data) {
                    
            $scope.bookingData = {};
            $scope.refNo = data;
            if(flightSrv.getType() === "OneWay")
            {
                flightSrv.setOutRefNo(data.receipt_no);
                flightSrv.setInRefNo("");
            }
            else
            {
                flightSrv.setOutRefNo(data.outDetails.receipt_no);
                flightSrv.setInRefNo(data.inDetails.receipt_no);
            }
                
        });
     }*/




	$scope.Pay = function() {

    if (($scope.bookingData.firstName == null || $scope.bookingData.firstName == "")
     || ($scope.bookingData.lastName == null || $scope.bookingData.lastName == "")
     || ($scope.gender == null || $scope.gender == "")
     || ($scope.bookingData.email == null || $scope.bookingData.email == "")
     || ($scope.mobile == null || $scope.mobile == "")
     || ($scope.bookingData.passport_no == null || $scope.bookingData.passport_no == "")
     || ($scope.credit == null || $scope.credit == "")
     || ($scope.pass == null || $scope.pass == ""))
        $scope.alert = true;

     else
     {
        /*if($scope.bookingData.firstName != undefined && 
       $scope.bookingData.lastName != undefined && 
       $scope.bookingData.email != undefined 
       && $scope.bookingData.passport_no != undefined){*/

       $scope.bookingData.type = flightSrv.getType();
       $scope.bookingData.outFlightNo = flightSrv.getOutgoingFlight().flightNumber;
       $scope.bookingData.myClass = flightSrv.getClass();

        if(flightSrv.getType() === 'Round')
           $scope.bookingData.inFlightNo = flightSrv.getIngoingFlight().flightNumber;
        flightSrv.createPayment($scope.bookingData,function (data)
        {
            $scope.bookingData = {};
            $scope.refNo = data;
            if(flightSrv.getType() === "OneWay")
            {
                flightSrv.setOutRefNo(data.receipt_no);
                flightSrv.setInRefNo("-");
            }
            else
            {
                flightSrv.setOutRefNo(data.outDetails.receipt_no);
                flightSrv.setInRefNo(data.inDetails.receipt_no);
            }
        }); 
        /*flightSrv.createPayment($scope.bookingData).success(function (data) {
                    
            $scope.bookingData = {};
            $scope.refNo = data;
            if(flightSrv.getType() === "OneWay")
            {
                flightSrv.setOutRefNo(data.receipt_no);
                flightSrv.setInRefNo("-");
            }
            else
            {
                flightSrv.setOutRefNo(data.outDetails.receipt_no);
                flightSrv.setInRefNo(data.inDetails.receipt_no);
            }
                
        });*/
    // }
        $location.url('/complete');
     }
    	
  	};
});
