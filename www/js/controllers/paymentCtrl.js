 IonicApp.controller('paymentCtrl', function($scope,$state,FlightSrv, $http) {
 	$scope.bookingData = {};
 	$scope.val = {};

  $scope.alert = false;
	$scope.val.cardCheck = true;
	$scope.val.cvcCheck = true;
	$scope.val.dateCheck = true;
	$scope.val.verifying = false;

	var token = null;
	var IP = "";

	$scope.stripeCallback = function (code, result) {
    var wt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWNvdXJzZSIsImlhdCI6MTQ2MDg0NzM0NywiZXhwIjoxNDkyMzgzMzUwLCJhdWQiOiJ3d3cuc2Vjb3Vyc2UuY29tIiwic3ViIjoidGVzdCJ9.nG7cFcHmCeMW03YwPS69a9LBRGimweIPBi7wIwxGmIs#/';
    if (($scope.bookingData.firstName == null || $scope.bookingData.firstName == "")
    || ($scope.bookingData.lastName == null || $scope.bookingData.lastName == "")
    || ($scope.bookingData.passportNum == null || $scope.bookingData.passportNum == "")
    || ($scope.bookingData.gender == null || $scope.bookingData.gender == "")
    || ($scope.bookingData.email == null || $scope.bookingData.email == "")
    || ($scope.bookingData.passportExpiryDate == null || $scope.bookingData.passportExpiryDate == "")
    || ($scope.bookingData.dateOfBirth == null || $scope.bookingData.dateOfBirth == "")
    || ($scope.bookingData.nationality == null || $scope.bookingData.nationality == "")
    || ($scope.bookingData.mobile == null || $scope.bookingData.mobile == "")
    || ($scope.bookingData.number == null || $scope.bookingData.number == "")
    || ($scope.bookingData.cvc == null || $scope.bookingData.cvc == "")
    || ($scope.bookingData.expiryYear == null || $scope.bookingData.expiryYear == "")
    || ($scope.bookingData.expiryMonth == null || $scope.bookingData.expiryMonth == ""))
       $scope.alert = true;

     else
     {
        //console.log(FlightSrv.getOutgoingFlight());
        IP = FlightSrv.getOutgoingFlight().IP;
        //console.log(IP);
        // = 'http://54.93.36.94';
        if (!IP)
          IP="http://54.93.36.94";
        var myUrl = IP;

        myUrl = myUrl.concat('/stripe/pubkey?wt=').concat(wt);
        $scope.cardInfo = {};
        $scope.cardInfo.number = $scope.bookingData.number;
        $scope.cardInfo.cvc = $scope.bookingData.cvc;
        $scope.cardInfo.exp_month = $scope.bookingData.expiryMonth;
        $scope.cardInfo.exp_year = $scope.bookingData.expiryYear;
        $scope.val.verifying = true;  //disabling submit button to avoid resubmissions

        //input validation
        $scope.val.cardCheck = Stripe.card.validateCardNumber($scope.number);
        $scope.val.cvcCheck = Stripe.card.validateCVC($scope.cvc);
        $scope.val.dateCheck = Stripe.card.validateExpiry($scope.expiryMonth, $scope.expiryYear);
        if (FlightSrv.getType() === 'OneWay')
        {
          
          $http.get(myUrl).success(function(pubkey){
            Stripe.setPublishableKey(pubkey);
            Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);
            Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
          });
        }  
        else
        {
          if(FlightSrv.getOutgoingFlight().Airline === FlightSrv.getIngoingFlight().Airline)
          {
            $http.get(myUrl).success(function(pubkey){
            Stripe.setPublishableKey(pubkey);
            Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);
            Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            });
          }
          else
          {
            $http.get(myUrl)
          }  
        }
     }
  	

     
     
  };

  function stripeResponseHandler(status, response) 
  {
    if(response.error) 
    { 
      $scope.val.verifying = false;
    }
    else 
    { 
      token = response.id;
      /*console.log(token);*/
      Book(token);
    }
  };

function Book(token)
{
       console.log(IP);
       $scope.paymentDetails = {};
       $scope.paymentDetails.passengerDetails = [];
       $scope.paymentDetails.passengerDetails[0]=$scope.bookingData;
       $scope.paymentDetails.outgoingFlightId = FlightSrv.getOutgoingFlight().flightId;
       $scope.paymentDetails.class = FlightSrv.getClass();
       $scope.paymentDetails.cost = FlightSrv.getOutgoingFlight().cost;
       $scope.paymentDetails.paymentToken = token;
       console.log('Payment');
        if(FlightSrv.getType() === 'Round')
        {
           $scope.paymentDetails.returnFlightId = FlightSrv.getIngoingFlight().flightId;
           $scope.paymentDetails.cost += FlightSrv.getIngoingFlight().cost;
           console.log($scope.paymentDetails);
        }
        FlightSrv.createPayment($scope.paymentDetails,IP,function (data)
        {
            $scope.bookingData = {};
            $scope.paymentDetails = {};
            $scope.bookingData.refNo = data;
  
            if(FlightSrv.getType() === "OneWay")
            {
                if (data.refNum)
                {
                  FlightSrv.setOutRefNo(data.refNum);
                  FlightSrv.setInRefNo("-");
                }
                else
                {
                  FlightSrv.setOutRefNo("Sorry the booking failed");
                  FlightSrv.setInRefNo("-");
                }
            }
            else
            {
              if (data.refNum)
                {
                  FlightSrv.setOutRefNo(data.refNum);
                  FlightSrv.setInRefNo(data.refNum);
                }
                else
                {
                  FlightSrv.setOutRefNo("Sorry the booking failed");
                  FlightSrv.setInRefNo("Sorry the booking failed");
                }
                
                
            }
        }); 
        verifying = false;
        Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
        $state.go('app.finalBookingPage');
};

});