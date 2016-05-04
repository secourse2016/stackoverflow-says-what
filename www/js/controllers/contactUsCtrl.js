IonicApp.controller('contactUsCtrl', function($scope, FlightSrv,$state, $http) {
  $scope.info = {};
  $scope.info.fn = null;
  $scope.info.fnAlert = false;
  $scope.info.ln = null;
  $scope.info.lnAlert = false;
  $scope.info.email = null;
  $scope.info.emailAlert = false;
  $scope.info.comment = null;
  $scope.info.commentAlert = false;

  $scope.contactSubmit = function() {
    if($scope.info.fn == null || $scope.info.fn == "")
      $scope.info.fnAlert = true;
    else
      $scope.info.fnAlert = false;

    if($scope.info.ln == null || $scope.info.ln == "")
      $scope.info.lnAlert = true;
    else
      $scope.info.lnAlert = false;
    
    if($scope.info.email == null || $scope.info.email == "")
      $scope.info.emailAlert = true;
    else
      $scope.info.emailAlert = false;
    
    if($scope.info.comment == null || $scope.info.comment == "")
      $scope.info.commentAlert = true;
    else
      $scope.info.commentAlert = false;

    if($scope.info.fn != null && $scope.info.ln != null &&
      $scope.info.email != null && $scope.info.comment != null){ 
            
       $state.go('app.thankYou');
    }
  };
   $scope.homePage = function() {    
       $state.go('app.welcomePage');
  };
 });