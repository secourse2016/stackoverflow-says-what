IonicApp.controller('thankYouCtrl', function($scope, FlightSrv,$state) {


 $scope.home = function()
 {
   $state.go('app.welcomePage');
 };



});
