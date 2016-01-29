var noble = require('noble');
var http = require('http');
var os = require("os");

var discovereds = [];

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

	discovereds.push({
		date: Date.now(),
		id: peripheral.id,
		uuid: peripheral.uuid,
		address: peripheral.address,
		name: peripheral.advertisement.localName,
		txPowerLevel: peripheral.advertisement.txPowerLevel,
		rssi: peripheral.rssi,
		state: peripheral.state
	});

	// console.log("Achou o " + peripheral.advertisement.localName + " " + peripheral.uuid + "(RSSI: " + peripheral.rssi + ")");
});

var sendBeacon = function(data){

	var user = os.hostname();
	var pass = 'rpi';

	var options = {
	    host: 'ble.felipeconti.com.br',
	    port: 80,
	    path: '/data',
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	        'Content-Length': Buffer.byteLength(data),
	        Authorization: 'Basic ' + new Buffer(user+':'+pass).toString('base64')
	    }
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log("body: " + chunk);
		});
	});

	req.on('error', function(err) {
		console.warn('Unable to send data to ' + options.host + ':' + options.port);
		console.warn('Data was saved, will send again soon...');

		data = JSON.parse(data);
		for (var id in data)
			discovereds.push(data[id]);
	});

	req.write(data);
	req.end();
};

setInterval(function() {
	var data = [];
	for (var id in discovereds) {
		data.push(discovereds[id]);
		delete discovereds[id];
	};

	if (data.length > 0){
		discovereds.splice(0, data.length);
		sendBeacon(JSON.stringify(data));
	};

	data = null;
}, 2000);