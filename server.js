"use strict";

// TODOs:
// If sentence is unknown send to special conversation.
// show team group
// show team games
// show live games
// show group A|B|C
// show next games
// show quarter/semi/final game
// show team stats/info
// save user data to mongo as cache
// Notifications about game events

var Botkit = require('botkit');
var Sentences = require('./sentences');
var Api = require('./mockApi');
var View = require('./view');
var Utils = require('./utils');
var DateFormat = require('dateformat');
var FacebookHelper = require('./facebookHelper');
var PostBackHelper = require('./postBackHelper');
var AnalyticsHelper = require('./analyticsHelper');
var TranslateHelper = require('./translateHelper');
var NlpHelper = require('./nlpHelper');
var UserInfoCache = {};

var controller = Botkit.facebookbot({
  access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN
})

var bot = controller.spawn({});

// Set up the welcome message.
if (process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
  FacebookHelper.setWelcomeMessage();
}

// Start web server.
var webServerPort = process.env.PORT || 8080;
controller.setupWebserver(webServerPort, function(err, webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function() {
  });
});

// Log the message and add more info to the message.
controller.middleware.receive.use(function(bot, message, next) {
  Utils.getUserInfo(message.user, function(userInfo) {
    if (userInfo) {
      message.userInfo = userInfo;
      message.fullNameWithId = userInfo.first_name + "_" + userInfo.last_name + "_" + message.user;
    } else {
      message.fullNameWithId = message.user;
    }
    AnalyticsHelper.sendUserMsgToAnalytics(message.fullNameWithId, message.text);
    translateHelper.translateUserMessage(userInfo, message.text, function(translationApiResponse) {
      if(translationApiResponse && translationApiResponse.translation && translationApiResponse.translation.length > 0) {
        console.log("Text - " + message.text + " - was translated to - " + translationApiResponse.translation);
        message.text = translationApiResponse.translation;
        if (!UserInfoCache[message.user]) {
          UserInfoCache[message.user] = {};
        }
        UserInfoCache[message.user].text_original_lang = translationApiResponse.user.lang;
      }
      NlpHelper.addInfoFromNLP(message, function(message) {
        next();
      });
    });
  });
});

controller.middleware.send.use(function(bot, message, next) {
  console.log(JSON.stringify(message));
  Utils.getUserInfo(message.channel, function(userInfo) {
    if (userInfo) {
      if (UserInfoCache[message.channel] && UserInfoCache[message.channel].text_original_lang) {
        userInfo.lang = UserInfoCache[message.channel].text_original_lang;
        console.log("user lang for translation: " + userInfo.lang);
      }
      message.userInfo = userInfo;
      message.fullNameWithId = userInfo.first_name + "_" + userInfo.last_name + "_" + message.channel;
    } else {
      message.fullNameWithId = message.channel;
    }
    AnalyticsHelper.sendBotMsgToAnalytics(message.fullNameWithId, message.text || "-empty-");
    translateHelper.translateBotMessage(userInfo, message.text, function(translationApiResponse) {
      if(translationApiResponse && translationApiResponse.translation && translationApiResponse.translation.length > 0) {
        console.log("Text - " + message.text + " - was translated to - " + translationApiResponse.translation);
        message.text = translationApiResponse.translation;
      }
      next();
    });
  });
});

// User clicked the send-to-messenger plugin.
controller.on('facebook_optin', function(bot, message) {
  bot.reply(message, 'Hey, welcome !');
});

// User said hello.
controller.hears(Sentences.user_welcoming_messages, 'message_received', function(bot, message) {
  bot.reply(message, Utils.randomFromArray(Sentences.bot_welcoming_messages));
});

// User said thanks.
controller.hears(Sentences.user_says_thanks, 'message_received', function(bot, message) {
  bot.reply(message, Utils.randomFromArray(Sentences.bot_says_you_are_welcome));
});

// User wants help.
controller.hears(["menu"], 'message_received', function(bot, message) {
  View.showMainMenu(bot, message);
});

// User wants main menu.
controller.hears(Sentences.help_me, 'message_received', function(bot, message) {
  bot.reply(message, Sentences.help_message);
});

// Show the groups to the user.
controller.hears(Sentences.show_groups, 'message_received', function(bot, message) {
  View.showGroupsToUser(bot, message);
});

// Show the games of a specific team to the user.
controller.hears(Sentences.show_team_games, 'message_received', function(bot, message) {
  var team = null;
  if (message.match.length > 2) {
    team = message.match[2];
  }
  if (typeof team === "string" && team.length > 0) {
    console.log("Show games for " + team);
    //bot.reply(message, "You want to see games for " + team + " ?");
    Utils.showGamesToUser(bot, message, Api.getGamesOfTeam, team);
  } else {
    notSureWhatUserWants(bot, message);
  }
});

// Show the games of a specific team to the user #2.
controller.hears(Sentences.show_games_for_team, 'message_received', function(bot, message) {
  var team = null;
  if (message.match.length > 4) {
    team = message.match[4];
  }
  if (typeof team === "string" && team.length > 0) {
    console.log("Show games for " + team);
    //bot.reply(message, "You want to see games for " + team + " ?");
    Utils.showGamesToUser(bot, message, Api.getGamesOfTeam, team);
  } else {
    notSureWhatUserWants(bot, message);
  }
});


// Show the group of a specific team to the user.
controller.hears(Sentences.show_team_group, 'message_received', function(bot, message) {
  var team = null;
  if (message.match.length > 2) {
    team = message.match[2];
  }
  if (typeof team === "string" && team.length > 0) {
    console.log("Show group for " + team);
    //bot.reply(message, "You want to see games for " + team + " ?");
    Utils.showGroupsToUser(bot, message, Api.getGroupOfTeam, team);
  } else {
    notSureWhatUserWants(bot, message);
  }
});

// Show the games of a specific team to the user #2.
controller.hears(Sentences.show_group_for_team, 'message_received', function(bot, message) {
  var team = null;
  if (message.match.length > 4) {
    team = message.match[4];
  }
  if (typeof team === "string" && team.length > 0) {
    console.log("Show group for " + team);
    //bot.reply(message, "You want to see games for " + team + " ?");
    Utils.showGroupsToUser(bot, message, Api.getGroupOfTeam, team);
  } else {
    notSureWhatUserWants(bot, message);
  }
});

// Show live games.
controller.hears(Sentences.show_live_games, 'message_received', function(bot, message) {
  console.log("Show live games to user");
  Utils.showGamesToUser(bot, message, Api.getLiveGames);
});

// Show todays games.
controller.hears(Sentences.show_games_today, 'message_received', function(bot, message) {
  console.log("Show todays games to user");
  Utils.showGamesToUser(bot, message, Api.getGamesByDate, DateFormat(new Date(), "dd/mm/yy"));
});

// Test
controller.hears(['test'], 'message_received', function(bot, message) {
  bot.startConversation(message, function(err, convo) {
     convo.say('Ok...');
     convo.ask('What are you testing ?', function(response, convo) {
       convo.say('yeah, let\'s test ' + response.text);
       convo.next();
    });
  });
});

// Not suer what the users wants. Final fallback.
controller.on('message_received', function(bot, message) {
  console.log("Reached unknown user message");
  var matchedIntent = NlpHelper.findSuitableIntent(message);
  if (matchedIntent) {
    console.log("Found intent: " + matchedIntent);
    bot.reply(message, "Did you mean " + matchedIntent + " ?");
  } else {
    notSureWhatUserWants(bot, message);
  }
  return false;
});

function notSureWhatUserWants(bot, message) {
  console.log("No idea what the user wants...");
  bot.reply(message, Utils.randomFromArray(Sentences.bot_not_sure_what_user_means));
  AnalyticsHelper.sendUserMsgToAnalytics("unknown_msgs", message.text);
}

// Facebook postsbacks.
controller.on('facebook_postback', function(bot, message) {
  AnalyticsHelper.sendUserMsgToAnalytics(message.user, "facebook_postback-" + message.payload);
  PostBackHelper.handlePostBack(bot, message, message.payload);
});
