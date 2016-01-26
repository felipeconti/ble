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
var fs = require('fs');

app.get('/ping', function(req, res){
	res.end("Ping!");
});

app.get("/access" , function(req, res){
	fs.readFile("/var/log/nginx/ble.access.log", "utf8", function(err, data){
		res.end(data);
	});
});

app.get("/error" , function(req, res){
        fs.readFile("/var/log/nginx/ble.error.log", "utf8", function(err, data){
                res.end(data);
        });
});

var server = app.listen(8080, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("Listening at http://%s:%s", host, port);
});
