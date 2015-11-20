
var mock = require('protractor-http-mock');
mock.config = {
	rootDirectory: __dirname, // default value: process.cwd()
	protractorConfig: 'http-mock.conf.js'
};

module.exports = mock;