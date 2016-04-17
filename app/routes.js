module.exports = function(app,mongo) {
     var jwt     = require('jsonwebtoken');
    var express = require('express');
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
    
    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });
    app.use(function(req, res, next) {
       try 
      {
         console.log("done");
 
      var token = req.body.wt||req.query.wt||req.headers['x-access-token'];   
       console.log("done");
      var jwtSecret = process.env.JWTSECRET;
     
        var payload = jwt.verify(token, jwtSecret);
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

};
