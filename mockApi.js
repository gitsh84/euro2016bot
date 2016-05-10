"use strict";

var mockApi = {};

var groups = [{
	name: "A",
	teams: [{
		name: "Albania",
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
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
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
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
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
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
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
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
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
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
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
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
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
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
		flag_url: "http://1fotonin.com/image.php?pic=/data/wallpapers/220/WDF_2574011.jpg",
		games_played: 2,
		games_won: 2,
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