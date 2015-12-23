require('./asserters')();

var mock = require('./http-mock');

describe('Volunteer List', function () {
	this.timeout(2 * 60 * 1000);

	var volunteers = by.repeater('volunteer in ctrl.displayedVolunteers');

	it('is default an empty list', function () {
		expect(element.all(volunteers).count()).to.eventually.equal(0);
	});

	it('allows searching zip code of "Karlsruhe" and result contains two "Max Mustermann" entries', function () {
		mock(['volunteers']);

		browser.getPart('organisation/volunteerList');

		var zipCode = browser.findElement(by.model('ctrl.zipCode'));
		zipCode.sendKeys('76133');

		var distance = browser.findElement(by.model('ctrl.distance'));
		distance.sendKeys('10');

		element(by.partialButtonText('Search')).click(function () {
			expect(element.all(volunteers).count()).to.eventually.equal(2);
			for (var i = 0; i < 2; i++) {
				expect(element(volunteers.column('volunteer.surname').row(i)).getInnerHtml()).to.eventually.contain('Mustermann');
				expect(element(volunteers.column('volunteer.givenName').row(i)).getInnerHtml()).to.eventually.contain('Max');
			}
		});
	});
});