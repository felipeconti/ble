var noble = require('noble');
var querystring = require('querystring');
var http = require('http');

// var UUIDs = {
// 	"80e650e44644": "appleTv",
// 	"cfb22ab0f82c": "chargerHR",
// 	"604cdc67a4c7": "fingerTip",
// 	"b4994c73dde8": "beacon"
// };

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStop', function(){});

noble.on('discover', function(peripheral){
	// console.log("Achou o " + peripheral.advertisement.localName + " " + peripheral.uuid + "(RSSI: " + peripheral.rssi + ")");
	sendBeacon(peripheral);
});

var sendBeacon = function(data){

	// var data = querystring.stringify({
	// 	username: user,
	// 	password: pass
	// });

	var options = {
	    host: 'ble.felipeconti.com.br',
	    port: 80,
	    path: '/data',
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	        'Content-Length': Buffer.byteLength(data)
	    }
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log("body: " + chunk);
		});
	});

	req.write(data);
	req.end();

};