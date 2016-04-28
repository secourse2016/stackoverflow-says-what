App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};
  $scope.alert = false;
  $scope.cardCheck = true;
  $scope.cvcCheck = true;
  $scope.dateCheck = true;
  $scope.verifying = false;
  var token = null;

  $scope.stripeCallback = function (code, result) {

    if (($scope.bookingData.firstName == null || $scope.bookingData.firstName == "")
    || ($scope.bookingData.lastName == null || $scope.bookingData.lastName == "")
    || ($scope.bookingData.passportNum == null || $scope.bookingData.passportNum == "")
    || ($scope.gender == null || $scope.gender == "")
    || ($scope.bookingData.email == null || $scope.bookingData.email == "")
    || ($scope.bookingData.passportExpiryDate == null || $scope.bookingData.passportExpiryDate == "")
    || ($scope.bookingData.dateOfBirth == null || $scope.bookingData.dateOfBirth == "")
    || ($scope.bookingData.nationality == null || $scope.bookingData.nationality == "")
    || ($scope.mobile == null || $scope.mobile == "")
    || ($scope.number == null || $scope.number == "")
    || ($scope.cvc == null || $scope.cvc == "")
    || ($scope.expiryYear == null || $scope.expiryYear == "")
    || ($scope.expiryMonth == null || $scope.expiryMonth == ""))
       $scope.alert = true;

     else
     {
        Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
        $scope.cardInfo = {};
        $scope.cardInfo.number = $scope.number;
        $scope.cardInfo.cvc = $scope.cvc;
        $scope.cardInfo.exp_month = $scope.expiryMonth;
        $scope.cardInfo.exp_year = $scope.expiryYear;
        $scope.verifying = true;  //disabling submit button to avoid resubmissions

        //input validation
        $scope.cardCheck = Stripe.card.validateCardNumber($scope.number);
        $scope.cvcCheck = Stripe.card.validateCVC($scope.cvc);
        $scope.dateCheck = Stripe.card.validateExpiry($scope.expiryMonth, $scope.expiryYear); 
        Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);
     }
  	

     
     
  };

  function stripeResponseHandler(status, response) 
  {
    if(response.error) 
    { 
      $scope.verifying = false;
      //window.alert(response.error.message); 
    }
    else 
    { 
      token = response.id;
      console.log(token);
      Book(token);
    }
  };

function Book(token)
{
       $scope.paymentDetails = {};
       $scope.paymentDetails.passengerDetails = [];
       $scope.paymentDetails.passengerDetails[0]=$scope.bookingData;
       $scope.paymentDetails.outgoingFlightId = flightSrv.getOutgoingFlight().flightId;
       $scope.paymentDetails.class = flightSrv.getClass();
       $scope.paymentDetails.cost = flightSrv.getOutgoingFlight().cost;
       $scope.paymentDetails.paymentToken = token;
       console.log('Payment');
        if(flightSrv.getType() === 'Round')
        {
           $scope.paymentDetails.returnFlightId = flightSrv.getIngoingFlight().flightId;
           $scope.paymentDetails.cost += flightSrv.getIngoingFlight().cost;
           console.log($scope.paymentDetails);
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
                flightSrv.setOutRefNo(data);
                flightSrv.setInRefNo(data);
            }
        }); 
        verifying = false;
        $location.url('/complete');
};
});

