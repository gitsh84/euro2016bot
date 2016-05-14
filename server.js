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
var Utils = require('./utils');
var DateFormat = require('dateformat');

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
    } else {
      message.fullNameWithId = message.user;
    }
    Utils.sendUserMsgToAnalytics(message.fullNameWithId, message.text);
    //Utils.addInfoFromNLP(message, function(message) {
      next();
    //});
  });
});

controller.middleware.send.use(function(bot, message, next) {
  console.log(JSON.stringify(message));
  Utils.getUserInfo(message.channel, function(userInfo) {
    if (userInfo) {
      message.userInfo = userInfo;
      message.fullNameWithId = userInfo.first_name + "_" + userInfo.last_name + "_" + message.channel;
    } else {
      message.fullNameWithId = message.channel;
    }
    Utils.sendBotMsgToAnalytics(message.fullNameWithId, message.text || "-empty-");
    next();
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
controller.hears(Sentences.help_me, 'message_received', function(bot, message) {
  bot.reply(message, Sentences.help_message);
});

// User wants help.
controller.hears(["אאא","אבג"] , 'message_received', function(bot, message) {
  bot.reply(message, "הי !");
});

// Show the groups to the user.
controller.hears(Sentences.show_groups, 'message_received', function(bot, message) {
  Utils.showGroupsToUser(bot, message);
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
  var matchedIntent = Utils.findSuitableIntent(message);
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
  Utils.sendUserMsgToAnalytics("unknown_msgs", message.text);
}

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
