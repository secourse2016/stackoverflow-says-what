App = angular.module('SE-Project',['ui.bootstrap', 'ngRoute']);
App.config(function($routeProvider) {
    $routeProvider
    	
        // route for the home page
        .when('/', {
            templateUrl : '/partials/main.html',
            controller  : 'mainCtrl'
        })
        .when('/one-way', {
            templateUrl : '/partials/one-way.html',
            controller  : 'mainCtrl'                //to be changed
        })
        .when('/confirmationR', {
            templateUrl : '/partials/confirmationRoundTrip.html',
            controller : 'confirmRCtrl'
        })
        .when('/confirmationO', {
            templateUrl : '/partials/confirmationOneWay.html',
            controller : 'confirmOCtrl'
        })
        .otherwise({ 
      redirectTo: '/' 
    });
});