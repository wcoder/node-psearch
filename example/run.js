var psearch = require('../lib');

var options = {
	query: 'остановка транспорта',
	ll: '23.716607,52.089056',
	spn: '0.271225,0.090199',
	count: 20
};

psearch.getCoordinates(options, function (data) {
	data.map(function (item) {
		console.log(item.name, item.coordinates);
	});
});