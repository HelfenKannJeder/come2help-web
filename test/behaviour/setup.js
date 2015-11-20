/**
 * Sets up the test environment
 */

var portfinder = require('portfinder');
var Server = require('../../tasks/server');

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

before('Set up the HTTP server', function() {
	var server = new Server();
	server.listen(port);
});