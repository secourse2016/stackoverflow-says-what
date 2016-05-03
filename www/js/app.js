

IonicApp = angular.module('starter', ['ionic','ui.router','ionic-datepicker','ionic-modal-select']);


IonicApp.run(function($ionicPlatform) {
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

IonicApp.config(function($stateProvider, $urlRouterProvider) {
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
        templateUrl: 'templates/oneWayBooking.html',
        controller: 'flightBookingCtrl'
      }
    }
  })
  .state('app.roundTripBooking', {
    url: '/roundTripBooking',
    views: {
      'menuContent': {
        templateUrl: 'templates/roundTripBooking.html',
        controller: 'flightBookingCtrl'
      }
    }
  })
  .state('app.outGoingFlights', {
    url: '/outGoingFlights',
    views: {
      'menuContent': {
        templateUrl: 'templates/outGoingFlights.html',
        controller: 'outGoingFlightsCtrl'
      }
    }
  })
  .state('app.inGoingFlights', {
    url: '/inGoingFlights',
    views: {
      'menuContent': {
        templateUrl: 'templates/inGoingFlights.html',
        controller: 'outGoingFlightsCtrl'
      }
    }
  })
  /*.state('app.contactUs', {
    url: '/contactUs',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactUs.html'

      }
    }
  })*/
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
          templateUrl: 'templates/searchByRefrence.html',
          controller: 'SearchCtrl'
        }
      }
    })
  .state('app.bookingInfo', {
      url: '/bookingInfo',
      views: {
        'menuContent': {
          templateUrl: 'templates/bookingInfo.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('app.welcomePage', {
    url: '/welcomePage',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcomePage.html',
        controller: 'welcomePageCtrl'
      }
    }
  })

    .state('app.confirmOneWay', {
      url : '/confirmOneWay',
      views : {
        'menuContent' : {
          templateUrl : 'templates/confirmOneWay.html',
          controller : 'confirmOneCtrl'
        }
      }
    })
    .state('app.confirmRoundTripDep', {
      url : '/confirmRoundTripDep',
      views : {
        'menuContent' : {
          templateUrl : 'templates/confirmRoundTripDep.html',
          controller : 'confirmRoundDepCtrl'
        }
      }
    })
    .state('app.confirmRoundArr', {
      url : '/confirmRoundArr',
      views : {
        'menuContent' : {
          templateUrl : 'templates/confirmRoundTripArr.html',
          controller : 'confirmRoundArrCtrl'
        }
      }
    })
    .state('app.paymentInfo', {
      url : '/paymentInfo',
      views : {
        'menuContent' : {
          templateUrl : '/templates/paymentInfo.html',

        }
      }
    })
    .state('app.finalBookingPage', {
      url : '/finalBookingPage',
      views : {
        'menuContent' : {
          templateUrl : 'templates/finalBookingPage.html',
          controller : 'finalBookingPageCtrl'
        }
      }
    });
 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcomePage');
});
