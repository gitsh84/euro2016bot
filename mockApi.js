var mockApi = {};

var groups = [{
	name: "A",
	teams: [{
		name: "Albania"
	},
	{
		name: "France"
	},
	{
		name: "Romania"
	},
	{
		name: "Switzerland"
	}]
},
{
	name: "B",
	teams: [{
		name: "England"
	},
	{
		name: "Russia"
	},
	{
		name: "Slovakia"
	},
	{
		name: "Wales"
	}]
}];

mockApi.getGroups = function(callback) {
	if(typeof callback !== "function") return;
	callback(groups);
}

module.exports = mockApi;