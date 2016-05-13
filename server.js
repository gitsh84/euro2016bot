"use strict";

var Botkit = require('botkit');
var Sentences = require('./sentences');
var Api = require('./mockApi');
var Utils = require('./utils');

var controller = Botkit.facebookbot({
  access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN
})

var bot = controller.spawn({});

// Set up the welcome message.
if (process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
  Utils.setWelcomeMessage();
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
    }
    Utils.sendUserMsgToAnalytics(message.fullNameWithId || message.user, message.text);
    Utils.addInfoFromNLP(message, function(message) {
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
  //Utils.sendUserMsgToAnalytics(message);
  bot.reply(message, Utils.randomFromArray(Sentences.bot_welcoming_messages));
});

// User said thanks.
controller.hears(Sentences.user_says_thanks, 'message_received', function(bot, message) {
  //Utils.sendUserMsgToAnalytics(message);
  bot.reply(message, Utils.randomFromArray(Sentences.bot_says_you_are_welcome));
});

// User wants help.
controller.hears(Sentences.help_me, 'message_received', function(bot, message) {
  //Utils.sendUserMsgToAnalytics(message);
  bot.reply(message, Sentences.help_message);
});

// Show the groups to the user.
controller.hears(Sentences.show_groups, 'message_received', function(bot, message) {
  //Utils.sendUserMsgToAnalytics(message);
  Utils.showGroupsToUser(bot, message);
});

controller.hears(['cookies'], 'message_received', function(bot, message) {
  // bot.startConversation(message, function(err, convo) {
  //   convo.say('Did someone say cookies!?!!');
  //   convo.ask('What is your favorite type of cookie?', function(response, convo) {
  //     convo.say('Golly, I love ' + response.text + ' too!!!');
  //     convo.next();
  //   });
  // });
});

// Not suer what the users wants. Final fallback.
controller.on('message_received', function(bot, message) {
  //Utils.sendUserMsgToAnalytics(message);
  bot.reply(message, Utils.randomFromArray(Sentences.bot_not_sure_what_user_means));
  return false;
});

// Facebook postsbacks.
controller.on('facebook_postback', function(bot, message) {
  Utils.sendToAnalytics(message.user, "facebook_postback-" + message.payload, "incoming");
  if (message.payload.indexOf('show_games_for_') === 0) {
    var teamName = message.payload.replace("show_games_for_","");
    bot.reply(message, 'Games for ' + teamName);
    Utils.showGamesToUser(bot, message, Api.getGames);
  } else if (message.payload.indexOf('set_notifications_for_team_') === 0) {
    var team = message.payload.replace("set_notifications_for_team_","");
    bot.reply(message, "Sure thing ! You will get notifications for " + team + " from now on.");
  } else if (message.payload.indexOf('set_notifications_for_game_') === 0) {
    var gameId = message.payload.replace("set_notifications_for_game_","");
    bot.reply(message, "Sure thing ! You will get notifications for this game from now on.");
  }
});
