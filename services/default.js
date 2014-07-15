"use strict";

exports.routes = function(server, helpers, constants) {

	var root = constants.ROOT;
	
	server.get('/:model', function send(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }
		
		var modelName = req.params.model;
		if ( ! helpers.modelExists(modelName) ) {
			return res.sendUnauthorized(); // 401
		}
		
		var Model = require(root+"/models/"+modelName);
		Model.Class.find({}, function(err, items) {
			if (err) {
				res.send(403, err.errors);
			} else {
				res.send(items);
			}	
			return next();
		});
	});

	server.get('/:model/:id', function send(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }
		
		var modelName = req.params.model;
		if ( ! helpers.modelExists(modelName) ) {
			return res.sendUnauthorized(); // 401
		}
		
		var Model = require(root+"/models/"+modelName);
		var id = req.params.id;
		Model.Class.find({ '_id' : id }, function(err, items) {
			if (err) {
				res.send(403, err.errors);
			} else {
				
				res.send(items[0]);
			}
			return next();
		});
	});
	
	server.post('/:model', function create(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }
	
		var modelName = req.params.model;
		if ( ! helpers.modelExists(modelName) ) {
			return res.sendUnauthorized(); // 401
		}

		var data = req.body;
		data.date_created = new Date().getTime();
		data.date_updated = null;

		var Model = require(root+"/models/"+modelName);	
		var modelObject = new Model.Class(data);
	
		modelObject.save(function (err) {
		  	if (err) {
				res.send(403, err.errors);
			} else {
				res.send(modelObject);
			}
			return next();
		});
	});
 
	server.put('/:model/:id', function create(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }
	
		var modelName = req.params.model;
		if ( ! helpers.modelExists(modelName) ) {
			return res.sendUnauthorized(); // 401
		}
		
		var Model = require(root+"/models/"+modelName);
		var id = req.params.id;
		
		var data = req.body;
		data.date_updated = new Date().getTime();
		delete data._id; // to avoid mongoose error of modifying _id 
		
		Model.Class.findOneAndUpdate({'_id' : id}, data, function(err, item) {
			if (err) {
				res.send(403, err.errors);
			} else {
				res.send(item);
			}
 			return next();
		});
	});

	server.del('/:model/:id', function rm(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		
		if ( ! req.clientId ) {
	    	return res.sendUnauthorized(); // 401
	    }

		var modelName = req.params.model;
		if ( ! helpers.modelExists(modelName) ) {
			return res.sendUnauthorized(); // 401
		}

		var Model = require(root+"/models/"+modelName);
		var id = req.params.id;
		
		Model.Class.findOneAndRemove({'_id' : id}, function(err, item) {
			if (err) {
				res.send(403, err.errors);
			} else {
				res.send(item);
			}
 			return next();
		});
	 });
	
	function unknownMethodHandler(req, res, next) {
		if (req.method.toLowerCase() === 'options') {
			var allowHeaders = [
				'X-Requested-With',
				'Cookie',
				'Set-Cookie',
				'Accept',
				'Access-Control-Allow-Credentials',
				'Origin',
				'Content-Type',
				'Request-Id',
				'X-Api-Version',
				'X-Request-Id',
				'Access-Control-Allow-Origin',
				'Accept-Version',
				'Authorization',
				'Api-Version'];

			if (res.methods.indexOf('OPTIONS') === -1) {
				res.methods.push('OPTIONS');
			}

			res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
			res.header('Access-Control-Allow-Origin', req.headers.origin);		
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Expose-Headers', 'Set-Cookie');
			res.header('Allow', req.headers['access-control-request-method']);
			res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
			req.log.info({ url:req.url, method:req.headers['access-control-request-method'] }, "Preflight");
			res.send(204);

			return next()
		}
		else {
			return res.send(new restify.MethodNotAllowedError());
		}
	}

	server.on('MethodNotAllowed', unknownMethodHandler);
}