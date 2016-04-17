App.controller('paymentCtrl', function($scope,flightSrv,$location) {
  
	$scope.Pay = function() {
    $location.url('/complete');
    
  };

});
