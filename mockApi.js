"use strict";

var mockApi = {};

var groups = [{
	name: "A",
	teams: [{
		name: "Albania",
		flag_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/2000px-Flag_of_Albania.svg.png",
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
		flag_url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png",
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
		flag_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/2000px-Flag_of_Romania.svg.png",
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
		flag_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_(Pantone).svg/2000px-Flag_of_Switzerland_(Pantone).svg.png",
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
		flag_url: "http://www.freelargeimages.com/wp-content/uploads/2014/11/England_flag-4.jpg",
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
		flag_url: "https://upload.wikimedia.org/wikipedia/en/archive/f/f3/20120812153730!Flag_of_Russia.svg",
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
		flag_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/2000px-Flag_of_Slovakia.svg.png",
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
		flag_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Wales_2.svg/2000px-Flag_of_Wales_2.svg.png",
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