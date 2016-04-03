
App.controller('flightCtrl', function($scope,flightSrv,$location) {
	$scope.flights = [
		{"continent": "1",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium" ,
        "price1": 10000,
        "price2": 100,
        "price3": 10},
        {"continent": "2",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium",
        "price1": 1000,
        "price2": 200,
        "price3": 60
    },
        {"continent": "3",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium",
         "price1": 3000,
        "price2": 210,
        "price3": 101}];
       $scope.reservebusiness= function (flight){
        	flightSrv.setFlight(flight);
        		flightSrv.setPrice(flight);
        			flightSrv.setClass("business");
          	console.log('hey');
          	$location.url("/payment.html");
          
        };
          $scope.reserveeconomyA =function(flight){
        	flightSrv.setFlight(flight);
        		flightSrv.setPrice(flight);
        			flightSrv.setClass("economyA");
           $location.url("/payment.html");
        };
          $scope.reserveeconomyB =function(flight){
        	flightSrv.setFlight(flight);
        		flightSrv.setPrice(flight);
        			flightSrv.setClass("economyBz");
           $location.url("payment.html");
    };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
  

});