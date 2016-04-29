// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
App=angular.module('starter', ['ionic', 'starter.controllers']);

App.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

App.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.oneWayBooking', {
    url: '/oneWayBooking',
    views: {
      'menuContent': {
        templateUrl: 'templates/oneWayBooking.html'
        /*controller: 'flightBookingCtrl'*/
      }
    }
  })
  .state('app.roundTripBooking', {
    url: '/roundTripBooking',
    views: {
      'menuContent': {
        templateUrl: 'templates/roundTripBooking.html'
      }
    }
  })
  .state('app.contactUs', {
    url: '/contactUs',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactUs.html'

      }
    }
  })
  .state('app.ourteam', {
    url: '/ourteam',
    views: {
      'menuContent': {
        templateUrl: 'templates/ourteam.html'
      }
    }
  })
  

  .state('app.searchByRefrence', {
      url: '/searchByRefrence',
      views: {
        'menuContent': {
          templateUrl: 'templates/searchByRefrence.html'
        }
      }
    })
    /*.state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })*/
    .state('app.welcomePage', {
    url: '/welcomePage',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcomePage.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcomePage');
});
