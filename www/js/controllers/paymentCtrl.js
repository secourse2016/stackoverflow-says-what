 IonicApp.controller('paymentCtrl', function($scope,$state,FlightSrv, $http) {
 	$scope.bookingData = {};
 	$scope.val = {};

  //input validation checks
  $scope.firstNameAlert=false;
  $scope.lastNameAlert=false;
  $scope.genderAlert=false;
  $scope.dobAlert=false;
  $scope.nationalityAlert=false;
  $scope.emailAlert=false;
  $scope.mobileAlert=false;
  $scope.passportNumAlert=false;
  $scope.passportExpAlert=false;
  $scope.cardAlert=false;
  $scope.cvcAlert=false;
  $scope.monthAlert=false;
  $scope.yearAlert=false;

	$scope.val.cardCheck = true;
	$scope.val.cvcCheck = true;
	$scope.val.dateCheck = true;
	$scope.val.verifying = false;

	var token = null;
	var IP = "";
  var IPout = "";
  var IPin = "";
  var myUrlin = "";
	$scope.stripeCallback = function (code, result) {
   
    var wt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWNvdXJzZSIsImlhdCI6MTQ2MDg0NzM0NywiZXhwIjoxNDkyMzgzMzUwLCJhdWQiOiJ3d3cuc2Vjb3Vyc2UuY29tIiwic3ViIjoidGVzdCJ9.nG7cFcHmCeMW03YwPS69a9LBRGimweIPBi7wIwxGmIs#/';

    if (($scope.bookingData.firstName != null && $scope.bookingData.firstName != "")
    && ($scope.bookingData.lastName != null && $scope.bookingData.lastName != "")
    && ($scope.bookingData.passportNum != null && $scope.bookingData.passportNum != "")
    && ($scope.bookingData.gender != null && $scope.bookingData.gender != "")
    && ($scope.bookingData.email != null && $scope.bookingData.email != "")
    && ($scope.bookingData.passportExpiryDate != null && $scope.bookingData.passportExpiryDate != "")
    && ($scope.bookingData.dateOfBirth != null && $scope.bookingData.dateOfBirth != "")
    && ($scope.bookingData.nationality != null && $scope.bookingData.nationality != "")
    && ($scope.bookingData.mobile != null && $scope.bookingData.mobile != "")
    && ($scope.bookingData.number != null && $scope.bookingData.number != "")
    && ($scope.bookingData.cvc != null && $scope.bookingData.cvc != "")
    && ($scope.bookingData.expiryYear != null && $scope.bookingData.expiryYear != "")
    && ($scope.bookingData.expiryMonth != null && $scope.bookingData.expiryMonth != ""))
    {  console.log("fel if");

        IP = FlightSrv.getOutgoingFlight().IP;
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
        $scope.diffAirlines = false;
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
          console.log('round trip');
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
            console.log('round trip');
            IPout = FlightSrv.getOutgoingFlight().IP;
            if (!IPout)
              IPout = "http://54.93.36.94/";
            var myUrlout = IPout;
            myUrlout = myUrlout.concat('/stripe/pubkey?wt=').concat(wt); 
            IPin = FlightSrv.getIngoingFlight().IP;
            if (!IPin)
              IPin = "http://54.93.36.94/";
            myUrlin = IPin;
            myUrlin = myUrlin.concat('/stripe/pubkey?wt=').concat(wt);
            $scope.diffAirlines = true;
            $http.get(myUrlout).success(function(pubkey){
              Stripe.setPublishableKey(pubkey);
              Stripe.card.createToken($scope.cardInfo, stripeResponseHandler);
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            });
          }  
        }
      }
      else
      {
        console.log("fel else");
        if($scope.bookingData.firstName == null || $scope.bookingData.firstName == "")
          $scope.firstNameAlert=true;

        if($scope.bookingData.lastName == null || $scope.bookingData.lastName == "")
          $scope.lastNameAlert=true;

        if($scope.bookingData.passportNum == null || $scope.bookingData.passportNum == "")
            $scope.passportNumAlert=true;

        if($scope.bookingData.gender == null || $scope.bookingData.gender == "") 
           $scope.genderAlert=true;

        if($scope.bookingData.email == null || $scope.bookingData.email == "")
          $scope.emailAlert=true;

        if($scope.bookingData.passportExpiryDate == null || $scope.bookingData.passportExpiryDate == "")
          $scope.passportExpAlert=true;

        if($scope.bookingData.dateOfBirth == null || $scope.bookingData.dateOfBirth == "")
          $scope.dobAlert=true;

        if($scope.bookingData.nationality == null || $scope.bookingData.nationality == "")
          $scope.nationalityAlert=true;

        if($scope.bookingData.mobile == null || $scope.bookingData.mobile == "")
          $scope.mobileAlert=true;

        if($scope.bookingData.number == null || $scope.bookingData.number == "")
          $scope.cardAlert=true;

        if($scope.bookingData.cvc == null || $scope.bookingData.cvc == "")
          $scope.cvcAlert=true;

        if($scope.bookingData.expiryYear == null || $scope.bookingData.expiryYear == "")
          $scope.yearAlert=true;

        if($scope.bookingData.expiryMonth == null || $scope.bookingData.expiryMonth == "")
            $scope.monthAlert=true;
      }

    };

  function stripeResponseHandler(status, response) 
  {
    if(response.error) 
    { 
      $scope.verifying = false;
      $scope.val.verifying = false;

    }
    else 
    { 
      token = response.id;
      console.log(token);
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
      $scope.paymentDetails2.outgoingFlightId = FlightSrv.getIngoingFlight().flightId;
      $scope.paymentDetails2.class = FlightSrv.getClass();
      $scope.paymentDetails2.cost = FlightSrv.getIngoingFlight().cost;
      $scope.paymentDetails2.paymentToken = token;
      console.log($scope.paymentDetails2);
      FlightSrv.createPayment($scope.paymentDetails2,IPin,function(data){
        if (data.refNum)
        {
          console.log("7amada");
          FlightSrv.setInRefNo(data.refNum);
        }
        else
        {
          console.log("7amada");
          FlightSrv.setInRefNo("Sorry Payment Failed");
        }
        verifying = false;
        Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
        $state.go('app.finalBookingPage');
      });
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
        console.log('Hello');
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
        verifying = false;
        Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
        $state.go('app.finalBookingPage');
        }); 
  };


function bookDiffAirlines(token)
{
    console.log('Booking Diff Airlines');
    $scope.paymentDetails = {};
    $scope.paymentDetails.passengerDetails = [];
    $scope.paymentDetails.passengerDetails[0]=$scope.bookingData;
    $scope.paymentDetails.outgoingFlightId = FlightSrv.getOutgoingFlight().flightId;
    $scope.paymentDetails.class = FlightSrv.getClass();
    $scope.paymentDetails.cost = FlightSrv.getOutgoingFlight().cost;
    $scope.paymentDetails.paymentToken = token;
    console.log($scope.paymentDetails);
    FlightSrv.createPayment($scope.paymentDetails,IPout,function(data){
      if (data.refNum)
      {
        console.log("7amada");
        FlightSrv.setOutRefNo(data.refNum);
      }
      else
      {
        console.log("7amada");
        FlightSrv.setOutRefNo("Sorry Payment Failed");
      }
      $http.get(myUrlin).success(function(pubkey){
              Stripe.setPublishableKey(pubkey);
              Stripe.card.createToken($scope.cardInfo, stripeResponseHandler2);
              Stripe.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
            });
    });
 };

});