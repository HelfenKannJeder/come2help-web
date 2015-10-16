/**
 * Sets up the test environment
 */

require('./loadAsserters')();
var path = require('path');
var mocker = require('./mocker');

var port = 8086;
var baseName = 'localhost';
global.baseUrl = 'http://' + baseName + ':' + port;

before('Set up selenium with phantom js', function() {
	var phantomjs = require('selenium-webdriver/phantomjs');
	global.browser = new phantomjs.Driver();

	browser.getPart = function(part) {
		return browser.get(baseUrl + '/#/' + part);
	};
});

before('Set up the JSON server and mocker', function() {
	var connect = require('connect');
	var serveStatic = require('serve-static');
	var server = connect();
	server.use(mocker.middleware);
	server.use(serveStatic(path.dirname(__dirname)));
	server.listen(port);
});

after('Tear down selenium', function() {
	browser.quit();
});