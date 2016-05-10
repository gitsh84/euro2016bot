"use strict";

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
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Romania",
		games_played: 2,
		games_draw: 0,
		games_lost: 0,
		points: 1,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Switzerland",
		games_played: 2,
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
		games_draw: 0,
		games_lost: 0,
		points: 6,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Russia",
		games_played: 2,
		games_draw: 0,
		games_lost: 0,
		points: 0,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Slovakia",
		games_played: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	},
	{
		name: "Wales",
		games_played: 2,
		games_draw: 0,
		games_lost: 0,
		points: 2,
		goals_scored: 8,
		goals_taken: 2
	}]
}];

mockApi.getGroups = function(callback) {
	if(typeof callback !== "function") return;
	callback(groups);
}

module.exports = mockApi;