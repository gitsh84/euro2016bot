"use strict";

var Consts = require('./consts');
var Api = require('./mockApi');
var FacebookHelper = require('./facebookHelper');
var Stadiums = require('./stadiums');
var Flags = require('./flags');
var view = {};

view.buildMainMenu = function() {
  var gamesElement = {}
  gamesElement.title = "Matches";
  gamesElement.image_url = "http://www.clipartbest.com/cliparts/ncB/rjq/ncBrjqRcA.png";
  gamesElement.buttons = [];
  gamesElement.buttons.push({
    'type': 'postback',
    'title': 'Matches',
    'payload': 'showMatchesMenu'
  });

  var teamsElement = {}
  teamsElement.title = "Teams";
  teamsElement.image_url = "https://upload.wikimedia.org/wikipedia/commons/b/bc/Europe_flags.png";
  teamsElement.buttons = [];
  teamsElement.buttons.push({
    'type': 'postback',
    'title': 'Teams',
    'payload': 'showAllGroups'
  });

  var stadiumsElement = {}
  stadiumsElement.title = "Stadiums";
  stadiumsElement.image_url = "http://img.uefa.com/MultimediaFiles/Photo/competitions/Venues/02/04/30/30/2043030_w1.jpg";
  stadiumsElement.buttons = [];
  stadiumsElement.buttons.push({
    'type': 'postback',
    'title': 'Stadiums',
    'payload': 'showStadiums'
  });
  return [gamesElement, teamsElement, stadiumsElement];
}

view.showMainMenu = function(bot, message) {
  FacebookHelper.sendGenericTemplate(bot, message, view.buildMainMenu());
}

view.showMatchesMenu = function(bot, message) {
  var elements = [];

  var gamesElement = {}
  gamesElement.title = "Matches Options";
  gamesElement.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  gamesElement.buttons = [];
  gamesElement.buttons.push({
    'type': 'postback',
    'title': 'Matches By Teams',
    'payload': 'showMatchesByTeamMenu'
  });
  gamesElement.buttons.push({
    'type': 'postback',
    'title': 'Matches By Dates',
    'payload': 'showMatchesByDateMenu'
  });
  gamesElement.buttons.push({
    'type': 'postback',
    'title': 'Matches By Stage',
    'payload': 'showMatchesByStageMenu'
  });
  elements.push(gamesElement);

  gamesElement = {}
  gamesElement.title = "More Options";
  gamesElement.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  gamesElement.buttons = [];
  gamesElement.buttons.push({
    'type': 'postback',
    'title': 'Matches By Group',
    'payload': 'showMatchesByGroupMenu'
  });
  gamesElement.buttons.push({
    'type': 'postback',
    'title': 'Matches By Stadium',
    'payload': 'showMatchesByStadiumMenu'
  });
  elements.push(gamesElement);

  FacebookHelper.sendGenericTemplate(bot, message, elements);
}

view.showMatchesByTeamMenu = function(bot, message) {
  view.showAllGroups(bot, message);
}

view.showMatchesByGroupMenu = function(bot, message) {
  var elements = [];

  var element = {}
  element.title = "Matches By Group";
  element.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Group A',
    'payload': 'showGroup-A'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group B',
    'payload': 'showGroup-B'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group C',
    'payload': 'showGroup-C'
  });
  elements.push(element);

  element = {}
  element.title = "Matches By Group";
  element.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Group D',
    'payload': 'showGroup-D'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group E',
    'payload': 'showGroup-E'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group F',
    'payload': 'showGroup-F'
  });
  elements.push(element);

  FacebookHelper.sendGenericTemplate(bot, message, elements);
}

view.showMatchesByDateMenu = function(bot, message) {
  var element = {}
  element.title = "Matches By Date";
  element.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Next Game',
    'payload': 'showNextGame'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Today',
    'payload': 'showMatchesForToday'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Tomorrow',
    'payload': 'showMatchesForTomorrow'
  });

  FacebookHelper.sendGenericTemplate(bot, message, element);
}

view.showStagesMenu = function(bot, message) {
  var elements = [];

  var element = {}
  element.title = "Standings";
  element.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Group Stage',
    'payload': 'showMatchesForStage-md1'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group Stage 2',
    'payload': 'showMatchesForStage-md2'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group Stage 3',
    'payload': 'showMatchesForStage-md3'
  });
  elements.push(element);

  element = {}
  element.title = "Matches By Stage";
  element.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Round Of 16',
    'payload': 'showMatchesForStage-round_of_16'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Quarter Finals',
    'payload': 'showMatchesForStage-quarter_finals'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Semi Finals',
    'payload': 'showMatchesForStage-semi_finals'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Final',
    'payload': 'showMatchesForStage-final'
  });
  elements.push(element);

  FacebookHelper.sendGenericTemplate(bot, message, elements);
}

view.showMatchesByStageMenu = function(bot, message) {
  var elements = [];

  var element = {}
  element.title = "Matches By Stage";
  element.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Group Stage 1',
    'payload': 'showMatchesForStage-md1'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group Stage 2',
    'payload': 'showMatchesForStage-md2'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Group Stage 3',
    'payload': 'showMatchesForStage-md3'
  });
  elements.push(element);

  element = {}
  element.title = "Matches By Stage";
  element.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Round Of 16',
    'payload': 'showMatchesForStage-round_of_16'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Quarter Finals',
    'payload': 'showMatchesForStage-quarter_finals'
  });
  element.buttons.push({
    'type': 'postback',
    'title': 'Semi Finals + Final',
    'payload': 'showMatchesForStage-semi_finals'
  });
  elements.push(element);

  FacebookHelper.sendGenericTemplate(bot, message, elements);
}

function buildStadiumElement(stadiumName, stadiumInfo) {
  var element = {}
  element.title = stadiumName;
  element.subtitle = "Located in " + stadiumInfo.location + ", " + stadiumInfo.seats + " seats";
  element.image_url = stadiumInfo.image;
  element.buttons = [];
  element.buttons.push({
    'type': 'postback',
    'title': 'Show Matches',
    'payload': 'showGamesInStadium-' + stadiumName
  });
  return element;
}

view.showStadiums = function(bot, message) {
	view.showMatchesByStadiumMenu(bot, message);
}

view.showMatchesByStadiumMenu = function(bot, message) {
  var elements = [];
  for (var key in Stadiums) {
    if (!Stadiums.hasOwnProperty(key)) continue;
    elements.push(buildStadiumElement(key, Stadiums[key]));
  }
  FacebookHelper.sendGenericTemplate(bot, message, elements);
}

function buildGameTeamElement(team, game) {
  var teamObj = {};
  teamObj.title = team.name + (game.status !== "Prematch" ? " (" + team.goals.length + ")" : "");
  teamObj.image_url = Flags[team.name];
  teamObj.subtitle = "";
  if (team.goals instanceof Array) {
    for (var iGoal = 0; iGoal < team.goals.length; iGoal++) {
      var curGoal = team.goals[iGoal];
      if (iGoal > 0) teamObj.subtitle += ", ";
      teamObj.subtitle += curGoal.time + " " + curGoal.player_name + (curGoal.notes && curGoal.notes.length > 0 ? " (" + curGoal.notes + ")" : "");
    }
  }
  teamObj.buttons = [];
  teamObj.buttons.push({
	type: 'postback',
	title: 'Main Menu',
	payload: 'showMainMenu'
  });
  teamObj.buttons.push({
	type: 'postback',
	title: 'Show Teams Games',
	payload: 'showMatchesForTeam-' + team.name
  });
  teamObj.buttons.push({
	type: 'postback',
	title: 'Show Teams Group',
	payload: 'showGroupForTeam-' + team.name
  });
  // teamObj.buttons.push({
  //   'type': 'postback',
  //   'title': 'Notify Me About ' + team.name,
  //   'payload': 'set_notifications_for_team_' + team.name
  // });
  return teamObj;
}

function buildGameVsElement(game) {
  var vsObj = {};
  vsObj.title = game.status;
  if (game.status === "Over") {
    vsObj.title += " - ";
    if (game.home_team.goals.length > game.away_team.goals.length) {
      vsObj.title += game.home_team.name + " won";
    } else if (game.home_team.goals.length < game.away_team.goals.length) {
      vsObj.title += game.away_team.name + " won";
    } else {
      vsObj.title += " Draw";
    }
  }
  if (game.status === "Prematch") {
    vsObj.subtitle = "Game will start ";
  } else {
    vsObj.subtitle = "Game started ";
  }
  vsObj.subtitle += game.time + " at " + game.location + "\n";
  vsObj.subtitle += Stadiums[game.location].location + " (" + Stadiums[game.location].seats + " seats)";
  vsObj.image_url = Stadiums[game.location].image;
  vsObj.buttons = [];
  vsObj.buttons.push({
	type: 'postback',
	title: 'Main Menu',
	payload: 'showMainMenu'
  });
  vsObj.buttons.push({
      'type': 'postback',
      'title': 'Show All Stadiums',
      'payload': 'showStadiums'
	});
  vsObj.buttons.push({
    'type': 'postback',
    'title': 'Show Stadium Matches',
    'payload': 'showGamesInStadium-' + game.location
  });
  if (game.status !== "Over") {
    // vsObj.buttons.push({
    //   'type': 'postback',
    //   'title': 'Notify Me About Game',
    //   'payload': 'set_notifications_for_game_' + game.id
    // });
  }
  return vsObj;
}

function buildGameElements(game) {
	var elements = [];
	elements.push(buildGameTeamElement(game.home_team, game));
	elements.push(buildGameVsElement(game));
	elements.push(buildGameTeamElement(game.away_team, game));
	return elements;
}

function buildGamesElements(games) {
	var allElements = [];
	for (var iGame = 0; iGame < games.length; iGame++) {
		allElements.push(buildGameElements(games[iGame]));
	}
	return allElements;
}

function sortTeamsByPoints(teams) {
  return teams.sort(function(a, b) {
    return (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0);
  });
}

function buildTeamElement(group, iTeam, team) {
	var curElement = {};
	curElement.title = group.name + (iTeam + 1) + " " + team.name;
	curElement.image_url = Flags[team.name];
	var goals_diff_sign = "";
	if (team.goals_scored - team.goals_taken > 0) goals_diff_sign = "+";
	if (team.goals_scored - team.goals_taken < 0) goals_diff_sign = "-";
	curElement.subtitle = "Pts: " + team.points + ", Plyd: " + team.games_played + ", W:" + team.games_won + ", D:" + team.games_draw + ", L:" + team.games_lost + ", F:" + team.goals_scored + ", A:" + team.goals_taken + ", (+/-): " + goals_diff_sign + (team.goals_scored - team.goals_taken);
	curElement.buttons = [];
	curElement.buttons.push({
		type: 'postback',
		title: 'Main Menu',
		payload: 'showMainMenu'
	});
	curElement.buttons.push({
		type: 'postback',
		title: 'Show Teams Games',
		payload: 'showMatchesForTeam-' + team.name
	});
	return curElement;
}

function buildGroupElements(group) {
	var elements = [];
	var teams = sortTeamsByPoints(group.teams);
	for (var iTeam = 0; iTeam < teams.length; iTeam++) {
		elements.push(buildTeamElement(group, iTeam, teams[iTeam]));
	}
	return elements;
}

function buildGroupsElements(groups) {
	var allElements = [];
	for (var iGroup = 0; iGroup < groups.length; iGroup++) {
		allElements.push(buildGroupElements(groups[iGroup]));
	}
	return allElements;
}

view.showAllGroups = function(bot, message) {
	Api.getGroups(function(groups) {
		FacebookHelper.sendMultipleGenericTemplates(bot, message, buildGroupsElements(groups));
	});
}

view.showGroup = function(bot, message, groupName) {
	Api.getGroup(function(groups) {
		FacebookHelper.sendMultipleGenericTemplates(bot, message, buildGroupsElements(groups));
	}, groupName);
}

view.showGroupForTeam = function(bot, message, teamName) {
	Api.getGroupOfTeam(function(groups) {
		FacebookHelper.sendMultipleGenericTemplates(bot, message, buildGroupsElements(groups));
	}, teamName);
}

function showMatches(bot, message, matches) {
	if (matches instanceof Array && matches.length > 0) {
		FacebookHelper.sendMultipleGenericTemplates(bot, message, matches);
	} else {
		bot.reply(message, "Sorry no relevant matches were found...");
	}
}

view.showNextGame = function(bot, message) {
	Api.getNextGame(function(games) {
		showMatches(bot, message, buildGamesElements(games));
	});
}

view.showMatchesForToday = function(bot, message) {
	Api.getGamesForToday(function(games) {
		showMatches(bot, message, buildGamesElements(games));
	});
}

view.showMatchesForTomorrow = function(bot, message) {
	Api.getGamesForTomorrow(function(games) {
		showMatches(bot, message, buildGamesElements(games));
	});
}

view.showMatchesForGroup = function(bot, message, groupName) {
	Api.getGamesForGroup(function(games) {
		showMatches(bot, message, buildGamesElements(games));
	}, groupName);
}

view.showMatchesForStage = function(bot, message, stageName) {
	Api.getGamesForStage(function(games) {
		showMatches(bot, message, buildGamesElements(games));
	}, stageName);
}

view.showMatchesForTeam = function(bot, message, teamName) {
	Api.getGamesOfTeam(function(games) {
		showMatches(bot, message, buildGamesElements(games));
	}, teamName);
}

view.showGamesInStadium = function(bot, message, stadiumName) {
	Api.getGamesInStadium(function(games) {
		showMatches(bot, message, buildGamesElements(games));
	}, stadiumName);
}

module.exports = view;