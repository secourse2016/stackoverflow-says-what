App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};
    $scope.alert = false;

	$scope.Pay = function() {

      if (($scope.bookingData.firstName == null || $scope.bookingData.firstName == "")
    || ($scope.bookingData.lastName == null || $scope.bookingData.lastName == "")
    || ($scope.gender == null || $scope.gender == "")
    || ($scope.bookingData.email == null || $scope.bookingData.email == "")
    || ($scope.mobile == null || $scope.mobile == "")
    || ($scope.bookingData.passportNum == null || $scope.bookingData.passportNum == "")
    || ($scope.bookingData.passportExpiryDate == null || $scope.bookingData.passportExpiryDate == "")
    || ($scope.bookingData.dateOfBirth == null || $scope.bookingData.dateOfBirth == "")
    || ($scope.bookingData.nationality == null || $scope.bookingData.nationality == "")
    || ($scope.credit == null || $scope.credit == "")
    || ($scope.cvc == null || $scope.cvc == "")
    || ($scope.expiryYear == null || $scope.expiryYear == "")
    || ($scope.expiryMonth == null || $scope.expiryMonth == ""))
       $scope.alert = true;

     else
     {
      /*Stripe.card.createToken({
      number: $('.credit').val(),
      cvc: $('.cvc').val(),
      exp_month: $('.expiryMonth').val(),
      exp_year: $('.expiryYear').val()
      
      }, stripeResponseHandler);*/
       $scope.paymentDetails = {};
       $scope.paymentDetails.passengerDetails = [];
       $scope.paymentDetails.passengerDetails[0]=$scope.bookingData;
       $scope.paymentDetails.outgoingFlightId = flightSrv.getOutgoingFlight().flightId;
       $scope.paymentDetails.class = flightSrv.getClass();
       $scope.paymentDetails.cost = flightSrv.getOutgoingFlight().cost;
       console.log('Payment');
        if(flightSrv.getType() === 'Round')
        {
           $scope.paymentDetails.returnFlightId = flightSrv.getIngoingFlight().flightId;
           $scope.paymentDetails.cost += flightSrv.getIngoingFlight().cost;
        }
        flightSrv.createPayment($scope.paymentDetails,function (data)
        {
            $scope.bookingData = {};
            $scope.paymentDetails = {};
            $scope.refNo = data;
            if(flightSrv.getType() === "OneWay")
            {
                flightSrv.setOutRefNo(data);
                flightSrv.setInRefNo("-");
            }
            else
            {
                flightSrv.setOutRefNo(data.outDetails._id);
                flightSrv.setInRefNo(data.inDetails._id);
            }
        }); 
        $location.url('/complete');
     }
    	
  	};
});
