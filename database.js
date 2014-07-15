"use strict";

var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var Config = require('config').Database;

var server = new Server(Config.Host, Config.Port, {auto_reconnect: true});

var db = new Db(Config.Name, server);
 
db.open(function(err, db) {
    if(!err) {
        console.log('Connected to '+Config.Name+' database');
    }
});

exports.db = db;

exports.findById = function(req, res) {
	var model = req.params.model;
    var id = req.params.id;
    console.log('Retrieving '+model+': ' + id);
    db.collection(model, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
	var model = req.params.model;
	console.log('finding all '+model);
    db.collection(model, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.add = function(req, res) {
	var model = req.params.model;
    var data = req.body;
	data.date_created = new Date().getTime();
	data.date_updated = false;
    console.log('Adding '+model+': ' + JSON.stringify(data));
    db.collection(model, function(err, collection) {
        collection.insert(data, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
 
exports.update = function(req, res) {
	var model = req.params.model;
    var id = req.params.id;
    var data = req.body;
	data.date_updated = new Date().getTime();
    console.log('Updating ' + model + ': ' + id);
    db.collection(model, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, data, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating ' + model + ': ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(data);
            }
        });
    });
};
 
exports.delete = function(req, res) {
	var model = req.params.model;
    var id = req.params.id;
    console.log('Deleting '+model+': ' + id);
    db.collection(model, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};