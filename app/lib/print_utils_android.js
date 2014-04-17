/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/
/*global Alloy, OS_IOS */

var
	Bluetooth = require('com.logicallabs.bluetooth')
;

exports.getDeviceList = function() {
	var result, devices;
	
	result = [];
	
	devices = Bluetooth.pairedDevices;
	devices.forEach(function(device) {
			result.push({
				name: device.name,
				device: device
			});
		});
	return result;
};
