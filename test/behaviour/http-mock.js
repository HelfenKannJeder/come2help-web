
var mock = require('protractor-http-mock');
mock.config = {
	rootDirectory: __dirname, // default value: process.cwd()
	protractorConfig: 'protractor.conf.js'
};

module.exports = mock;