/**
 * Example test case to visualise testing.
 */


require('./asserters')();

var mock = require('./http-mock');

describe('Home', function() {
	this.timeout(1 * 60 * 1000);

	it('should have "come2.help" as title', function() {
		browser.get(baseUrl);

		expect(browser.getTitle()).to.eventually.equal('come2.help');
	});
});