/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/
/*global Alloy, OS_IOS */

var
	ExternalAccessories = require('com.logicallabs.externalaccessories'),
	PROTOCOL_STRING = 'com.zebra.rawport',
	session
;

exports.getDeviceList = function() {
	var result, accessories;
	
	result = [];

	accessories =  ExternalAccessories.connectedAccessories;
	
	accessories.forEach(function(accessory) {
		if (accessory.protocolStrings.indexOf(PROTOCOL_STRING) > -1) {
			result.push({
				name: accessory.name,
				device: accessory
			});
		}
	});
	return result;	
};

exports.connect = function(accessory) {
	if (session) {
		Ti.API.info('Closing previous session!');
		session.close();
	}

	session = accessory.openSession({
		protocol: PROTOCOL_STRING
	});
	
	if (session) {
		Ti.App.fireEvent('printerConnected');
	} else {
		Ti.App.fireEvent('printerError', {
			message: 'Could not create session!'
		});
	}
};

function isConnected() {
	if (session) {
		return true;
	}
	return false;
}

exports.isConnected = isConnected;

exports.disconnect = function() {
	if (session) {
		session.close();
		session = null;
		Ti.App.fireEvent('printerDisconnected');
	}
};

ExternalAccessories.addEventListener('accessoryDisconnected', function(e) {
	Ti.API.info('accessoryDisconnected event received');
	if (session && session.accessory.equals(e.accessory)) {
		session = null;
		Ti.App.fireEvent('printerDisconnected');
	}
});
