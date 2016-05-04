App.controller('paymentCtrl', function($scope, flightSrv, $location, $http) {

	$scope.bookingData = {};
  $scope.alert = false;
  $scope.cardCheck = true;
  $scope.cvcCheck = true;
  $scope.dateCheck = true;
  $scope.verifying = false;
  var token = null;
  var IP = "";
  var IPout = "";
  var IPin = "";
  var myUrlin = "";

  $scope.stripeCallback = function (code, result) {
    var wt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWNvdXJzZSIsImlhdCI6MTQ2MDg0NzM0NywiZXhwIjoxNDkyMzgzMzUwLCJhdWQiOiJ3d3cuc2Vjb3Vyc2UuY29tIiwic3ViIjoidGVzdCJ9.nG7cFcHmCeMW03YwPS69a9LBRGimweIPBi7wIwxGmIs#/';
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
        IP = flightSrv.getOutgoingFlight().IP;
        if (!IP)
          IP="";
        var myUrl = IP;

        myUrl = myUrl.concat('/stripe/pubkey?wt=').concat(wt);
        $scope.cardInfo = {};
        $scope.cardInfo.number = $scope.number;
        $scope.cardInfo.cvc = $scope.cvc;
        $scope.cardInfo.exp_month = $scope.expiryMonth;
        $scope.cardInfo.exp_year = $scope.expiryYear;
        $scope.verifying = true;  //disabling submit button to avoid resubmissions
        $scope.diffAirlines = false;
        //input validation
        $scope.cardCheck = Stripe.card.validateCardNumber($scope.number);
        $scope.cvcCheck = Stripe.card.validateCVC($scope.cvc);
        $scope.dateCheck = Stripe.card.validateExpiry($scope.expiryMonth, $scope.expiryYear);
        if (flightSrv.getType() === 'OneWay')
        {
          $http.get(myUrl).success(function(pubkey){
            Stripe.setPublishableKey(pubkey);
            Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);
            Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
          }).error(function(data, status){
            flightSrv.setOutRefNo("Sorry the booking failed");
            flightSrv.setInRefNo("-");
            verifying = false;
            Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            $location.url('/complete');
          });
        }  
        else
        {
          if(flightSrv.getOutgoingFlight().Airline === flightSrv.getIngoingFlight().Airline)
          {
            $http.get(myUrl).success(function(pubkey){
            Stripe.setPublishableKey(pubkey);
            Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);
            Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            }).error(function(data, status){
              flightSrv.setOutRefNo("Sorry the booking failed");
              flightSrv.setInRefNo("Sorry the booking failed");
              verifying = false;
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
              $location.url('/complete');
            });
          }
          else
          {
            IPout = flightSrv.getOutgoingFlight().IP;
            if (!IPout)
              IPout = "";
            var myUrlout = IPout;
            myUrlout = myUrlout.concat('/stripe/pubkey?wt=').concat(wt); 
            IPin = flightSrv.getIngoingFlight().IP;
            if (!IPin)
              IPin = "";
            myUrlin = IPin;
            myUrlin = myUrlin.concat('/stripe/pubkey?wt=').concat(wt);
            $scope.diffAirlines = true;
            $http.get(myUrlout).success(function(pubkey){
              Stripe.setPublishableKey(pubkey);
              Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            }).error(function(data, status){
              flightSrv.setOutRefNo("Sorry the booking failed");
              $http.get(myUrlin).success(function(pubkey){
              Stripe.setPublishableKey(pubkey);
              Stripe.card.createToken($scope.cardInfo, stripeResponseHandler2);
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
              }).error(function(data, status){
              flightSrv.setInRefNo("Sorry the booking failed");
              verifying = false;
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
              $location.url('/complete');
              });
            });
          }  
        }
     }
  	

     
     
  };

  function stripeResponseHandler(status, response) 
  {
    if(response.error) 
    { 
      $scope.verifying = false;
      console.log(response.error);
      //window.alert(response.error.message); 
    }
    else 
    { 
      token = response.id;
      if ($scope.diffAirlines)
        bookDiffAirlines(token);
      else
        Book(token);
    }
  };
  function stripeResponseHandler2(status, response) 
  {
    if(response.error) 
    { 
      $scope.verifying = false;
      console.log(response.error);
      //window.alert(response.error.message); 
    }
    else 
    { 
      token = response.id;
      $scope.paymentDetails2 = {};
      $scope.paymentDetails2.passengerDetails = [];
      $scope.paymentDetails2.passengerDetails[0]=$scope.bookingData;
      $scope.paymentDetails2.outgoingFlightId = flightSrv.getIngoingFlight().flightId;
      $scope.paymentDetails2.class = flightSrv.getClass();
      $scope.paymentDetails2.cost = flightSrv.getIngoingFlight().cost;
      $scope.paymentDetails2.paymentToken = token;
      flightSrv.createPayment($scope.paymentDetails2,IPin,function(data){
        if (data.refNum)
        {
          flightSrv.setInRefNo(data.refNum);
        }
        else
        {
          flightSrv.setInRefNo("Sorry Payment Failed");
        }
        verifying = false;
        Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
        $location.url('/complete');
      });
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
        if(flightSrv.getType() === 'Round')
        {
           $scope.paymentDetails.returnFlightId = flightSrv.getIngoingFlight().flightId;
           $scope.paymentDetails.cost += flightSrv.getIngoingFlight().cost;
        }
        flightSrv.createPayment($scope.paymentDetails,IP,function (data)
        {
            $scope.bookingData = {};
            $scope.paymentDetails = {};
            $scope.refNo = data;
            if(flightSrv.getType() === "OneWay")
            {
                if (data.refNum)
                {
                  flightSrv.setOutRefNo(data.refNum);
                  flightSrv.setInRefNo("-");
                }
                else
                {
                  flightSrv.setOutRefNo("Sorry the booking failed");
                  flightSrv.setInRefNo("-");
                }
            }
            else
            {
              if (data.refNum)
                {
                  flightSrv.setOutRefNo(data.refNum);
                  flightSrv.setInRefNo(data.refNum);
                }
                else
                {
                  flightSrv.setOutRefNo("Sorry the booking failed");
                  flightSrv.setInRefNo("Sorry the booking failed");
                }
                
                
            }
            verifying = false;
            Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            $location.url('/complete');
        }); 
        
};
function bookDiffAirlines(token)
{
    $scope.paymentDetails = {};
    $scope.paymentDetails.passengerDetails = [];
    $scope.paymentDetails.passengerDetails[0]=$scope.bookingData;
    $scope.paymentDetails.outgoingFlightId = flightSrv.getOutgoingFlight().flightId;
    $scope.paymentDetails.class = flightSrv.getClass();
    $scope.paymentDetails.cost = flightSrv.getOutgoingFlight().cost;
    $scope.paymentDetails.paymentToken = token;
    flightSrv.createPayment($scope.paymentDetails,IPout,function(data){
      if (data.refNum)
      {
        flightSrv.setOutRefNo(data.refNum);
      }
      else
      {
        flightSrv.setOutRefNo("Sorry Payment Failed");
      }
      $http.get(myUrlin).success(function(pubkey){
              Stripe.setPublishableKey(pubkey);
              Stripe.card.createToken($scope.cardInfo, stripeResponseHandler2);
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            }).error(function(data, status){
              flightSrv.setInRefNo("Sorry the booking failed");
              verifying = false;
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
              $location.url('/complete');
            });
    });
};
});


