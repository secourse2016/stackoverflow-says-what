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
        .when('/outGoingFlights',{
            templateUrl : '/partials/outGoingFlights.html',
            controller : 'flightCtrl'
        }) 
	    .when('/payment', {
            templateUrl : '/partials/payment.html',
            controller  : 'paymentCtrl'                
        })
        .when('/inGoingFlights',{
            templateUrl : '/partials/inGoingFlights.html',
            controller : 'flightCtrl'
        })
          .when('/complete', {
            templateUrl : '/partials/finalPage.html',
            controller  : 'mainCtrl'                //to be changed
        })

        .when('/myCarousel',{
            templateUrl : '/partials/main.html',
            controller  : 'mainCtrl'            
        })
        .when('/team',{
            templateUrl : '/partials/team.html',
            controller  : 'mainCtrl'            
        })
        .when('/confirmationR', {
            templateUrl : '/partials/confirmationRoundTrip.html',
            controller : 'confirmRCtrl'
        })
        .when('/confirmationO', {
            templateUrl : '/partials/confirmationOneWay.html',
            controller : 'confirmOCtrl'
        })
        .when('/contactUs', {
            templateUrl : '/partials/contactUs.html',
            controller : 'mainCtrl'
        })
        .when('/thankYou', {
            templateUrl : '/partials/thankYou.html',
            controller : 'mainCtrl'
        })
        .when('/searchPage', {
            templateUrl : '/partials/searchPage.html',
            controller : 'mainCtrl'
        })
        .when('/bookingDetails', {
            templateUrl : '/partials/bookingDetails.html',
            controller : 'mainCtrl'
        })
       /* .when('/', {
            templateUrl : '/partials/403.html',
            controller : 'mainCtrl'
        })*/
        .otherwise({ 
          templateUrl : '/partials/404.html' ,
          controller  : 'mainCtrl'   
        });
});
