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

        .when('/flightBooking', {
            templateUrl : '/partials/flightBooking.html',
            controller  : 'mainCtrl'           
        })     //to be changed
	    .when('/payment', {
            templateUrl : '/partials/payment.html',
            //controller  : 'paymentCtrl'                //to be changed
        })
        .when('/outGoingFlights',{
            templateUrl : '/partials/outGoingFlights.html',
            controller : 'flightCtrl'
        })
        .otherwise({ 
          redirectTo: '/' 
        });
});
