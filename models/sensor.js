"use strict";

var mongoose = require('mongoose');
	
var SensorSchema = mongoose.Schema({
	name:{
		type: String
	},
	location:{
		type: String
	},
	date_created: {
		type: Date
	},
	date_updated: {
		type: Date
	}
});

exports.Class = mongoose.model('Sensor', SensorSchema);