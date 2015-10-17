/**
 * Load the asserting libraries. This file must be required and executed in every test case:
 *
 * require('./loadAsserters')();
 */

var browserstack = process.env.BROWSER === 'TRUE';

module.exports = function() {
	// Load chai and plugins
	var chai = require('chai');
	var chaiAsPromised = require('chai-as-promised');
	chai.use(chaiAsPromised);
	global.expect = chai.expect;

	// Override the mocha functions with the webdriver ones.
	var seleniumTest = browserstack ? require('browserstack-webdriver/testing') : require('selenium-webdriver/testing');
	var extend = require('extend');
	extend(global, seleniumTest);
};