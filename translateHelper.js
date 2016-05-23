"use strict";

var HttpHelper = require('./httpHelper');
var translateHelper = {};

// see docs here: http://docs.cyrano.apiary.io
function translateMessage(userInfo, text, direction, callback) {
  if (!process.env.CYRANOAPI_HOST ||
    !process.env.CYRANOAPI_TOKEN ||
    !userInfo ||
    typeof text !== "string" ||
    text.length === 0) {
    console.log("translateMessage: don't have all the info needed to translate via API");
    callback();
    return;
  }
  console.log("translateMessage: building request");
  var url = process.env.CYRANOAPI_HOST + '/bots/euro2016/en/messages/' + direction;
  console.log("url: " + url);
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'cyrano:' + process.env.CYRANOAPI_TOKEN
  };
  var body = {
    user: {
      id: userInfo.user_id,
      gender: userInfo.gender
    },
    text: text
  };
  if(userInfo && userInfo.lang) {
    body.user.lang = userInfo.lang;
  }
  var bodyString = JSON.stringify(body);
  console.log("body of translate request: " + bodyString);
  HttpHelper.httpPostJson(url, headers, bodyString, callback);
}

translateHelper.translateUserMessage = function(userInfo, text, callback) {
  translateMessage(userInfo, text, "in", callback)
}

translateHelper.translateBotMessage = function(userInfo, text, callback) {
  translateMessage(userInfo, text, "out", callback)
}

module.exports = translateHelper;