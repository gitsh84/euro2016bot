"use strict";

var request = require('request');
var Consts = require('./consts');
var Sentences = require('./sentences');
var Api = require('./mockApi');
var DateFormat = require('dateformat');
var MongoHelper = require('./mongoHelper');

function sortTeamsByPoints(teams) {
  return teams.sort(function(a, b) {
    return (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0);
  });
}

function buildGroupsObj(groups) {
  var allElements = [];
  if (groups instanceof Array) {
    for (var iGroup = 0; iGroup < groups.length; iGroup++) {
      var curGroup = groups[iGroup];
      if (curGroup.teams instanceof Array) {
        var elements = [];
        var teams = sortTeamsByPoints(curGroup.teams);
        for (var iTeam = 0; iTeam < teams.length; iTeam++) {
          var curElement = {};
          var curTeam = teams[iTeam];
          curElement.title = curGroup.name + (iTeam + 1) + " " + curTeam.name;
          curElement.image_url = Consts.FLAGS[curTeam.name];
          var goals_diff_sign = "";
          if (curTeam.goals_scored - curTeam.goals_taken > 0) goals_diff_sign = "+";
          if (curTeam.goals_scored - curTeam.goals_taken < 0) goals_diff_sign = "-";
          curElement.subtitle = "Pts: " + curTeam.points + ", Plyd: " + curTeam.games_played + ", W:" + curTeam.games_won + ", D:" + curTeam.games_draw + ", L:" + curTeam.games_lost + ", F:" + curTeam.goals_scored + ", A:" + curTeam.goals_taken + ", (+/-): " + goals_diff_sign + (curTeam.goals_scored - curTeam.goals_taken);
          curElement.buttons = [{
            type: 'postback',
            title: 'Show Teams Games',
            payload: 'show_games_for_' + curTeam.name
          }];
          elements[iTeam] = curElement;
        }
      }
      allElements[iGroup] = elements;
    }
  }
  return allElements;
}


function showMainMenuInternal(bot, message) {
  var menu = {};
  menu.title = "What do you want to see ?";
  menu.image_url = "http://www.allsoccerplanet.com/wp-content/uploads/2015/11/Euro-2016-official-logo.jpg";
  menu.buttons = [];
  menu.buttons.push({
    'type': 'postback',
    'title': 'Games by teams',
    'payload': 'games_by_teams'
  });
  menu.buttons.push({
    'type': 'postback',
    'title': 'Games by dates',
    'payload': 'games_by_dates'
  });
  menu.buttons.push({
    'type': 'postback',
    'title': 'Games by stage',
    'payload': 'games_by_stage'
  });
  // menu.buttons.push({
  //   'type': 'postback',
  //   'title': 'Games by stage',
  //   'payload': 'games_by_group'
  // });
  sendGenericTemplate(bot, message, menu);
}

function buildGameTeamObj(team, game) {
  var teamObj = {};
  teamObj.title = team.name + (game.status !== "Prematch" ? " (" + team.goals.length + ")" : "");
  teamObj.image_url = Consts.FLAGS[team.name];
  teamObj.subtitle = "";
  if (team.goals instanceof Array) {
    for (var iGoal = 0; iGoal < team.goals.length; iGoal++) {
      var curGoal = team.goals[iGoal];
      if (iGoal > 0) teamObj.subtitle += ", ";
      teamObj.subtitle += curGoal.time + " " + curGoal.player_name + (curGoal.notes && curGoal.notes.length > 0 ? " (" + curGoal.notes + ")" : "");
    }
  }
  teamObj.buttons = [];
  // if (game.status !== "Over") {
  //   teamObj.buttons.push({
  //     'type': 'web_url',
  //     'title': 'Bet on ' + team.name,
  //     'url': 'http://sports.winner.com/en/t/30901/Euro-2016-Matches'
  //   });
  // }
  teamObj.buttons.push({
    'type': 'postback',
    'title': 'Get notifications',
    'payload': 'set_notifications_for_team_' + team.name
  });
  return teamObj;
}

function buildGameVsObj(game) {
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
  vsObj.subtitle += Consts.STADIUMS[game.location].location + " (" + Consts.STADIUMS[game.location].seats + " seats)";
  vsObj.image_url = Consts.STADIUMS[game.location].image;
  if (game.status !== "Over") {
    vsObj.buttons = [];
    // vsObj.buttons.push({
    //   'type': 'web_url',
    //   'title': 'Bet on this game',
    //   'url': 'http://sports.winner.com/en/t/30901/Euro-2016-Matches'
    // });
    vsObj.buttons.push({
      'type': 'postback',
      'title': 'Set notifications',
      'payload': 'set_notifications_for_game_' + game.id
    });
  }
  return vsObj;
}

function buildGamesObj(games) {
  var allElements = [];
  if (games instanceof Array) {
    for (var iGame = 0; iGame < games.length; iGame++) {
      var curGame = games[iGame];
      var elements = [];
      elements[0] = buildGameTeamObj(curGame.home_team, curGame);
      elements[1] = buildGameVsObj(curGame);
      elements[2] = buildGameTeamObj(curGame.away_team, curGame);
      allElements[iGame] = elements;
    }
  }
  return allElements;
}

function showGroupsToUserInternal(bot, message, getterParams) {
  Api.getGroups(function(groups) {
    var obj_array = buildGroupsObj(groups);
    if (obj_array instanceof Array && obj_array.length > 0) {
      sendMultipleGenericTemplates(bot, message, obj_array);
    }
  }, getterParams);
}


function showGamesToUserInternal(bot, message, getter, getterParams) {
  console.log("showGamesToUserInternal started");
  getter(function(games) {
    console.log("showGamesToUserInternal getter callback");
    var obj_array = buildGamesObj(games);
    if (obj_array instanceof Array) {
      sendMultipleGenericTemplates(bot, message, obj_array);
    } else {
      bot.reply(message, "Sorry no such games...");
    }
  }, getterParams);
}

// see docs here: http://docs.cyrano.apiary.io
function translateMessage(userInfo, text, direction, callback) {
  if (!process.env.CYRANOAPI_HOST ||
    !process.env.CYRANOAPI_TOKEN ||
    !userInfo ||
    typeof text !== "string" ||
    text.length === 0) {
    console.log("translateMessage: don't have all the info needed to translate via API");
    callback();
    return;
  }
  console.log("translateMessage: building request");
  var url = process.env.CYRANOAPI_HOST + '/bots/euro2016/en/messages/' + direction;
  console.log("url: " + url);
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'cyrano:' + process.env.CYRANOAPI_TOKEN
  };
  var body = {
    user: {
      id: userInfo.user_id,
      gender: userInfo.gender
    },
    text: text
  };
  if(userInfo && userInfo.lang) {
    body.user.lang = userInfo.lang;
  }
  var bodyString = JSON.stringify(body);
  console.log("body of translate request: " + bodyString);
  httpPostJson(url, headers, bodyString, callback);
}

function translateUserMessageInternal(userInfo, text, callback) {
  translateMessage(userInfo, text, "in", callback)
}

function translateBotMessageInternal(userInfo, text, callback) {
  translateMessage(userInfo, text, "out", callback)
}

function findSuitableIntentInternal(message) {
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

function queryLuisNLP(message, callback) {
  if (!process.env.LUIS_NLP_TOKEN) {
    callback();
    return;
  }
  httpGetJson(Consts.LUIS_NLP_API + message.text, function(jsonResponse) {
    message.nlp = jsonResponse;
    callback(message);
  });
}

function getUserInfoInternal(userId, callback) {
  MongoHelper.getUserInfoFromMongo(userId, function(userInfo) {
    if (typeof userInfo !== "undefined") {
      console.log("Got the user info from mongoDB");
      callback(userInfo);
    } else {
      console.log("Can't find the user info in the mongoDB");
      httpGetJson(Consts.FACEBOOK_USER_PROFILE_API.replace("<USER_ID>", userId), function(userInfo) {
        userInfo.user_id = userId;
        MongoHelper.insertUserInfoToMongo(userInfo, callback);
      });
    }
  });
}

var utils = {
  randomFromArray: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  addInfoFromNLP: function(message, callback) {
    if (message.text && message.text.length > 0) {
      queryLuisNLP(message, callback);
    } else {
      callback(message);
    }
  },
  showGroupsToUser: function(bot, message) {
    showGroupsToUserInternal(bot, message);
  },
  showGamesToUser: function(bot, message, getter, getterParams) {
    showGamesToUserInternal(bot, message, getter, getterParams);
  },
  getUserInfo: function(userId, callback) {
    getUserInfoInternal(userId, callback);
  },
  findSuitableIntent: function(message) {
    return findSuitableIntentInternal(message);
  },
  translateUserMessage: function (userInfo, text, callback) {
    translateUserMessageInternal(userInfo, text, callback);
  },
  translateBotMessage: function (userInfo, text, callback) {
    translateBotMessageInternal(userInfo, text, callback);
  },
  showMainMenu: function (bot, message) {
    showMainMenuInternal(bot, message);
  }
}

module.exports = utils;