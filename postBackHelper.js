"use strict";

var postBackHelper = {};
var View = require('./view');

postBackHelper.handlePostBack = function(bot, message, payload) {
	if(payload.indexOf("-") === -1 ) payload += "-";
	var postBackId = payload.split("-")[0];
	var postBackData = payload.split("-")[1];
	console.log("Received postBackId: " + postBackId + " with postBackData: " + postBackData);
	if (typeof View[postBackId] === "function") {
		console.log("Found postback callback");
		View[postBackId](bot, message, postBackData);
	} else {
		console.log("Could not find a postback callback");
	}
}

module.exports = postBackHelper;