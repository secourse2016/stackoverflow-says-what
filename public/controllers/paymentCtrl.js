App.controller('paymentCtrl', function($scope,flightSrv,$location) {

$scope.fn = null;
$scope.ln = null;
$scope.gender = null;
$scope.email = null;
$scope.mobile = null;
$scope.passport = null;
$scope.credit = null;
$scope.pass = null;

$scope.Pay = function() {
	 if (($scope.fn == null || $scope.fn == "")
	 	|| ($scope.ln == null || $scope.ln == "")
	 	|| ($scope.gender == null || $scope.gender == "")
	 	|| ($scope.email == null || $scope.email == "")
	 	|| ($scope.mobile == null || $scope.mobile == "")
	 	|| ($scope.passport == null || $scope.passport == "")
	 	|| ($scope.credit == null || $scope.credit == "")
	 	|| ($scope.pass == null || $scope.pass == ""))
	 	 alert("Please fill out all fields");
	 else
	 {
    	 $location.url('/complete');
     }   
  };

});
