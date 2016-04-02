
App.controller('flightCtrl', function($scope,flightSrv,$location) {
	$scope.flights = [
		{"continent": "1",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium"},
        {"continent": "2",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium"},
        {"continent": "3",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium"}];
        function reservebusiness(flight){
        	flightSrv.setFlight(flight);
        		flightSrv.setPrice(flight);
        			flightSrv.setClass("business");
          	console.log('hey');
          	$location.path("../partials/payment.html");
          
        };
          reserveeconomyA =function(flight){
        	flightSrv.setFlight(flight);
        		flightSrv.setPrice(flight);
        			flightSrv.setClass("economyA");
           $location.path("../partials/payment.html");
        };
          reserveeconomyB =function(flight){
        	flightSrv.setFlight(flight);
        		flightSrv.setPrice(flight);
        			flightSrv.setClass("economyBz");
           $location.path("../partials/payment.html");
        };
  
});