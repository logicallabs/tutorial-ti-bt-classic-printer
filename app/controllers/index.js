/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false bitwise:true*/
/*global Alloy, $ */

var
	PrinterUtils = Alloy.Globals.PrintUtils,
	devices, selectedDeviceIndex, selectedRow
;

function refreshDeviceList() {
	var tableData;
	
	tableData = [];
	devices = [];
	
	PrinterUtils.getDeviceList().forEach(function(entry) {
		devices.push(entry.device);
		tableData.push({
			title: entry.name
		});
	});
	
	$.deviceTable.setData(tableData);
	
	selectedDeviceIndex = -1;
}

function tableClick(e) {
	if (selectedRow) {
		selectedRow.hasCheck = false;
	}
	
	selectedDeviceIndex = e.index;
	selectedRow = e.row;
	selectedRow.hasCheck = true;		
}

function toggleConnection() {
	if (PrinterUtils.isConnected()) {
		PrinterUtils.disconnect();
		return;
	}
	
	if (selectedDeviceIndex === -1) {
		alert('Please select a device from the table');
		return;
	}
	PrinterUtils.connect(devices[selectedDeviceIndex]);
}

function print() {
	PrinterUtils.print($.textInput.value);
	$.textInput.value = '';
}

function updateGui() {
	if (PrinterUtils.isConnected()) {
		$.toggleConnectionButton.title = 'Disconnect';
		$.textInput.visible = true;
	} else {
		$.toggleConnectionButton.title = 'Connect';
		$.textInput.visible = false;
	}
}

Ti.App.addEventListener('printerConnected', updateGui);
Ti.App.addEventListener('printerDisconnected', updateGui);
Ti.App.addEventListener('printerError', function(e) {
	alert(e.message);
});


$.index.open();

refreshDeviceList();
updateGui();