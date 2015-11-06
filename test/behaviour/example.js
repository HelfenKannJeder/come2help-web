/**
 * Example test case to visualise testing.
 */


require('./asserters')();

var server = require('./apimocker');

describe('Home', function() {
	this.timeout(1 * 60 * 1000);

	it('should have "come2.help" as title', function() {
		browser.get(baseUrl);

		expect(browser.getTitle()).to.eventually.equal('come2.help');
	});
});

describe('List', function() {
	this.timeout(2 * 60 * 1000);

	var locationlist = by.repeater('location in ctrl.locations');

	it('should have two entries: "Sandsäcke füllen" and "Transport"', function() {
		browser.getPart('list');

		expect(element.all(locationlist).count()).to.eventually.equal(2);
		expect(element(locationlist.column('location.name').row(0)).getInnerHtml()).to.eventually.contain('Sandsäcke füllen');
		expect(element(locationlist.column('location.name').row(1)).getInnerHtml()).to.eventually.contain('Transport');
	});

	// Example for mocking
	it('should load another entry', function() {
		server.mockAPI('locations', [{
			id: 1,
			name: 'Mocked Location',
			latitude: 49.1232,
			longitude: 8,
			location: 'Schlossplatz'
		}]);

		browser.navigate().refresh();

		expect(element(locationlist.column('location.name').row(0)).getInnerHtml()).to.eventually.contain('Mocked Location');
	});
});