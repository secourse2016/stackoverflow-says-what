module.exports = function(app,mongo) {

    var flights=require('./flights.js');
    var db=require('./db.js');

    
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
        if(type === 'OneWay'){
            flights.bookOneWay(outFlight, myClass, bookingData, function(err, bookedDetails){
                res.json(bookedDetails);
            });
        }else{
            var inFlight = req.body.inFlightNo;
            flights.bookOneWay(outFlight, myClass, bookingData, function(err, outBookedDetails){
                // res.json(outBookedDetails);

                flights.bookOneWay(inFlight, myClass, bookingData, function(err, inBookedDetails){
                    res.json(inBookedDetails);
                    var result = {
                        "outDetails" : outBookedDetails;
                        "inDetails" : inBookedDetails; 
                    }
                    res.json(result);
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
    
    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });


    // app.use(function(req, res, next) {
    // try 
    //   {
    //   var token = req.body.wt || req.query.wt || req.headers['x-access-token'];   
    //   var jwtSecret = process.env.JWTSECRET;
    //           var payload = jwt.verify(token, jwtSecret);
    //     req.payload = payload;
    //     next();
    //   } 
    //   catch (err) 
    //   {
    //     console.error('[ERROR]: JWT Error reason:', err);
    //     res.status(403).sendFile(path.join(__dirname, '../public', '404.html'));
    //   }

    // });

};
