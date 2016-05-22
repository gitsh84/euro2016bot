"use strict";

var Consts = require('./consts');
var Groups = require('./groups');
var Games = require('./games');
var mockApi = {};

function isObjectInArray(arr, propName, propVal) {
	for (var i=0; i < arr.length; i++) {
        if (arr[i][propName] === propVal) {
            return true;
        }
    }
    return false;
}

mockApi.getGroups = function(callback) {
	if(typeof callback !== "function") return;
	callback(Groups);
}

mockApi.getGroup = function(callback, group) {
	if(typeof callback !== "function") return;
	callback(Groups.filter(function(obj) {return (obj.name === group)}));
}

mockApi.getGroupOfTeam = function(callback, team) {
	if(typeof callback !== "function") return;
	callback(Groups.filter(function(obj) { return isObjectInArray(obj.teams, "name", team)}));
}

mockApi.getGames = function(callback) {
	if(typeof callback !== "function") return;
	callback(Games);
}

mockApi.getGamesOfTeam = function(callback, team) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.home_team === team || obj.away_team === team)}));
}

mockApi.getGamesOfRound = function(callback, round) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.type === round)}));
}

mockApi.getGamesOfGroupStage = function(callback, round) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.type === "md1" || obj.type === "md2" || obj.type === "md3")}));
}

mockApi.getGamesLive = function(callback) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.status === "Live")}));
}

mockApi.getGamesInStadium = function(callback, stadium) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.location === stadium)}));
}

mockApi.getGamesForToday = function(callback, date) {
	if(typeof callback !== "function") return;
	getGamesByDate(callback, DateFormat(new Date(), "dd/mm/yyyy"));
}

mockApi.getGamesForTomorrow = function(callback, date) {
	if(typeof callback !== "function") return;
	getGamesByDate(callback, DateFormat(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "dd/mm/yyyy"));
}

mockApi.getGamesByDate = function(callback, date) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.time.indexOf(date) > -1)}));
}

module.exports = mockApi;