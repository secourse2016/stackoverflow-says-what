
App.controller('flightCtrl', function($scope,flightSrv,$location) {
    $scope.predicate = "date";
    $scope.reverse = "price1";
    $scope.upper_bound=10000;
    $scope.lower_bound=0;
    $scope.date = "";
    // $scope.outflights = flightSrv.getOutFlights();
    // $scope.inflights = flightSrv.getInFlights();
    function getInFlights(){
      flightSrv.getInFlights().success(function(flights){
        $scope.inflights = flights;
      });
    };

    function getOutFlights(){
      flightSrv.getOutFlights().success(function(flights){
        $scope.outflights = flights;
      });
    };
    // console.log(outflights);
//     $scope.outflights=
//     [
//     {
//   "flight_no": "SE2804",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-23T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :1000,
//      "price2"   :100,
//      "price3"   :80

// },
//  {
//   "flight_no": "SE2805",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-28T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :2000,
//      "price2"   :300,
//      "price3"   :90

// },
//  {
//   "flight_no": "SE2806",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-26T14:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :3000,
//      "price2"   :300,
//      "price3"   :30

// },
//  {
//   "flight_no": "SE2807",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-26T20:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }]
//               ,
//      "price1"  :3400,
//      "price2"   :300,
//      "price3"   :70

// },
//  {
//   "flight_no": "SE2808",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-06T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :1000,
//      "price2"   :200,
//      "price3"   :50

// }, {
//   "flight_no": "SE2809",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-04T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :3000,
//      "price2"   :200,
//      "price3"   :20

// }, {
//   "flight_no": "SE2810",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-30T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :1020,
//      "price2"   :230,
//      "price3"   :60

// }]  ;
// $scope.inflights=
//     [
//     {
//   "flight_no": "SE28099",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-23T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :1000,
//      "price2"   :100,
//      "price3"   :80

// },
//  {
//   "flight_no": "SE2805",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-28T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :2000,
//      "price2"   :300,
//      "price3"   :90

// },
//  {
//   "flight_no": "SE2806",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-26T14:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :3000,
//      "price2"   :300,
//      "price3"   :30

// },
//  {
//   "flight_no": "SE2807",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-26T20:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }]
//               ,
//      "price1"  :3400,
//      "price2"   :300,
//      "price3"   :70

// },
//  {
//   "flight_no": "SE2808",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-06T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :1000,
//      "price2"   :200,
//      "price3"   :50

// }, {
//   "flight_no": "SE2809",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-04T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :3000,
//      "price2"   :200,
//      "price3"   :20

// }, {
//   "flight_no": "SE2810",
//   "aircraft_model": "Airbus a318",
//   "origin": "IAD",
//   "destination": "JFK",
//     "capacity": "100",
//     "date": "2016-04-30T18:25:43.511Z",
//     "duration": 120,
//     "available_seats" : {
//     "seats_a" : 20,
//     "seats_b" : 32,
//     "seats_c" : 38 
//     },
//     "seatmap":  [{
//         "seat_no" : "A23", 
//               "class" : "A", 
//               "reservation_id" : "VIW23Jfwq8vi3x0ef9",
//               "cost" : 321,
//               "window" : true,
//               "cabin_no": "3"
//               }],
//      "price1"  :1020,
//      "price2"   :230,
//      "price3"   :60

// }]  ;
  $scope.bookOutgoing = function (flight,price,seatClass){
            flightSrv.setOutgoingFlight(flight);
            flightSrv.setPriceOutgoingFlight(price);
            flightSrv.setOutgoingFlightClass(seatClass);
            if (flightSrv.getType()==='OneWay')
              $location.url("/confirmationO");
            else
              $location.url("/inGoingFlights");
          };

  $scope.bookIngoing = function (flight,price,seatClass){
            flightSrv.setIngoingFlight(flight);
            flightSrv.setPriceIngoingFlight(price);
            flightSrv.setIngoingFlightClass(seatClass);
            $location.url("/confirmationR");
          };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

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
    $scope.byRange = function (flight) {
      return ($scope.lower_bound<=flight.price1&&$scope.upper_bound>=flight.price1)||($scope.lower_bound<=flight.price2&&$scope.upper_bound>=flight.price2)||($scope.lower_bound<=flight.price3&&$scope.upper_bound>=flight.price3);

  };

  getInFlights();
  getOutFlights();

});