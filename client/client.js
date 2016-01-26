var noble = require('noble');
var fs = require('fs');
var FILE = "/tmp/data.json";

var writeStream = fs.createWriteStream(FILE, {'flags': 'a'});

var UUIDs = {
	"80e650e44644": "appleTv",
	"cfb22ab0f82c": "chargerHR",
	"604cdc67a4c7": "fingerTip",
	"b4994c73dde8": "beacon"
};

findUUID = function(object, id){
	for (UUID in object){
		if (UUID == id)
			return object[UUID]
	}
	return null;
};

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStop', function(){
	writeStream.end(function () { console.log('Done write file '+FILE); });
});

noble.on('discover', function(peripheral){
	// console.log(peripheral.advertisement.localName + " - " + peripheral.rssi + "(" + peripheral.uuid + ")");
	// 	console.dir(peripheral);

	writeStream.write(Date() + ": " + peripheral + '\n');

	if (findUUID(UUIDs, peripheral.uuid) == "beacon")
		console.log("Achou o " + peripheral.advertisement.localName + " " + peripheral.uuid + "(RSSI: " + peripheral.rssi + ")");
});
