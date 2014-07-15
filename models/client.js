"use strict";

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ClientSchema = mongoose.Schema({
	name:{
		type: String,
		unique: true
	},
	clientId:{
		type: String,
		unique: true,
		required: true
	},
	clientSecret:{
		type: String,
		required: true
	},
	token:{
		type: String
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

ClientSchema.plugin(uniqueValidator);

var Client = mongoose.model('Client', ClientSchema);

exports.Class = Client;

var crypto = require("crypto");

function generateToken(data) {
    var random = Math.floor(Math.random() * 100001);
    var timestamp = (new Date()).getTime();
    var sha256 = crypto.createHmac("sha256", random + "WOO" + timestamp);
    return sha256.update(data).digest("base64");
}

exports.grantClientToken = function(clientId, clientSecret, cb) {
	Client.find({ 'clientId' : clientId, 'clientSecret' : clientSecret }, function(err, items) {
		if (!err && items[0]) {
			var client = items[0];
			var token = generateToken(clientId + ":" + clientSecret);
			client.token = token;
			client.save();
			return cb(null, token);
		} else {
			cb(null, false);
		}
	});
};

exports.authenticateToken = function(token, cb) {
	Client.find({ 'token' : token }, function(err, items) {
		if (!err && items[0]) {
			return cb(null, items[0].clientId);
		} else {
			cb(null, false);
		}
	});
};