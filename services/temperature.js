"use strict";

exports.routes = function(server, helpers, constants) {

	var root = constants.ROOT;
	
	server.get('/temperature/:sensor_id', function send(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }
			
		var params = {};
		
		var sensorId = req.params.sensor_id;
		if (sensorId) {
			params.sensor = sensorId;
		}
	
		var Temperature = require(root+"/models/temperature");
		Temperature.Class.find(params, function(err, items) {
			if (err) {
				res.send(403, err.errors);
			} else {
				res.send(items);
			}	
			return next();
		});
	});
};