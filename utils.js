"use strict";

var request = require('request');
var Consts = require('./consts');
var Sentences = require('./sentences');
var Api = require('./mockApi');
var MongoClient = require('mongodb').MongoClient;
var DateFormat = require('dateformat');

function insertUserInfoToMongo(userInfo, callback) {
  console.log("insertUserInfoToMongo: " + Consts.MONGODB_URL);
  MongoClient.connect(Consts.MONGODB_URL, function(err, db) {
    console.log("Connected correctly to server: " + err);
    var col = db.collection(Consts.MONGODB_USER_INFO_COL);
    console.log("found the collection");
    col.insertOne(userInfo, function(err, r) {
      console.log("insert complete: " + err);
      db.close();
      console.log("db closed");
      callback();
    });
  });
}

function getUserInfoFromMongo(userId, callback) {
  console.log("getUserInfoFromMongo");
  MongoClient.connect(Consts.MONGODB_URL, function(err, db) {
    console.log("Connected correctly to server: " + err);
    var col = db.collection(Consts.MONGODB_USER_INFO_COL);
    console.log("found the collection: " + err);
    col.find({user_id : userId}).limit(1).toArray(function(err, docs) {
      db.close();
      if (docs instanceof Array && docs.length == 1) {
        console.log("Found the user in the mongo: " + docs[0]);
        callback(docs[0]);  
      } else {
        callback();
      }
    });
  });
}

function sendToAnalyticsInternal(sender, text, direction) {
  console.log("sendToAnalyticsInternal from sender " + sender + " with text: " + text);
  request({
      url: Consts.ANALYTICS_API,
      qs: {
        token: process.env.ANALYTICS_TOKEN
      },
      method: 'POST',
      json: {
        message: {
          text: text,
          message_type: direction,
          user_id: sender,
          conversation_id: sender + "-" + DateFormat(new Date(), "dd_mm_yy")
        }
      }
    },
    function(error, response, body) {
      if (error) {
        console.log('Error sending message to analytics: ', error);
      } else if (response.body.error) {
        console.log('Error in body response when sending message to analytics: ', response.body.error);
      }
    });
}

function sendWelcomeMessage() {
  request({
    url: Consts.FACEBOOK_WELCOME_MSG_URL,
    method: 'POST',
    json: {
      setting_type: "call_to_actions",
      thread_state: "new_thread",
      call_to_actions: [{
        message: {
          text: Sentences.page_welcome_msg
        }
      }]
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending welcome message: ', error);
    } else if (response.body.error) {
      console.log('Error in response body when sending welcome message: ', response.body.error);
    }
  });
}

function rpadwithspace(string, length) {
  var str = string;
  while (str.length < length)
    str = str + " ";
  return str;
}

function lpadwithspace(string, length) {
  var str = string;
  while (str.length < length)
    str = " " + str;
  return str;
}

function sortTeamsByPoints(teams) {
  return teams.sort(function(a, b) {
    return (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0);
  });
}

function buildGroupsText(groups) {
  var TEAM_NAME_PADDING = 20;
  var text_array = [];
  if (groups instanceof Array) {
    for (var iGroup = 0; iGroup < groups.length; iGroup++) {
      var text = "";
      var curGroup = groups[iGroup];
      if (curGroup.teams instanceof Array) {
        var teams = sortTeamsByPoints(curGroup.teams);
        text += rpadwithspace("Group " + curGroup.name, TEAM_NAME_PADDING);
        text += " P  W  D  L  F  A  +/-  Pts\n";
        //text += "----------------------------------------------------\n";
        for (var iTeam = 0; iTeam < teams.length; iTeam++) {
          var curTeam = teams[iTeam];
          text += rpadwithspace(curTeam.name, TEAM_NAME_PADDING);
          text += lpadwithspace("" + curTeam.games_played, 2);
          text += lpadwithspace("" + curTeam.games_won, 3);
          text += lpadwithspace("" + curTeam.games_draw, 3);
          text += lpadwithspace("" + curTeam.games_lost, 3);
          text += lpadwithspace("" + curTeam.goals_scored, 3);
          text += lpadwithspace("" + curTeam.goals_taken, 3);
          text += lpadwithspace("" + (curTeam.goals_scored - curTeam.goals_taken), 4);
          text += lpadwithspace("" + curTeam.points, 5);
          text += "\n";
        }
        //text += "----------------------------------------------------\n";
        text_array[iGroup] = text;
      }
    }
  }
  return text_array;
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
          curElement.image_url = curTeam.flag_url;
          curElement.subtitle = "Pts: " + curTeam.points + ", Plyd: " + curTeam.games_played + ", W:" + curTeam.games_won + ", D:" + curTeam.games_draw + ", L:" + curTeam.games_lost + ", GlsF:" + curTeam.goals_scored + ", GlsA:" + curTeam.goals_taken + ", Gls(+/-): " + (curTeam.goals_scored - curTeam.goals_taken);
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

function buildGameTeamObj(team, game) {
  var teamObj = {};
  teamObj.title = team.name + (game.status !== "Prematch" ? " (" + team.goals.length + ")" : "");
  teamObj.image_url = team.flag_url;
  teamObj.subtitle = "";
  if (team.goals instanceof Array) {
    for (var iGoal = 0; iGoal < team.goals.length; iGoal++) {
      var curGoal = team.goals[iGoal];
      if (iGoal > 0) teamObj.subtitle += ", ";
      teamObj.subtitle += curGoal.time + " " + curGoal.player_name + (curGoal.notes && curGoal.notes.length > 0 ? " (" + curGoal.notes + ")" : "");
    }
  }
  teamObj.buttons = [];
  if (game.status !== "Over") {
    teamObj.buttons.push({
      'type': 'web_url',
      'title': 'Bet on ' + team.name,
      'url': 'http://sports.winner.com/en/t/30901/Euro-2016-Matches'
    });
  }
  teamObj.buttons.push({
    'type': 'postback',
    'title': 'Set notifications',
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
  vsObj.subtitle += game.time + " at " + game.location;
  vsObj.image_url = game.location_image_url;
  if (game.status !== "Over") {
    vsObj.buttons = [{
      'type': 'web_url',
      'title': 'Bet on this game',
      'url': 'http://sports.winner.com/en/t/30901/Euro-2016-Matches'
    }, {
      'type': 'postback',
      'title': 'Set notifications',
      'payload': 'set_notifications_for_game_' + game.id
    }];
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

function showGroupsToUserAsText(bot, message) {
  Api.getGroups(function(groups) {
    var text_array = buildGroupsText(groups);
    if (text_array instanceof Array) {
      for (var iText = 0; iText < text_array.length; iText++) {
        var curText = text_array[iText];
        console.log(curText);
        //var textToSend = (typeof curText === "string" && curText.length > 0) ? curText : 'Not sure about the groups now...sorry :(';
        bot.reply(message, curText);
      }
    }
  });
}

/*
function showSpecificGroupToUserInternal(bot, message, groups, groupIndex) {
  if (typeof groupIndex !== "number") groupIndex = 0;
  if (groupIndex >= groups.length) return;
  console.log("Showing group index " + groupIndex);
  bot.reply(message, {
      attachment: {
        type: 'template';
        payload: {
          template_type: 'generic',
          elements: groups[groupIndex]
        }
      }
    },
    function() {
      var newGroupIndex = groupIndex + 1;
      showSpecificGroupToUserInternal(bot, message, groups, newGroupIndex);
    });
}
*/

function showGroupsToUserInternal(bot, message, getterParams) {
  Api.getGroups(function(groups) {
    var obj_array = buildGroupsObj(groups);
    if (obj_array instanceof Array && obj_array.length > 0) {
      sendMultipleAttachmentsOneByOne(bot, message, obj_array);
    }
  }, getterParams);
}

function sendMultipleAttachmentsOneByOne(bot, message, arr, index) {
  if (typeof index !== "number") index = 0;
  if (index >= arr.length) return;
  console.log("Showing index " + index);
  bot.reply(message, {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: arr[index]
        }
      }
    },
    function() {
      var newIndex = index + 1;
      sendMultipleAttachmentsOneByOne(bot, message, arr, newIndex);
    });
}

function showGamesToUserInternal(bot, message, getter, getterParams) {
  console.log("showGamesToUserInternal started");
  getter(function(games) {
    console.log("showGamesToUserInternal getter callback");
    var obj_array = buildGamesObj(games);
    if (obj_array instanceof Array) {
      sendMultipleAttachmentsOneByOne(bot, message, obj_array);
      /*
      for (var iObj = 0; iObj < obj_array.length; iObj++) {
        var curObj = obj_array[iObj];
        var attachment = {};
        attachment.type = 'template';
        attachment.payload = {
          template_type: 'generic',
          elements: curObj
        };
        (function() {
          var timeout = 2000 * iObj;
          var msgAttachment = attachment;
          setTimeout(function() {
            bot.reply(message, {
              attachment: msgAttachment
            });
          }, timeout);
        }());
      }
      */
    } else {
      bot.reply(message, "Sorry no such games...");
    }
  }, getterParams);
}

function httpGetJson(url, callback) {
  request({
    url: url,
    method: 'GET'
  }, function(error, response, body) {
    if (error) {
      console.error('Error http get ' + url, error);
    } else if (response.body.error) {
      console.error('Error in response body for http get ' + url, response.body.error);
    } else {
      try {
        console.log(response.body);
        var jsonResponse = JSON.parse(response.body);
        callback(jsonResponse);
        return;
      } catch (e) {
        console.error('Error parsing json response from http get ' + url);
      }
    }
    callback();
  });
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
  httpGetJson(Consts.LUIS_NLP_API + message.text, function(jsonResponse) {
    message.nlp = jsonResponse;
    callback(message);
  });
}

function getUserInfoInternal(userId, callback) {
  getUserInfoFromMongo(userId, function(userInfo) {
    if (typeof userInfo !== "undefined") {
      console.log("Got the user info from mongoDB");
      callback(userInfo);
    } else {
      console.log("Can't find the user info in the mongoDB");
      httpGetJson(Consts.FACEBOOK_USER_PROFILE_API.replace("<USER_ID>", userId), function(userInfo) {
        userInfo.user_id = userId;
        insertUserInfoToMongo(userInfo, callback);
      });
    }
  });
}

var utils = {
  setWelcomeMessage: function() {
    sendWelcomeMessage();
  },
  randomFromArray: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  sendUserMsgToAnalytics: function(sender, text) {
    sendToAnalyticsInternal(sender, text, "incoming");
  },
  sendBotMsgToAnalytics: function(sender, text) {
    sendToAnalyticsInternal(sender, text, "outgoing");
  },
  sendToAnalytics: function(sender, text, direction) {
    sendToAnalyticsInternal(sender, text, direction);
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
  }
}

module.exports = utils;