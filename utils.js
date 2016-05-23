"use strict";

var Consts = require('./consts');
var MongoHelper = require('./mongoHelper');
var HttpHelper = require('./httpHelper');
var utils = {};

utils.changeDateFormat = function(str) {
  // "10/06/2016 22:00" -> "06/10/2016 22:00"
  var date = str.split(" ")[0];
  var hour = str.split(" ")[1];
  var date_new_format = date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2];
  return date_new_format + " " + hour;
}

utils.getUserInfo = function(userId, callback) {
  MongoHelper.getUserInfoFromMongo(userId, function(userInfo) {
    if (typeof userInfo !== "undefined") {
      console.log("Got the user info from mongoDB");
      callback(userInfo);
    } else {
      console.log("Can't find the user info in the mongoDB");
      HttpHelper.httpGetJson(Consts.FACEBOOK_USER_PROFILE_API.replace("<USER_ID>", userId), function(userInfo) {
        userInfo.user_id = userId;
        MongoHelper.insertUserInfoToMongo(userInfo, callback);
      });
    }
  });
}

utils.randomFromArray = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = utils;