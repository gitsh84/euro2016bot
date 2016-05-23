"use strict";

var request = require('request');
var Consts = require('./consts');
var Sentences = require('./sentences');
var Api = require('./mockApi');
var DateFormat = require('dateformat');
var facebookHelper = {};

facebookHelper.setWelcomeMessageStructuredMessage = function(elements) {
  request({
    url: Consts.FACEBOOK_WELCOME_MSG_URL,
    method: 'POST',
    json: {
      setting_type: "call_to_actions",
      thread_state: "new_thread",
      call_to_actions: [{
        message: {
          attachment:{
            type: "template",
            payload: {
              template_type: "generic",
              elements: elements
            }
          }
        }
      }]
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error setting welcome message: ', error);
    } else if (response.body.error) {
      console.log('Error in response body when setting welcome message: ', response.body.error);
    }
  });
}

facebookHelper.setWelcomeMessage = function(text) {
  request({
    url: Consts.FACEBOOK_WELCOME_MSG_URL,
    method: 'POST',
    json: {
      setting_type: "call_to_actions",
      thread_state: "new_thread",
      call_to_actions: [{
        message: {
          text: text
        }
      }]
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error setting welcome message: ', error);
    } else if (response.body.error) {
      console.log('Error in response body when setting welcome message: ', response.body.error);
    }
  });
}

facebookHelper.sendGenericTemplate = function(bot, message, elements, callback) {
  if (!(elements instanceof Array)) {
    elements = [elements];
  }
  bot.reply(message, {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: elements
      }
    }
  },
  callback);
}

facebookHelper.sendMultipleGenericTemplates = function(bot, message, arr, index) {
  if (typeof index !== "number") index = 0;
  if (index >= arr.length) return;
  facebookHelper.sendGenericTemplate(bot, message, arr[index], function() {
    var newIndex = index + 1;
    facebookHelper.sendMultipleGenericTemplates(bot, message, arr, newIndex);
  });
}

module.exports = facebookHelper;