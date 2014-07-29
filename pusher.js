"use strict";

var Pusher = require('pusher');

var Config = require('config').Pusher;

var pusher = new Pusher({
	appId: Config.appId,
	key: Config.key,
	secret: Config.secret
});

exports.send = function(constants) {
	
	var model = 'temperatures';
	
	var root = constants.ROOT;
	
	var params = {};
	
	params.sensor = '533d7d699a31316640110f52';
	
	params.date_created = { $gte : new Date().getTime() };
	
	var Temperature = require(root+"/models/temperature");

	var message = function() {
		Temperature.Class.find(params, function(err, items) {
			if (err) {
				console.log(err);
			} else {
				params.date_created = { $gte : new Date().getTime() };
				pusher.trigger('test_channel', 'temperature_update', items);
			}	
		});
	};
	
	message();
	
	setInterval(message, Config.interval);
};