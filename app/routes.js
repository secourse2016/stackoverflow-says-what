module.exports = function(app,mongo) {
     var jwt     = require('jsonwebtoken');
    var path    = require('path');
    app.get('/api/data/inflights', function(rep, res){
    	var flights = require('../inFlights.json');
        // console.log(flights);
    	res.json(flights);
    });

    app.get('/api/data/outflights', function(rep, res){
        var flights = require('../outFlights.json');
        // console.log(flights);
        res.json(flights);
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
    
     app.use(function(req, res, next) {
       try 
      {
         console.log("done");
      var token = req.body.wt||req.query.wt||req.headers['x-access-token'];   
       console.log("done");
      var jwtSecret = process.env.JWTSECRET;
          console.log(req.body);
        var payload = jwt.verify(token, jwtSecret);
             console.log("done2");
             console.log(req.query);
        req.payload = payload;
        console.log("done");
        next();
      } 
      catch (err) 
      {
        console.error('[ERROR]: JWT Error reason:', err);
        res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
      }

    });

    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });


   


    app.get('/test', function(req, res){
      res.json({message:"success"});
    });

};
