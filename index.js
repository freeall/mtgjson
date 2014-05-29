var req = require('request');
var fs = require('fs');
var path = require('path');

var URL = 'http://mtgjson.com/json/AllSets.json';
var ETAG_FILE = path.join(__dirname, 'data/etag');
var DATA_FILE = path.join(__dirname, 'data/AllSets.json');

module.exports = function(callback) {
	fs.readFile(ETAG_FILE, function(err, data) {
		if (err) return callback(err);

		var localEtag = data.toString();

		req(URL, {headers:{'if-none-match':localEtag}}, function(err, res) {
			if (res.statusCode === 304) {
				return fs.readFile(DATA_FILE, function(err, data) {
					if (err) return callback(err);

					callback(null, JSON.parse(data));
				});
			}

			fs.writeFile(ETAG_FILE, res.headers.etag, function(err) {
				if (err) return callback(err);

				fs.writeFile(DATA_FILE, res.body, function(err) {
					if (err) return callback(err);

					callback(null, JSON.parse(res.body));
				});
			});
		});
	});
};


if (require.main !== module) return;

module.exports(console.log)