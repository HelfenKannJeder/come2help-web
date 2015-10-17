/**
 * Example test case to visualise testing.
 */


require('./loadAsserters')();

var mocker = require('./mocker');

describe('Home', function() {
	this.timeout(6000);
	it('should have "come2.help" as title', function() {
		browser.get(baseUrl);
		browser.wait(until.titleMatches(/.+/), 3000);
		expect(browser.getTitle()).to.eventually.equal('come2.help');
	});
});

describe('List', function() {
	this.timeout(6000);
	it('should have two entries: "Sandsäcke füllen" and "Transport"', function() {
		browser.getPart('list');
		browser.wait(until.elementLocated(by.css('.ng-scope table')), 4000);
		browser.findElements(by.css('.ng-scope table tr.ng-scope')).then(function(tableRows) {
			expect(tableRows).to.have.length(2);
			expect(tableRows[0].findElement(by.css('td')).getInnerHtml()).to.eventually.equal('Sandsäcke füllen');
			expect(tableRows[1].findElement(by.css('td')).getInnerHtml()).to.eventually.equal('Transport');
		});
	});

	// Example for mocking
	it('should load another entry', function() {
		mocker.mockAPI('locations', [{
			id: 1,
			name: 'Mocked Location',
			latitude: 49.1232,
			longitude: 8,
			location: 'Schlossplatz'
		}]);
		browser.navigate().refresh();
		browser.wait(until.elementLocated(by.css('.ng-scope table')), 4000);
		expect(browser.findElement(by.css('.ng-scope table tr.ng-scope td')).getInnerHtml()).to.eventually.equal('Mocked Location');
	});
});