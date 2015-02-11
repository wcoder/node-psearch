var http = require('http');

var httpOptions = {
	host: 'psearch-maps.yandex.ru',
	port: 80,
	path: '/1.x/',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36'
	}
};

var httpRequest = function (options, callback) {

	var req = http.request(options, function (res) {
		var output = '';
		//console.log(options.host + ':' + res.statusCode);
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			output += chunk;
		});

		res.on('end', function() {
			var json = JSON.parse(output);
			callback(res.statusCode, json);
		});
	});

	req.on('error', function(err) {
		//res.send('error: ' + err.message);
		console.error(err);
	});

	req.end();
};

var prepareCoordinates = function (str) {
	return str.split(' ').reverse();
};

var prepareData = function (data) {
	var result = [];
	var objects = data.response.GeoObjectCollection.featureMember;
	objects.map(function (item) {
		result.push({
			name: item.GeoObject.name,
			coordinates: prepareCoordinates(item.GeoObject.Point.pos)
		});
	});
	return result
};

/*
 * Documentation: https://tech.yandex.ru/maps/doc/geocoder/psearch/concepts/input_params-docpage/
 */
var getCoordinates = function (options, callback) {

	httpOptions.path += '?text=' + encodeURIComponent(options.query) +
					 '&ll=' + encodeURIComponent(options.ll) +
					 '&spn=' + encodeURIComponent(options.spn) +
					 '&format=json' +
					 '&rspn=1' +
					 '&results=' + options.count;
					 

	httpRequest(httpOptions, function (status, response) {
		if (status == 200) {
			try {
				var data = prepareData(response);
                if (data != null) {
                    callback(data);
                }
			} catch (e) {
				console.error(e);
			}
		} else {
			console.error(status);
		}
	});
};

module.exports = {
	getCoordinates: getCoordinates
};
