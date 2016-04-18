module.exports = function(app,mongo) {
    var jwt     = require('jsonwebtoken');
    var path    = require('path');
    var flights=require('./flights.js');
    var db=require('./db.js');

    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });


    app.get('/api/data/inflights', function(rep, res){
    	var flights = require('../flights.json');
    	res.json(flights);
    });

    app.get('/api/data/outflights', function(rep, res){
        var flights = require('../flights.json');
        res.json(flights);
    });

    app.get('/api/data/airports', function(rep, res){
    	var airports = require('../airports.json');
    	res.json(airports);
    });

    app.get('/api/data/aircrafts', function(req, res){
    	var aircrafts = require('../aircrafts.json');
    	res.json(aircrafts);
    });

    app.get('/api/data/bookings', function(req, res){
    	var bookings = require('../bookings.json');
    	res.json(bookings);
    });

    app.post('/api/pay', function(req, res){
        // var bookingDetails = req.body;
        // console.log(req);
        var type = req.body.type;
        var outFlight = req.body.outFlightNo;
        var myClass = req.body.myClass;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var passport_no = req.body.passport_no;
        var bookingData = {
            "firstName" : firstName,
            "lastName" : lastName,
            "email" : email, 
            "passport_no" : passport_no
        };
        // console.log(bookingData);
        if(type === 'OneWay'){
            flights.bookOneWay(outFlight, myClass, bookingData, function(err, bookedDetails){
                console.log(bookedDetails);
                res.json(bookedDetails);
            });
        }else{
            var inFlight = req.body.inFlightNo;
            flights.bookOneWay(outFlight, myClass, bookingData, function(err, outBookedDetails){
                // res.json(outBookedDetails);

                flights.bookOneWay(inFlight, myClass, bookingData, function(err, inBookedDetails){
                    // res.json(inBookedDetails);
                    // var result = {
                    //     "outDetails" : outBookedDetails,
                    //     "inDetails" : inBookedDetails
                    // }
                    // console.log(result);
                    console.log(outBookedDetails);
                    console.log(inBookedDetails);
                    res.json(/*result*/{
                        "outDetails" : outBookedDetails,
                        "inDetails" : inBookedDetails
                    });
                });

            });
        }
    });

    /* SEED DB */
    app.get('/db/seed', function(req, res) {


        flights.seedDB(function(){                 
             db.db().collection('flights').count(function(err,count){     //testing seed
                console.log(count);
    
             });
        });

    });

    /* DELETE DB */
    app.get('/db/delete', function(req, res) {

        db.clearDB(function(){    

            db.db().collection('flights').count(function(err,count){     //testing delete

                console.log(count);                                      //  (new) make sure if it should be dropped instead
    
             });              
                   
        });

    }); 
    app.get('/api/bookings/search/:refNo', function(req, res){

        flights.getBooking(function(err,result){             //new
            res.send(result);

        },req.params.refNo);

    });
    app.use(function(req, res, next) {
       try 
      {
       
      var token = req.body.wt||req.query.wt||req.headers['x-access-token'];   

      var jwtSecret = process.env.JWTSECRET;
        var payload = jwt.verify(token, jwtSecret);
     
             console.log(req.query);
        req.payload = payload;

        next();
      } 
      catch (err) 
      {
        console.error('[ERROR]: JWT Error reason:', err);
        res.status(403).sendFile(path.join(__dirname, '../public/partials', '403.html'));
      }
    });
    app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res){

        

        flights.getOneWayFlightFromDB(function(err,result){             //new

            res.send(result);

        },req.params.origin,req.params.destination,req.params.departingDate,req.params.class);

    });
    app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res){
        flights.getRoundTripFlightFromDB(function(err,result){             //new

            res.send(result);

        },req.params.origin,req.params.destination,req.params.departingDate,req.params.returningDate,req.params.class);

    });
    


    app.get('/test', function(req, res){
      res.json({message:"success"});

    });

};
