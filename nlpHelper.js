"use strict";

var HttpHelper = require('./httpHelper');
var nlpHelper = {};

function queryLuisNLP(message, callback) {
  if (!process.env.LUIS_NLP_TOKEN) {
    callback();
    return;
  }
  HttpHelper.httpGetJson(Consts.LUIS_NLP_API + message.text, function(jsonResponse) {
    message.nlp = jsonResponse;
    callback(message);
  });
}

nlpHelper.addInfoFromNLP = function(message, callback) {
  if (message.text && message.text.length > 0) {
    queryLuisNLP(message, callback);
  } else {
    callback(message);
  }
}

nlpHelper.findSuitableIntent = function(message) {
  if (message && message.nlp && message.nlp.intents && message.nlp.intents.length > 0) {
    console.log("Found " + message.nlp.intents.length + " possible intents");
    var sortedIntents = message.nlp.intents.sort(function(a, b) {
      return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
    });
    if ((sortedIntents[0].score > Consts.LUIS_MIN_SCORE) && (sortedIntents[0].intent !== "None")) {
      return sortedIntents[0].intent;
    } else {
      console.log("Score for intent " + sortedIntents[0].intent + " was too low: " + sortedIntents[0].score);
    }
  } else {
    console.log("No NLP data available so cant find intent");
  }
  return null;
}

module.exports = nlpHelper;