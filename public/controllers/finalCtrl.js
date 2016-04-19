App.controller('finalCtrl', function($scope,flightSrv,$location) {

$scope.inRefNo = flightSrv.getInRefNo();
$scope.outRefNo = flightSrv.getOutRefNo();

$scope.viewAlert = false;
$scope.viewRef = function() {
	$scope.inRefNo = flightSrv.getInRefNo();
    $scope.outRefNo = flightSrv.getOutRefNo();
    $scope.viewAlert = true;
};

$scope.homePage = function() {
    $location.url('/');
};

});