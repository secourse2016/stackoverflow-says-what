App.controller('paymentCtrl', function($scope, flightSrv, $location) {

	$scope.bookingData = {};
  $scope.alert = false;
  $scope.verifyAlert = true;
  $scope.payAlert = false;
  var token = null;

  $scope.stripeCallback = function (code, result) {

    if (($scope.bookingData.firstName == null || $scope.bookingData.firstName == "")
    || ($scope.bookingData.lastName == null || $scope.bookingData.lastName == "")
    || ($scope.gender == null || $scope.gender == "")
    || ($scope.bookingData.dob == null || $scope.bookingData.dob == "")
    || ($scope.bookingData.email == null || $scope.bookingData.email == "")
    || ($scope.bookingData.nationality == null || $scope.bookingData.nationality == "")
    || ($scope.mobile == null || $scope.mobile == "")
    || ($scope.bookingData.passport_no == null || $scope.bookingData.passport_no == "")
    || ($scope.bookingData.passport_exp == null || $scope.bookingData.passport_exp == "")
    || ($scope.number == null || $scope.number == "")
    || ($scope.cvc == null || $scope.cvc == "")
    || ($scope.expiryYear == null || $scope.expiryYear == "")
    || ($scope.expiryMonth == null || $scope.expiryMonth == ""))
       $scope.alert = true;

     else
     {
       Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
      // Stripe.card.validateCardNumber($scope.number);

      $scope.cardInfo = {};
      $scope.cardInfo.number = $scope.number;
      $scope.cardInfo.cvc = $scope.cvc;
      $scope.cardInfo.exp_month = $scope.expiryMonth;
      $scope.cardInfo.exp_year = $scope.expiryYear;
      /*$form.find('submitButton').prop('disabled', true);*/ //disable submit to prevent repeated clicks
      Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);

     /* Stripe.card.createToken({
        card: {
            number: "4242424242424242",
            exp_month: 12,
            exp_year: 2017,
            cvc: "123"
          }
      }, stripeResponseHandler);*/

    function stripeResponseHandler(status, response) 
    {
      if (!response.id) 
      { 
        window.alert(response.error.message);
      }
      else 
      { 
        token = response.id;
        console.log(token);

      }
    };


     /*   if(token === null)
        {

        }
        else
        {
            $scope.verifyAlert = false;
            $scope.payAlert = true;
            console.log("heeere");
        }*/
     }
  	};

$scope.pay = function ()
{
    $location.url('/complete');
     console.log("hiiiiii");

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
        flightSrv.setInRefNo("-");
      }
      else
      {
        flightSrv.setOutRefNo(data.outDetails.receipt_no);
        flightSrv.setInRefNo(data.inDetails.receipt_no);
      }                
   });
};


});
