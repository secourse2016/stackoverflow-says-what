IonicApp.controller('finalBookingPageCtrl', function($scope, $state, FlightSrv){

$scope.inRefNo = FlightSrv.getInRefNo();
$scope.outRefNo = FlightSrv.getOutRefNo();

$scope.home = function()
{
	$state.go('app.welcomePage')
};

});