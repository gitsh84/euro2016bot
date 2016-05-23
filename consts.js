"use strict";

var team_names = {
  Albania: "Albania",
  Austria: "Austria",
  Belgium: "Belgium",
  Croatia: "Croatia",
  Czech_Republic: "Czech Republic",
  England: "England",
  France: "France",
  Germany: "Germany",
  Hungary: "Hungary",
  Iceland: "Iceland",
  Italy: "Italy",
  Northern_Ireland: "Northern Ireland",
  Poland: "Poland",
  Portugal: "Portugal",
  Republic_of_Ireland: "Republic of Ireland",
  Romania: "Romania",
  Russia: "Russia",
  Slovakia: "Slovakia",
  Spain: "Spain",
  Sweden: "Sweden",
  Switzerland: "Switzerland",
  Turkey: "Turkey",
  Ukraine: "Ukraine",
  Wales: "Wales"
};

var teams_array = [];
teams_array.push(team_names.Albania);
teams_array.push(team_names.Austria);
teams_array.push(team_names.Belgium);
teams_array.push(team_names.Croatia);
teams_array.push(team_names.Czech_Republic);
teams_array.push(team_names.England);
teams_array.push(team_names.France);
teams_array.push(team_names.Germany);
teams_array.push(team_names.Hungary);
teams_array.push(team_names.Iceland);
teams_array.push(team_names.Italy);
teams_array.push(team_names.Northern_Ireland);
teams_array.push(team_names.Poland);
teams_array.push(team_names.Portugal);
teams_array.push(team_names.Republic_of_Ireland);
teams_array.push(team_names.Romania);
teams_array.push(team_names.Russia);
teams_array.push(team_names.Slovakia);
teams_array.push(team_names.Spain);
teams_array.push(team_names.Sweden);
teams_array.push(team_names.Switzerland);
teams_array.push(team_names.Turkey);
teams_array.push(team_names.Ukraine);
teams_array.push(team_names.Wales);

var consts = {
	TEAMS: teams_array,
	FACEBOOK_WELCOME_MSG_URL: "https://graph.facebook.com/v2.6/" + process.env.FACEBOOK_PAGE_ID + "/thread_settings?access_token=" + process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
	FACEBOOK_USER_PROFILE_API: "https://graph.facebook.com/v2.6/<USER_ID>?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=" + process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  MONGO_DB_URL: "mongodb://" + process.env.MONGO_DB_USER + ":" + process.env.MONGO_DB_USER + "@" + process.env.MONGO_DB_HOST + ":" + process.env.MONGO_DB_PORT + "/" + process.env.MONGO_DB_NAME,
  MONGO_DB_USER_INFO_COL: "user_info",
	ANALYTICS_API: "http://api.bot-metrics.com/v1/messages",
	LUIS_NLP_API: "https://api.projectoxford.ai/luis/v1/application?id=f087a4b1-ce4c-4eb0-b2fb-35c0afd1b3b8&subscription-key=" + process.env.LUIS_NLP_TOKEN + "&q=",
	LUIS_MIN_SCORE: 0.6
};

module.exports = consts;