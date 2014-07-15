"use strict";

var restify = require('restify');

var restifyOAuth2 = require("restify-oauth2");

// var hooks = require("./hooks");

var hooks = require("./models/client");

var server = restify.createServer();

server.use(restify.CORS());

server.use(restify.authorizationParser());

server.use(restify.bodyParser({ mapParams: false }));

restifyOAuth2.cc(server, { tokenEndpoint: '/token', hooks: hooks });

exports.server = server;

exports.start = function() {
	server.listen(8080, function() {
		console.log('%s listening at %s', server.name, server.url);
	});
};