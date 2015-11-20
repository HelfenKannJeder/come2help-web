require('./asserters')();

describe('Register', function() {
	this.timeout(2 * 60 * 1000);

	var abilitylist = by.repeater('ability in ctrl.abilities');

	it('should have two entries: "Ability 1" and "Ability 2"', function() {
		browser.getPart('register');

		expect(element.all(abilitylist).count()).to.eventually.equal(2);
		expect(element(abilitylist.column('ability.name').row(0)).getInnerHtml()).to.eventually.contain('Ability 1');
		expect(element(abilitylist.column('ability.name').row(1)).getInnerHtml()).to.eventually.contain('Ability 2');


	});
});