/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/
/*global Alloy, OS_IOS */

var
	Bluetooth = require('com.logicallabs.bluetooth'),
	SPP_UUID = '00001101-0000-1000-8000-00805f9b34fb',
	clientSocket
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

function socketConnected() {
	Ti.API.info('Connected to ' + clientSocket.remoteDevice.name);
	Ti.App.fireEvent('printerConnected');
}

function socketDisconnected() {
	Ti.API.info('Disconnected');
	if (clientSocket) {
		clientSocket.close();
		clientSocket = null;
	}
	Ti.App.fireEvent('printerDisconnected');
}

function socketError(e) {
	Ti.App.fireEvent('printerError', {
		message: e.errorMessage
	});

	if (clientSocket) {
		if (clientSocket.isConnected()) {
			clientSocket.close();
		}
		clientSocket = null;
	}
}

exports.connect = function(device) {
	clientSocket = device.createSocket({
		uuid: SPP_UUID,
		secure: true
	});
	clientSocket.addEventListener('connected', socketConnected);
	clientSocket.addEventListener('disconnected', socketDisconnected);
	clientSocket.addEventListener('error', socketError);

	clientSocket.connect();
}; 

function isConnected() {
	return clientSocket && clientSocket.isConnected();
}

exports.isConnected = isConnected;

exports.disconnect = function() {
	if (clientSocket) {
		clientSocket.close();
	}
};
