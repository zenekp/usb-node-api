"use strict"

exports.routes = function(server, helpers, constants) {

	var root = constants.ROOT;
	
	server.get('/sensor', function send(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }
			
		var Sensor = require(root+"/models/sensor");
		Sensor.Class.find({}, function(err, items) {
			if (err) {
				res.send(403, err.errors);
			} else {
				res.send(items);
			}	
			return next();
		});
	});
}