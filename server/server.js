process.stdin.resume();//so the program will not close instantly

// do app specific cleaning before exiting
process.on('exit', function () {
	console.log('Exiting...');
});

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
	console.log('Ctrl-C...');
	process.exit(2);
});

//catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', function(e) {
	console.log('Uncaught Exception...');
	console.log(e.stack);
	process.exit(99);
});

var npid = require('npid');

try {
    var pid = npid.create('ble.pid');
    pid.removeOnExit();
} catch (err) {
    console.log(err);
    process.exit(1);
}

///////////////////////

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var fs = require('fs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/ping', function(req, res){
	res.end("Ping!");
});

app.post('/data', function(req, res) {
	console.dir(req.body);

	res.setHeader('Content-Type', 'text/plain')
	res.write('you posted:\n')
	res.end(JSON.stringify(req.body, null, 2))
});

var server = app.listen(8080, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("Listening at http://%s:%s", host, port);
});
