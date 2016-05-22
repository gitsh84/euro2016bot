"use strict";

var games = [{
	id: 1,
	type: "md1",
	group: "A",
	status: "Prematch",
	location: "Stade de France",
	time: "10/06/2016 22:00",
	home_team: {
		name: "France",
		goals: []
	},
	away_team: {
		name: "Romania",
		goals: []
	}
}, {
	id: 2,
	type: "md1",
	group: "A",
	status: "Prematch",
	location: "Stade Bollaert-Delelis",
	time: "11/06/2016 16:00",
	home_team: {
		name: "Albania",
		goals: []
	},
	away_team: {
		name: "Switzerland",
		goals: []
	}
}, {
	id: 3,
	type: "md1",
	group: "B",
	status: "Prematch",
	location: "Stade de Bordeaux",
	time: "11/06/2016 19:00",
	home_team: {
		name: "Wales",
		goals: []
	},
	away_team: {
		name: "Slovakia",
		goals: []
	}
}, {
	id: 4,
	type: "md1",
	group: "B",
	status: "Prematch",
	location: "Stade Velodrome",
	time: "11/06/2016 22:00",
	home_team: {
		name: "England",
		goals: []
	},
	away_team: {
		name: "Russia",
		goals: []
	}
}, {
	id: 5,
	type: "md1",
	group: "D",
	status: "Prematch",
	location: "Parc des Princes",
	time: "12/06/2016 16:00",
	home_team: {
		name: "Turkey",
		goals: []
	},
	away_team: {
		name: "Croatia",
		goals: []
	}
}, {
	id: 6,
	type: "md1",
	group: "C",
	status: "Prematch",
	location: "Stade de Nice",
	time: "12/06/2016 19:00",
	home_team: {
		name: "Poland",
		goals: []
	},
	away_team: {
		name: "Northern Ireland",
		goals: []
	}
}, {
	id: 7,
	type: "md1",
	group: "C",
	status: "Prematch",
	location: "Stade Pierre Mauroy",
	time: "12/06/2016 22:00",
	home_team: {
		name: "Germany",
		goals: []
	},
	away_team: {
		name: "Ukraine",
		goals: []
	}
}, {
	id: 8,
	type: "md1",
	group: "D",
	status: "Prematch",
	location: "Stadium de Toulouse",
	time: "13/06/2016 16:00",
	home_team: {
		name: "Spain",
		goals: []
	},
	away_team: {
		name: "Czech Republic",
		goals: []
	}
}, {
	id: 9,
	type: "md1",
	group: "E",
	status: "Prematch",
	location: "Stade de France",
	time: "13/06/2016 19:00",
	home_team: {
		name: "Republic of Ireland",
		goals: []
	},
	away_team: {
		name: "Sweden",
		goals: []
	}
}, {
	id: 10,
	type: "md1",
	group: "E",
	status: "Prematch",
	location: "Stade de Lyon",
	time: "13/06/2016 22:00",
	home_team: {
		name: "Belgium",
		goals: []
	},
	away_team: {
		name: "Italy",
		goals: []
	}
}, {
	id: 11,
	type: "md1",
	group: "F",
	status: "Prematch",
	location: "Stade de Bordeaux",
	time: "14/06/2016 19:00",
	home_team: {
		name: "Austria",
		goals: []
	},
	away_team: {
		name: "Hungary",
		goals: []
	}
}, {
	id: 12,
	type: "md1",
	group: "F",
	status: "Prematch",
	location: "Stade Geoffroy-Guichard",
	time: "14/06/2016 22:00",
	home_team: {
		name: "Portugal",
		goals: []
	},
	away_team: {
		name: "Iceland",
		goals: []
	}
}, {
	id: 13,
	type: "md2",
	group: "B",
	status: "Prematch",
	location: "Stade Pierre Mauroy",
	time: "15/06/2016 16:00",
	home_team: {
		name: "Russia",
		goals: []
	},
	away_team: {
		name: "Slovakia",
		goals: []
	}
}, {
	id: 14,
	type: "md2",
	group: "A",
	status: "Prematch",
	location: "Parc des Princes",
	time: "15/06/2016 19:00",
	home_team: {
		name: "Romania",
		goals: []
	},
	away_team: {
		name: "Switzerland",
		goals: []
	}
}, {
	id: 15,
	type: "md2",
	group: "A",
	status: "Prematch",
	location: "Stade de Bordeaux",
	time: "15/06/2016 22:00",
	home_team: {
		name: "France",
		goals: []
	},
	away_team: {
		name: "Albania",
		goals: []
	}
}, {
	id: 16,
	type: "md2",
	group: "B",
	status: "Prematch",
	location: "Stade Bollaert-Delelis",
	time: "16/06/2016 16:00",
	home_team: {
		name: "England",
		goals: []
	},
	away_team: {
		name: "Wales",
		goals: []
	}
}, {
	id: 17,
	type: "md2",
	group: "C",
	status: "Prematch",
	location: "Stade de Lyon",
	time: "16/06/2016 19:00",
	home_team: {
		name: "Ukraine",
		goals: []
	},
	away_team: {
		name: "Northern Ireland",
		goals: []
	}
}, {
	id: 18,
	type: "md2",
	group: "C",
	status: "Prematch",
	location: "Stade de France",
	time: "16/06/2016 22:00",
	home_team: {
		name: "Germany",
		goals: []
	},
	away_team: {
		name: "Poland",
		goals: []
	}
}, {
	id: 19,
	type: "md2",
	group: "E",
	status: "Prematch",
	location: "Stadium de Toulouse",
	time: "17/06/2016 16:00",
	home_team: {
		name: "Italy",
		goals: []
	},
	away_team: {
		name: "Sweden",
		goals: []
	}
}, {
	id: 20,
	type: "md2",
	group: "D",
	status: "Prematch",
	location: "Stade Geoffroy-Guichard",
	time: "17/06/2016 19:00",
	home_team: {
		name: "Czech Republic",
		goals: []
	},
	away_team: {
		name: "Croatia",
		goals: []
	}
}, {
	id: 21,
	type: "md2",
	group: "D",
	status: "Prematch",
	location: "Stade de Nice",
	time: "17/06/2016 22:00",
	home_team: {
		name: "Spain",
		goals: []
	},
	away_team: {
		name: "Turkey",
		goals: []
	}
}, {
	id: 22,
	type: "md2",
	group: "E",
	status: "Prematch",
	location: "Stade de Bordeaux",
	time: "18/06/2016 16:00",
	home_team: {
		name: "Belgium",
		goals: []
	},
	away_team: {
		name: "Republic of Ireland",
		goals: []
	}
}, {
	id: 23,
	type: "md2",
	group: "F",
	status: "Prematch",
	location: "Stade Velodrome",
	time: "18/06/2016 19:00",
	home_team: {
		name: "Iceland",
		goals: []
	},
	away_team: {
		name: "Hungary",
		goals: []
	}
}, {
	id: 24,
	type: "md2",
	group: "F",
	status: "Prematch",
	location: "Parc des Princes",
	time: "18/06/2016 22:00",
	home_team: {
		name: "Portugal",
		goals: []
	},
	away_team: {
		name: "Austria",
		goals: []
	}
}, {
	id: 25,
	type: "md3",
	group: "A",
	status: "Prematch",
	location: "Stade de Lyon",
	time: "19/06/2016 22:00",
	home_team: {
		name: "Romania",
		goals: []
	},
	away_team: {
		name: "Albania",
		goals: []
	}
}, {
	id: 26,
	type: "md3",
	group: "A",
	status: "Prematch",
	location: "Stade Pierre Mauroy",
	time: "19/06/2016 22:00",
	home_team: {
		name: "Switzerland",
		goals: []
	},
	away_team: {
		name: "France",
		goals: []
	}
}, {
	id: 27,
	type: "md3",
	group: "B",
	status: "Prematch",
	location: "Stadium de Toulouse",
	time: "20/06/2016 22:00",
	home_team: {
		name: "Russia",
		goals: []
	},
	away_team: {
		name: "Wales",
		goals: []
	}
}, {
	id: 28,
	type: "md3",
	group: "B",
	status: "Prematch",
	location: "Stade Geoffroy-Guichard",
	time: "20/06/2016 22:00",
	home_team: {
		name: "Slovakia",
		goals: []
	},
	away_team: {
		name: "England",
		goals: []
	}
}, {
	id: 29,
	type: "md3",
	group: "D",
	status: "Prematch",
	location: "Stade Velodrome",
	time: "20/06/2016 19:00",
	home_team: {
		name: "Ukraine",
		goals: []
	},
	away_team: {
		name: "Poland",
		goals: []
	}
}, {
	id: 30,
	type: "md3",
	group: "C",
	status: "Prematch",
	location: "Parc des Princes",
	time: "21/06/2016 19:00",
	home_team: {
		name: "Northern Ireland",
		goals: []
	},
	away_team: {
		name: "Germany",
		goals: []
	}
}, {
	id: 31,
	type: "md3",
	group: "C",
	status: "Prematch",
	location: "Stade de Bordeaux",
	time: "21/06/2016 22:00",
	home_team: {
		name: "Croatia",
		goals: []
	},
	away_team: {
		name: "Spain",
		goals: []
	}
}, {
	id: 32,
	type: "md3",
	group: "D",
	status: "Prematch",
	location: "Stade Bollaert-Delelis",
	time: "21/06/2016 22:00",
	home_team: {
		name: "Czech Republic",
		goals: []
	},
	away_team: {
		name: "Turkey",
		goals: []
	}
}, {
	id: 33,
	type: "md3",
	group: "E",
	status: "Prematch",
	location: "Stade de Lyon",
	time: "22/06/2016 19:00",
	home_team: {
		name: "Hungary",
		goals: []
	},
	away_team: {
		name: "Portugal",
		goals: []
	}
}, {
	id: 34,
	type: "md3",
	group: "E",
	status: "Prematch",
	location: "Stade de France",
	time: "22/06/2016 19:00",
	home_team: {
		name: "Iceland",
		goals: []
	},
	away_team: {
		name: "Austria",
		goals: []
	}
}, {
	id: 35,
	type: "md3",
	group: "F",
	status: "Prematch",
	location: "Stade Pierre Mauroy",
	time: "22/06/2016 22:00",
	home_team: {
		name: "Italy",
		goals: []
	},
	away_team: {
		name: "Republic of Ireland",
		goals: []
	}
}, {
	id: 36,
	type: "md3",
	group: "F",
	status: "Prematch",
	location: "Stade de Nice",
	time: "22/06/2016 22:00",
	home_team: {
		name: "Sweden",
		goals: []
	},
	away_team: {
		name: "Belgium",
		goals: []
	}
}];

module.exports = games;