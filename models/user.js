"use strict";

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = mongoose.Schema({
	name:{
		type: String,
		unique: true,
		required: true
	},
	username:{
		type: String,
		unique: true,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	role:{
		type: String
	},
	date_created: {
		type: Date
	},
	date_updated: {
		type: Date
	}
});

UserSchema.plugin(uniqueValidator);

exports.Class = mongoose.model('User', UserSchema);