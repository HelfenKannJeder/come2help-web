/**
 * Sets up the test environment
 */

var path = require('path');
var mocker = require('./apimocker');
var portfinder = require('portfinder');

var port;
var host = 'localhost';

before('Get free port', function(done) {
	portfinder.basePort = 8086;

	portfinder.getPort(function(err, freePort) {
		if (err) {
			throw new Error(err);
		}

		port = freePort;
		done();
	});
});

before('Expose globals', function() {
	global.baseUrl = 'http://' + host + ':' + port;

	browser.getPart = function(part) {
		return browser.get(baseUrl + '/#/' + part);
	};
});

before('Set up the JSON server and mocker', function() {
	var connect = require('connect');
	var serveStatic = require('serve-static');
	var server = connect();
	server.use(mocker.middleware);
	server.use(serveStatic(path.resolve(__dirname, '../..')));
	server.listen(port);
});