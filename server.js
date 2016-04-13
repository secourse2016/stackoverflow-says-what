var app     = require('./app/app');
var db      = require('./db.js');



db.connect(function(){

	app.listen('3000', function(){
    console.log('[OK] => HTTP Server listening on http://localhost:3000');
    });

});








