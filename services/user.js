"use strict";

exports.routes = function(server, helpers, constants) {

	var root = constants.ROOT;
	
	var passwordHash = require('password-hash');
	
	server.post('/user', function send(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }
		
		var data = req.body;
		if (data.password) {
			data.password = passwordHash.generate(data.password);
		}
		data.date_created = new Date().getTime();
		data.date_updated = null;
	
		var User = require(root+"/models/user");
		var userObject = new User.Class(data);
		userObject.save(function (err) {
		  	if (err) {
				res.send(403, err.errors);
			} else {
				res.send(userObject);
			}
			return next();
		});
	});
	
	// server.post('/user/login', function send(req, res, next) {
	// 	res.header('Access-Control-Allow-Origin', req.headers.origin);
	// 	
	// 	if ( ! req.clientId ) {
	//     	return res.sendUnauthorized(); // 401
	//     }
	// 	
	// 	if ( req.body.username ) {
	// 		var username = req.body.username;
	// 	}
	// 	
	// 	if ( req.body.password ) {
	// 		var password = req.body.password;
	// 	}
	// 
	// 	var User = require(root+"/models/user");
	// 	User.Class.find({'username': username}, function(err, items) {
	// 		if ( err || !items[0] || !items[0].password || !passwordHash.verify(password, items[0].password) ) {
	// 			res.send(403, 'Bad login credentials');
	// 		} else {
	// 			res.send(items[0]);
	// 		}	
	// 		return next();
	// 	});
	// });
};