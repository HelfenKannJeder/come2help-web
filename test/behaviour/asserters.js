/**
 * Load the asserting libraries. This file must be required and executed in every test case:
 *
 * require('./asserters')();
 */

module.exports = function() {
	// Load chai and plugins
	var chai = require('chai');
	var chaiAsPromised = require('chai-as-promised');
	chai.use(chaiAsPromised);
	chai.use(require('chai-properties'));
	global.expect = chai.expect;
};