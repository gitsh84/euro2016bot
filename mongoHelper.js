"use strict";

var Consts = require('./consts');
var MongoClient = require('mongodb').MongoClient;
var mongoHelper = {};

var insertIntoMongo = function(document, collection, callback) {
	MongoClient.connect(Consts.MONGO_DB_URL, function(err, db) {
		console.log("insertIntoMongo - Connected to server with error: " + err);
		db.collection(collection).insertOne(userInfo, function(err, r) {
			console.log("insertIntoMongo - Insert complete with error: " + err);
			db.close();
			callback();
		});
	});
}

var getFromMongo = function(docToFind, collection, callback) {
	MongoClient.connect(Consts.MONGO_DB_URL, function(err, db) {
		console.log("getFromMongo - Connected to server with error: " + err);
		db.collection(collection).find(docToFind).limit(1).toArray(function(err, docs) {
			db.close();
			if (docs instanceof Array && docs.length == 1) {
				console.log("getFromMongo - Found the document: " + JSON.stringify(docs[0]));
				callback(docs[0]);
			} else {
				console.log("getFromMongo - Could not find the document");
				callback();
			}
		});
	});
}

mongoHelper.insertUserInfoToMongo = function(userInfo, callback) {
	insertIntoMongo(userInfo, Consts.MONGO_DB_USER_INFO_COL, callback);
}

mongoHelper.getUserInfoFromMongo = function(userId, callback) {
  getFromMongo({user_id : userId}, Consts.MONGO_DB_USER_INFO_COL, callback);
}

module.exports = mongoHelper;
