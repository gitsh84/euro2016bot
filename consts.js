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

var teams_flags = {
  "Albania": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/2000px-Flag_of_Albania.svg.png",
  "Austria": "https://upload.wikimedia.org/wikipedia/commons/7/76/Flag_of_Austria.png",
  "Belgium": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/2000px-Flag_of_Belgium.svg.png",
  "Croatia": "https://upload.wikimedia.org/wikipedia/commons/1/18/Flag_of_Croatia.png",
  "Czech Republic": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/2000px-Flag_of_the_Czech_Republic.svg.png",
  "England": "https://upload.wikimedia.org/wikipedia/commons/e/ef/England_flag.png",
  "France": "https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png",
  "Germany": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2000px-Flag_of_Germany.svg.png",
  "Hungary": "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Hungary.png",
  "Iceland": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Iceland.png",
  "Italy": "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/640px-Flag_of_Italy.svg.png",
  "Northern Ireland": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Northern_Ireland.svg/2000px-Flag_of_Northern_Ireland.svg.png",
  "Poland": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Poland-white_bg.png",
  "Portugal": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/2000px-Flag_of_Portugal.svg.png",
  "Republic of Ireland": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1280px-Flag_of_Ireland.svg.png",
  "Romania": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Romania.png",
  "Russia": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Russia.png",
  "Slovakia": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/2000px-Flag_of_Slovakia.svg.png",
  "Spain": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png",
  "Sweden": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1280px-Flag_of_Sweden.svg.png",
  "Switzerland": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_(Pantone).svg/2000px-Flag_of_Switzerland_(Pantone).svg.png",
  "Turkey": "https://upload.wikimedia.org/wikipedia/commons/8/87/Flag_of_Turkey.png",
  "Ukraine": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/2000px-Flag_of_Ukraine.svg.png",
  "Wales": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Wales_2.svg/2000px-Flag_of_Wales_2.svg.png"
};

var stadiums = {
  "Stade de France": {
      seats: 80000,
      location: "Saint-Denis",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/Venues/02/04/30/30/2043030_w1.jpg"
  },
  "Stade Velodrome": {
      seats: 67000,
      location: "Marseille",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/Comp_Matches/02/33/06/76/2330676_w1.jpg"
  },
  "Stade de Lyon": {
      seats: 59000,
      location: "Lyon",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/Comp_Matches/02/33/06/65/2330665_w1.jpg"
  },
  "Stade Pierre Mauroy": {
      seats: 50000,
      location: "Lille",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/Venues/02/04/29/63/2042963_w3.jpg"
  },
  "Parc des Princes": {
      seats: 45000,
      location: "Paris",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/Comp_Matches/02/32/92/15/2329215_w1.jpg"
  },
  "Stade de Bordeaux": {
      seats: 42000,
      location: "Bordeaux",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/General/02/24/95/75/2249575_w1.jpg"
  },
  "Stade Geoffroy-Guichard": {
      seats: 42000,
      location: "Saint-Etienne",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/Comp_Matches/02/33/06/58/2330658_w1.jpg"
  },
  "Stade de Nice": {
      seats: 35000,
      location: "Nice",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/General/01/99/98/08/1999808_w3.jpg"
  },
  "Stade Bollaert-Delelis": {
      seats: 35000,
      location: "Lens",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/Comp_Matches/02/33/05/87/2330587_w1.jpg"
  },
  "Stadium de Toulouse": {
      seats: 33000,
      location: "Toulouse",
      image: "http://img.uefa.com/MultimediaFiles/Photo/competitions/DomesticLeague/02/32/47/71/2324771_w1.jpg"
  }
};

var consts = {
	TEAMS: teams_array,
  FLAGS: teams_flags,
  STADIUMS: stadiums,
	FACEBOOK_WELCOME_MSG_URL: "https://graph.facebook.com/v2.6/" + process.env.FACEBOOK_PAGE_ID + "/thread_settings?access_token=" + process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
	FACEBOOK_USER_PROFILE_API: "https://graph.facebook.com/v2.6/<USER_ID>?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=" + process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  MONGO_DB_URL: "mongodb://" + process.env.MONGO_DB_USER + ":" + process.env.MONGO_DB_USER + "@" + process.env.MONGO_DB_HOST + ":" + process.env.MONGO_DB_PORT + "/" + process.env.MONGO_DB_NAME,
  MONGO_DB_USER_INFO_COL: "user_info",
	ANALYTICS_API: "http://api.bot-metrics.com/v1/messages",
	LUIS_NLP_API: "https://api.projectoxford.ai/luis/v1/application?id=f087a4b1-ce4c-4eb0-b2fb-35c0afd1b3b8&subscription-key=" + process.env.LUIS_NLP_TOKEN + "&q=",
	LUIS_MIN_SCORE: 0.6
};

module.exports = consts;