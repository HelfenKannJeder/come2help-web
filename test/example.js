require('./loadAsserters')();

var until = require('selenium-webdriver').until;
var by = require('selenium-webdriver').By;

describe('Home', function() {
	this.timeout(6000);
	it('should have "come2.help" as title', function() {
		browser.get('http://localhost:8000');
		browser.wait(until.titleMatches(/.+/), 3000);
		expect(browser.getTitle()).to.eventually.equal('come2.help');
	});
});

describe('List', function() {
	this.timeout(6000);
	it('should have two entries: "Sandsäcke füllen" and "Transport"', function() {
		browser.get('http://localhost:8000/#/list');
		browser.wait(until.elementLocated(by.css('.ng-scope table')), 4000);
		browser.findElements(by.css('.ng-scope table tr.ng-scope')).then(function(tableRows) {
			expect(tableRows).to.have.length(2);
			expect(tableRows[0].findElement(by.css('td')).getInnerHtml()).to.eventually.equal('Sandsäcke füllen');
			expect(tableRows[1].findElement(by.css('td')).getInnerHtml()).to.eventually.equal('Transport');
		});
	});
});