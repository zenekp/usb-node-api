"use strict";

var Pusher = require('pusher');

var Config = require('config').Pusher;

var pusher = new Pusher({
	appId: Config.appId,
	key: Config.key,
	secret: Config.secret
});

exports.send = function(db) {
	
	var model = 'temperatures';
	
	var last_timestamp = new Date().getTime();
	
	var message = function() {
		db.db.collection(model, function(err, collection) {
	        collection.find({ 'date_created' : { $gte: last_timestamp } }).sort({ 'date_created' : 1 }).toArray(function(err, items) {
				if ( items.length /*&& items[ items.length - 1 ].date_created != undefined*/ ) {
					/*last_timestamp = items[ items.length - 1 ].date_created;*/
					last_timestamp = new Date().getTime();
					pusher.trigger('test_channel', 'temperature_update', items);
				}
	        });
	    });
	};
	
	message();
	
	setInterval(message, Config.interval);
};