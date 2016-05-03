IonicApp.controller('welcomePageCtrl', function($scope,$state, FlightSrv){

$scope.oneWay = function()
{
	$state.go("app.oneWayBooking");
};

$scope.roundTrip = function()
{
	$state.go("app.roundTripBooking");
};

$scope.searchRef = function()
{
	$state.go("app.searchByRefrence");
};

$scope.contactUs = function()
{
	$state.go("app.contactUs");  //todo
};

});