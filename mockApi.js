"use strict";

var Consts = require('./consts');
var mockApi = {};

var groups = [{
	name: "A",
	teams: [{
		name: "Albania",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 3,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "France",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Romania",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 1,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Switzerland",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 3,
		goals_scored: 8,
		goals_taken: 2
	}]
},
{
	name: "B",
	teams: [{
		name: "England",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 11,
		goals_taken: 2
	},
	{
		name: "Russia",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 0,
		goals_scored: 8,
		goals_taken: 12
	},
	{
		name: "Slovakia",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Wales",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	}]
},
{
	name: "C",
	teams: [{
		name: "Germany",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 11,
		goals_taken: 2
	},
	{
		name: "Northern Ireland",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 0,
		goals_scored: 8,
		goals_taken: 12
	},
	{
		name: "Poland",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Ukraine",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	}]
},
{
	name: "D",
	teams: [{
		name: "Croatia",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 11,
		goals_taken: 2
	},
	{
		name: "Czech Republic",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 0,
		goals_scored: 8,
		goals_taken: 12
	},
	{
		name: "Spain",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Turkey",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	}]
},
{
	name: "E",
	teams: [{
		name: "Belgium",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 11,
		goals_taken: 2
	},
	{
		name: "Italy",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 0,
		goals_scored: 8,
		goals_taken: 12
	},
	{
		name: "Republic of Ireland",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Sweden",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	}]
},
{
	name: "F",
	teams: [{
		name: "Austria",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 11,
		goals_taken: 2
	},
	{
		name: "Hungary",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 0,
		goals_scored: 8,
		goals_taken: 12
	},
	{
		name: "Iceland",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Portugal",
		games_played: 2,
		games_won: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	}]
}];

var games = [{
	id: 1,
	type: "md1",
	group: "A",
	status: "Prematch",
	location: "Stade de France",
	time: "10/6/2016 22:00",
	home_team: {
		name: "France",
		goals: []
	},
	away_team: {
		name: "Romania",
		goals: []
	}
},
{
	id: 2,
	type: "md1",
	group: "A",
	status: "Prematch",
	location: "Stade Bollaert-Delelis",
	time: "11/6/2016 16:00",
	home_team: {
		name: "Albania",
		goals: []
	},
	away_team: {
		name: "Switzerland",
		goals: []
	}
},
{
	id: 3,
	type: "md1",
	group: "B",
	status: "Prematch",
	location: "Stade de Bordeaux",
	time: "11/6/2016 19:00",
	home_team: {
		name: "Wales",
		goals: []
	},
	away_team: {
		name: "Slovakia",
		goals: []
	}
},
{
	id: 4,
	type: "md1",
	group: "B",
	status: "Prematch",
	location: "Stade Velodrome",
	time: "11/6/2016 22:00",
	home_team: {
		name: "England",
		goals: []
	},
	away_team: {
		name: "Russia",
		goals: []
	}
},
{
	id: 5,
	type: "md1",
	group: "D",
	status: "Prematch",
	location: "Parc des Princes",
	time: "12/6/2016 16:00",
	home_team: {
		name: "Turkey",
		goals: []
	},
	away_team: {
		name: "Croatia",
		goals: []
	}
},
{
	id: 6,
	type: "md1",
	group: "C",
	status: "Prematch",
	location: "Stade de Nice",
	time: "12/6/2016 19:00",
	home_team: {
		name: "Poland",
		goals: []
	},
	away_team: {
		name: "Northern Ireland",
		goals: []
	}
},
{
	id: 7,
	type: "md1",
	group: "C",
	status: "Prematch",
	location: "Stade Pierre Mauroy",
	time: "12/6/2016 22:00",
	home_team: {
		name: "Germany",
		goals: []
	},
	away_team: {
		name: "Ukraine",
		goals: []
	}
},
{
	id: 8,
	type: "md1",
	group: "D",
	status: "Prematch",
	location: "Stadium de Toulouse",
	time: "13/6/2016 16:00",
	home_team: {
		name: "Spain",
		goals: []
	},
	away_team: {
		name: "Czech Republic",
		goals: []
	}
},
{
	id: 9,
	type: "md1",
	group: "E",
	status: "Prematch",
	location: "Stade de France",
	time: "13/6/2016 19:00",
	home_team: {
		name: "Republic of Ireland",
		goals: []
	},
	away_team: {
		name: "Sweden",
		goals: []
	}
},
{
	id: 10,
	type: "md1",
	group: "E",
	status: "Prematch",
	location: "Stade de Lyon",
	time: "13/6/2016 22:00",
	home_team: {
		name: "Belgium",
		goals: []
	},
	away_team: {
		name: "Italy",
		goals: []
	}
},
{
	id: 11,
	type: "md1",
	group: "F",
	status: "Prematch",
	location: "Stade de Bordeaux",
	time: "14/6/2016 19:00",
	home_team: {
		name: "Austria",
		goals: []
	},
	away_team: {
		name: "Hungary",
		goals: []
	}
},
{
	id: 12,
	type: "md1",
	group: "F",
	status: "Prematch",
	location: "Stade Geoffroy-Guichard",
	time: "14/6/2016 22:00",
	home_team: {
		name: "Portugal",
		goals: []
	},
	away_team: {
		name: "Iceland",
		goals: []
	}
}];

mockApi.getGroups = function(callback) {
	if(typeof callback !== "function") return;
	callback(groups);
}

mockApi.getGroupOfTeam = function(callback, team) {
	if(typeof callback !== "function") return;
	consoloe.log("getGroupOfTeam for " + team);
	callback(groups);
}

mockApi.getGames = function(callback) {
	if(typeof callback !== "function") return;
	callback(games);
}

mockApi.getGamesOfTeam = function(callback, team) {
	if(typeof callback !== "function") return;
	consoloe.log("getGamesOfTeam for " + team);
	callback(games);
}

mockApi.getLiveGames = function(callback) {
	if(typeof callback !== "function") return;
	callback(games);
}

mockApi.getGamesByDate = function(callback, date) {
	if(typeof callback !== "function") return;
	callback(games);
}

module.exports = mockApi;