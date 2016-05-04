IonicApp.controller('finalBookingPageCtrl', function($scope, $state, FlightSrv,$ionicModal){

$scope.inRefNo = FlightSrv.getInRefNo();
$scope.outRefNo = FlightSrv.getOutRefNo();

/*$scope.inRefNo = "batates";
$scope.outRefNo = "potato";*/

 $scope.showModal = function(animation) {
    /*console.log(animation);*/
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'animated ' + animation,
      hideDelay:920
    }).then(function(modal) {
      $scope.inRefNo = FlightSrv.getInRefNo();
      $scope.outRefNo = FlightSrv.getOutRefNo();
      $scope.modal = modal;
      $scope.modal.show();
      $scope.hideModal = function(){
        $scope.modal.hide();
        // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
        // It is important to remove the modal to avoid memory leaks
        $scope.modal.remove();
      }
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };


 $scope.home = function()
 {
	$state.go('app.welcomePage')
 };

});