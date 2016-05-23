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

mockApi.getGroup = function(callback, groupName) {
	if(typeof callback !== "function") return;
	callback(Groups.filter(function(obj) {return (obj.name === groupName)}));
}

mockApi.getGroupOfTeam = function(callback, team) {
	if(typeof callback !== "function") return;
	callback(Groups.filter(function(obj) { return isObjectInArray(obj.teams, "name", team)}));
}

mockApi.getGames = function(callback) {
	if(typeof callback !== "function") return;
	callback(Games);
}

mockApi.getGamesOfTeam = function(callback, teamName) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.home_team.name === teamName || obj.away_team.name === teamName)}));
}

mockApi.getGamesForStage = function(callback, stageName) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.type === stageName)}));
}

mockApi.getGamesOfGroupStage = function(callback) {
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

mockApi.getGamesForGroup = function(callback, groupName) {
	if(typeof callback !== "function") return;
	getGamesOfGroupStage(function(games) {
		getGroup(function(group) {
			callback(games.filter(function(game) {
				for (var iTeam = 0; iTeam < group.teams.length; iTeam++) {
					if (group.teams[iTeam].name === game.home_team) {
						return true;
					}
				}
			}));
		}, groupName);
	});
}

mockApi.getGamesForToday = function(callback) {
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