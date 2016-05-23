"use strict";

var Consts = require('./consts');
var Groups = require('./groups');
var Games = require('./games');
var DateFormat = require('dateformat');
var Utils = require('./utils');
var mockApi = {};

function isObjectInArray(arr, propName, propVal) {
	for (var i=0; i < arr.length; i++) {
        if (arr[i][propName] === propVal) {
            return true;
        }
    }
    return false;
}

function sortGamesByStartTime(games) {
  return games.sort(function(a, b) {
    return (new Date(Utils.changeDateFormat(a.time)) > new Date(Utils.changeDateFormat(b.time))) ? -1 : ((new Date(Utils.changeDateFormat(a.time)) > new Date(Utils.changeDateFormat(b.time))) ? 1 : 0);
  });
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

mockApi.getNextGame = function(callback) {
	if(typeof callback !== "function") return;
	var curTime = new Date();
	var iGame = 0;
	var sortedGames = Games;
	console.log("sortedGames.length: " + sortedGames.length);
	for (var iGame = 0; iGame < sortedGames.length; iGame++) {
		var curGame = sortedGames[iGame];
		var curGameTime = new Date(Utils.changeDateFormat(curGame.time));
		console.log("Cur game: " + curGame.home_team.name + " vs " + curGame.away_team.name);
		console.log("Cur game time: " + curGameTime);
		if (curGameTime > curTime) {
			console.log("First game found as next match: " + curGame.home_team.name + " vs " + curGame.away_team.name);
			var nextGame = curGame;
			var games = [];
			games.push(curGame);
			// Check if next games are on the same time.
			iGame++;
			while(iGame < sortedGames.length && (nextGame.time === sortedGames[iGame].time)) {
				console.log("Found another game as next match: " + sortedGames[iGame].home_team.name + " vs " + sortedGames[iGame].away_team.name);
				games.push(sortedGames[iGame]);
				iGame++;
			}
			callback(games);
			return;
		}
	}
	callback([]);
}

mockApi.getGamesForToday = function(callback) {
	if(typeof callback !== "function") return;
	mockApi.getGamesByDate(callback, DateFormat(new Date(), "dd/mm/yyyy"));
}

mockApi.getGamesForTomorrow = function(callback, date) {
	if(typeof callback !== "function") return;
	mockApi.getGamesByDate(callback, DateFormat(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "dd/mm/yyyy"));
}

mockApi.getGamesByDate = function(callback, date) {
	if(typeof callback !== "function") return;
	callback(Games.filter(function(obj) {return (obj.time.indexOf(date) > -1)}));
}

module.exports = mockApi;