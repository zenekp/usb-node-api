"use strict";

var constants = require("./constants");

var helpers = require("./helpers");

var mongoose = require("./mongoose");

var restify = require("./server");
var server = restify.server;

require("./services/user").routes(server, helpers, constants);
require("./services/sensor").routes(server, helpers, constants);
require("./services/temperature").routes(server, helpers, constants);
require("./services/default").routes(server, helpers, constants);

restify.start();

var pusher = require("./pusher");
// var db = require("./database");
pusher.send(constants);