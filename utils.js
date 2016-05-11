"use strict";

function sendToAnalytics(sender, text, direction) {
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
            conversation_id: sender // Conv ID can (and should) be different from user id...but for now it is good enough.
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

  function setWelcomeMessage() {
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
    return teams.sort(function(a,b) {return (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0);} );
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
            curElement.title = "#" + (iTeam+1) + " " + curTeam.name;
            curElement.image_url = curTeam.flag_url;
            curElement.subtitle = "Pts: " + curTeam.points
            + ", Plyd: " + curTeam.games_played
            + ", W:" + curTeam.games_won
            + ", D:" + curTeam.games_draw
            + ", L:" + curTeam.games_lost
            + ", GlsF:" + curTeam.goals_scored
            + ", GlsA:" + curTeam.goals_taken
            + ", Gls(+/-): " + (curTeam.goals_scored - curTeam.goals_taken);
            curElement.buttons = [{
              type: 'postback',
              title: 'Show Games',
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
          if(iGoal > 0) teamObj.subtitle += ", ";
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
      },
      {
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
    Api.getGroups(function(groups){
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

var utils = {
  randomFromArray: function(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  },
  sendUserMsgToAnalytics: function(message) {
    sendToAnalytics(message.user, message.text, "incoming");
  },
  addInfoFromNLP: function(message, callback) {
    callback(message);
  },
  showGroupsToUser: function(bot, message) {
    Api.getGroups(function(groups){
      var obj_array = buildGroupsObj(groups);
      if (obj_array instanceof Array) {
        for (var iObj = 0; iObj < obj_array.length; iObj++) {
          var curObj = obj_array[iObj];
          var attachment = {};
          attachment.type = 'template';
          attachment.payload = {
            template_type: 'generic',
            elements: curObj
          };
          (function(){
            var timeout = 2000*iObj;
            var msgAttachment = attachment;
            var groupIndex = iObj;
            setTimeout(function() {
              bot.reply(message, "Here is group " + String.fromCharCode(97 + groupIndex).toUpperCase());
            }, timeout - 500);
            setTimeout(function() {
              bot.reply(message, {
                attachment: msgAttachment,
              });
            }, timeout);
          }());
        }
      }
    });
  },
  showGamesToUser: function(bot, message, getter) {
    getter(function(games){
      var obj_array = buildGamesObj(games);
      if (obj_array instanceof Array) {
        for (var iObj = 0; iObj < obj_array.length; iObj++) {
          var curObj = obj_array[iObj];
          var attachment = {};
          attachment.type = 'template';
          attachment.payload = {
            template_type: 'generic',
            elements: curObj
          };
          (function(){
            var timeout = 2000*iObj;
            var msgAttachment = attachment;
            setTimeout(function() {
              bot.reply(message, {
                attachment: msgAttachment
              });
            }, timeout);
          }());
        }
      }
    });
  }
}

module.exports = utils;