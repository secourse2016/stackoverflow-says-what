module.exports = function(app,mongo) {
    var jwt     = require('jsonwebtoken');
    var path    = require('path');
    var flights=require('./flights.js');
    var db=require('./db.js');
    var http = require('http');
    var moment = require('moment');
    const urls = require('../urls.json');    
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });


    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });
    app.get('/api/data/generatingToken', function(rep, res){
      var claims = {
            sub: 'user9876',
            iss: 'https://secourse.com',
            permissions: 'view-flights'
        }
        var token = jwt.sign(claims,process.env.JWTSECRET, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
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

        flights.getBooking(function(err,result){ 
            res.send(result);

        },req.params.refNo);

    });
    app.get('/api/flights/searchAll/:origin/:destination/:departingDate/:class/:seats', function(req, res)
    {
        //var lowerLimit = moment(req.params.departingDate,['x','YYYY-MM-DD']).format('YYYY-MM-DDTHH:mm:ss');
        var d = moment(req.params.departingDate,['x','YYYY-MM-DD']).format('YYYY-MM-DDTHH:mm:ss');
        var newDate = moment(d).toDate().getTime();
        const async = require('async');
        const request = require('request');
        var myPath = "/api/flights/search/";
        myPath = myPath.concat(req.params.origin);
        myPath = myPath.concat('/');
        myPath = myPath.concat(req.params.destination);
        myPath = myPath.concat('/');
        myPath = myPath.concat(newDate);
        myPath = myPath.concat('/');
        myPath = myPath.concat(req.params.class);
        myPath = myPath.concat('/');
        myPath = myPath.concat(req.params.seats);
        myPath = myPath.concat('?wt=');
        myPath = myPath.concat(req.query.wt);
        var resultArr=[];
        function httpGet(url, callback) {
          const options = {
            url :  url+myPath,
            json : true,
            timeout : 1000
          };
          request(options,
            function(err1, res1, body) {
              if (err1)
                callback(null,null);
              else       
                callback(err1, body);
            }
          );
        }

        var arr = [];
        async.map(urls, httpGet, function (err2, res2){
          if (err2) return console.log(err2);

          for (i = 0; i < res2.length; i++)
          {
            if (res2[i])
                if (res2[i].outgoingFlights != undefined)
                    resultArr = resultArr.concat(res2[i].outgoingFlights);
          }
          result={};
          result.outgoingFlights=resultArr;
          res.send(result);

        })
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
    app.post('/booking', function(req, res){
        var type;
        if (req.body.returnFlightId)
            type = 'Round';
        else
            type = 'OneWay';
/*        var outFlight = req.body.outFlightNo;
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
        // console.log(bookingData);*/
        if(type === 'OneWay'){
            flights.bookOneWay(req.body, function(err, bookedDetails){
                console.log(bookedDetails);
                res.json(bookedDetails);
            });
        }else{
            var inFlight = req.body.inFlightNo;
            flights.bookOneWay(outFlight, myClass, bookingData, function(err, outBookedDetails){
                flights.bookOneWay(inFlight, myClass, bookingData, function(err, inBookedDetails){
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
    app.get('/api/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req, res)
    {
        flights.getOneWayFlightFromDB(function(err,result)
        {     
                //new
            res.send(result);
        },req.params.origin,req.params.destination,req.params.departingDate,req.params.class,req.params.seats);

    });
    app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res)
    {
        flights.getRoundTripFlightFromDB(function(err,result)
        {             //new
            res.send(result);
        },req.params.origin,req.params.destination,req.params.departingDate,req.params.returningDate,req.params.class,req.params.seats);

    });

    


    app.get('/test', function(req, res){
      res.json({message:"success"});

    });

};
