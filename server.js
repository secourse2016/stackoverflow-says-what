var app     = require('./app/app');
var db      = require('./app/db.js');
var flights = require('./app/flights.js');

db.connect(function(){

    flights.seedDb(function(err,seeded)
    {
    	app.listen('3000', function(){
           console.log('[OK] => HTTP Server listening on http://localhost:3000');
        });
    });
});










