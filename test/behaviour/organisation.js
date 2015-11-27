require('./asserters')();

var mock = require('./http-mock');

describe('Volunteer List', function () {
	this.timeout(2 * 60 * 1000);

	var volunteers = by.repeater('volunteer in ctrl.volunteers');

	it('contains two "Max Mustermann" entries', function () {
		mock(['volunteers']);

		browser.getPart('organisation/volunteerList');

		expect(element.all(volunteers).count()).to.eventually.equal(2);
		for (var i = 0; i < 2; i++) {
			expect(element(volunteers.column('volunteer.surname').row(i)).getInnerHtml()).to.eventually.contain('Mustermann');
			expect(element(volunteers.column('volunteer.givenName').row(i)).getInnerHtml()).to.eventually.contain('Max');
		}
	});
});