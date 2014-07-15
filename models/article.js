"use strict";

var mongoose = require('mongoose');
	
var ArticleSchema = mongoose.Schema({
	name: {
		type: String,
		index: true
	},
	content: {
		type: String
	},
	type: {
		type: String
	},
	date_created: {
		type: Date
	},
	date_updated: {
		type: Date
	}
});

exports.Class = mongoose.model('Article', ArticleSchema);