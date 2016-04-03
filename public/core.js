App = angular.module('SE-Project',['ui.bootstrap', 'ngRoute']);
App.config(function($routeProvider) {
    $routeProvider
    	
        // route for the home page
        .when('/', {
            templateUrl : '/partials/main.html',
            controller  : 'mainCtrl'
        })
        .when('/flightBooking', {
            templateUrl : '/partials/flightBooking.html',
            controller  : 'flightBookingCtrl'           
        })     
	    .when('/payment', {
            templateUrl : '/partials/payment.html',
            controller  : 'paymentCtrl'
        })
       
        .otherwise({ 
          redirectTo: '/'   
        });
});
