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
	alert('Will connect/disconnect here; not ready yet!');
}

function print() {
	alert('Will print here; not ready yet!');
	$.textInput.value = '';
}

$.index.open();

refreshDeviceList();
