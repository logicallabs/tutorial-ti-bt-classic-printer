/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/
/*global Alloy, OS_IOS */

var
	ExternalAccessories = require('com.logicallabs.externalaccessories'),
	PROTOCOL_STRING = 'com.zebra.rawport'
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
