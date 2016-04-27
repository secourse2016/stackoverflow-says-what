angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later

  // Triggered in the login modal to close it

  // Open the login modal

  // Perform the login action when the user submits the login form
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Loay', id: 1 },
    { title: 'Mariam ', id: 2 },
    { title: 'Esraa', id: 3 },
    { title: 'Rana', id: 4 },
    { title: 'Nourhan', id: 5 },
    { title: 'Rania :P', id: 6 }
  ];
})
// .controller('SearchCtrl', function($scope) {
//  function searchByRefrence() {
                                                     
        
//      });
 


// })

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
