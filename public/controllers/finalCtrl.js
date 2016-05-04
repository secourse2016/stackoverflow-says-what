App.controller('finalCtrl', function($scope,flightSrv,$location) {

$scope.inRefNo = flightSrv.getInRefNo();
$scope.outRefNo = flightSrv.getOutRefNo();

$scope.viewAlert = false;
$scope.viewRef = function() {
	$scope.inRefNo = flightSrv.getInRefNo();
    $scope.outRefNo = flightSrv.getOutRefNo();
    $scope.outAirline = flightSrv.getOutgoingFlight().Airline;
    $scope.outIP = flightSrv.getOutgoingFlight().IP;
    $scope.inAirline = "";
    $scope.inIP = "";
    if (flightSrv.getType() === 'Round')
    {
    	$scope.inAirline = flightSrv.getIngoingFlight().Airline;
    	$scope.inIP = flightSrv.getIngoingFlight().IP;
    	if (!$scope.inIP)
    		$scope.inIP = "http://54.93.36.94";
    }
    if (!$scope.outIP)
    	$scope.outIP = "http://54.93.36.94"
    console.log($scope.outAirline);
    console.log($scope.outIP);
    console.log($scope.inAirline);
    console.log($scope.inIP);
    $scope.viewAlert = true;
};

$scope.homePage = function() {
    $location.url('/');
};

});