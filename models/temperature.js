"use strict";

var mongoose = require('mongoose');
	
var TemperatureSchema = mongoose.Schema({
	sensor:{
		type: mongoose.Schema.ObjectId,
		ref: 'SensorSchema'
	},
	temperature:{
		type: Number,
		max: [120, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'],
		min: [-40, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).']
	},
	date_created: {
		type: Date
	},
	date_updated: {
		type: Date
	}
});

exports.Class = mongoose.model('Temperature', TemperatureSchema);