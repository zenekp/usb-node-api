"use strict";

var constants = require("./constants");

var root = constants.ROOT;

var modelExists = function(model) {	
	return moduleExists(root+"/models/"+model);
};

exports.modelExists = modelExists;

var moduleExists = function(module) {
	try {
		require.resolve(module);
	} catch(e) {
		return false;
	}
	return true;	
};

exports.moduleExists = moduleExists;