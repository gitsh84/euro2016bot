"use strict";

var Botkit = require('botkit');
var Request = require('request');
var Sentences = require('./sentences');
var Api = require('./mockApi');

var FACEBOOK_PAGE_ID = "1559094254390341";
var FACEBOOK_WELCOME_MSG_URL = "https://graph.facebook.com/v2.6/" + FACEBOOK_PAGE_ID + "/thread_settings?access_token=" + process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
var analytics_api = "http://api.bot-metrics.com/v1/messages";
var analytics_token = "5AteSPSLuGtNqSoVR9x4vaGD";

var controller = Botkit.facebookbot({
  access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
})

var bot = controller.spawn({});

// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
var webServerPort = process.env.PORT || 8080;
controller.setupWebserver(webServerPort, function(err, webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function() {
    console.log('This bot is online!!!');
    // Set up the welcome message:
    setWelcomeMessage();
  });
});

// this is triggered when a user clicks the send-to-messenger plugin
controller.on('facebook_optin', function(bot, message) {
  bot.reply(message, 'Welcome to my app!');
});

// user said hello
controller.hears(Sentences.welcoming_messages, 'message_received', function(bot, message) {
  bot.reply(message, 'Hey, good to see ya !');
});

function sendToAnalytics(sender, text, direction) {
  request({
      url: analytics_api,
      qs: {
        token: analytics_token
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
  var welcome_message = "Welcome !";
  request({
    url: FACEBOOK_WELCOME_MSG_URL,
    method: 'POST',
    json: {
      message: {
        text: welcome_message
      }
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
          curElement.subtitle = "Points: " + curTeam.points
          + ", Played: " + curTeam.games_played
          + ", Won:" + curTeam.games_won
          + ", Draw:" + curTeam.games_draw
          + ", Lost:" + curTeam.games_lost
          + ", Goals For:" + curTeam.goals_scored
          + ", Goals Against:" + curTeam.goals_taken
          + ", Goals (+/-): " + (curTeam.goals_scored - curTeam.goals_taken);
          curElement.buttons = [{
            type: 'postback',
            title: 'Show stats',
            payload: 'show_stats_for_' + curTeam.name
          }];
          elements[iTeam] = curElement;
        }
      }
      allElements[iGroup] = elements;
    }
  }
  return allElements;
}

function showGroupsToUser(bot, message) {
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
          var timeout = 1000*iObj;
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

controller.hears(Sentences.show_groups, 'message_received', function(bot, message) {
  showGroupsToUser(bot, message);
});

controller.hears(['cookies'], 'message_received', function(bot, message) {
  bot.startConversation(message, function(err, convo) {
    convo.say('Did someone say cookies!?!!');
    convo.ask('What is your favorite type of cookie?', function(response, convo) {
      convo.say('Golly, I love ' + response.text + ' too!!!');
      convo.next();
    });
  });
});

controller.hears('test', 'message_received', function(bot, message) {
  var attachment = {
    'type': 'template',
    'payload': {
      'template_type': 'generic',
      'elements': [{
        'title': 'Chocolate Cookie',
        'image_url': 'https://www.hamptoncreek.com/img/p-just-cookies/panel-cookie-choc-cookie.png',
        'subtitle': 'A delicious chocolate cookie',
        'buttons': [{
          'type': 'postback',
          'title': 'Eat Cookie',
          'payload': 'chocolate'
        }]
      }, ]
    }
  };
  bot.reply(message, {
    attachment: attachment,
  });
});

controller.on('facebook_postback', function(bot, message) {
  if (message.payload == 'chocolate') {
    bot.reply(message, 'You ate the chocolate cookie!')
  } else if (message.payload.indexOf('show_stats_for_') === 0) {
    var teamName = message.payload.replace("show_stats_for_","");
    bot.reply(message, 'Stats for ' + teamName);
  }
});

controller.on('message_received', function(bot, message) {
    bot.reply(message, 'Oopsy oops...not sure what you mean by that :(');
    return false;
});