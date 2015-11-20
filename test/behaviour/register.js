require('./asserters')();

var mock = require('./http-mock');

var attributes = {
	zipCode: '76187',
	givenName: 'Max',
	surname: 'Mustermann',
	phone: '0157812312335'
};

describe('Register', function() {
	this.timeout(2 * 60 * 1000);

	var abilitylist = by.repeater('ability in ctrl.abilities');

	it('should have two entries: "Ability 1" and "Ability 2"', function() {
		browser.getPart('register');

		expect(element.all(abilitylist).count()).to.eventually.equal(2);
		expect(element(abilitylist.column('ability.name').row(0)).getInnerHtml()).to.eventually.contain('Ability 1');
		expect(element(abilitylist.column('ability.name').row(1)).getInnerHtml()).to.eventually.contain('Ability 2');
	});

	it('register with correct data', function() {
		mock(['volunteers']);

		browser.getPart('register');

		var zipCode = browser.findElement(by.model('ctrl.zipCode'));
		zipCode.sendKeys(attributes['zipCode']);
		var givenName = browser.findElement(by.model('ctrl.givenName'));
		givenName.sendKeys(attributes['givenName']);
		var surname = browser.findElement(by.model('ctrl.surname'));
		surname.sendKeys(attributes['surname']);
		var phone = browser.findElement(by.model('ctrl.phone'));
		phone.sendKeys(attributes['phone']);
		var adult = browser.findElement(by.model('ctrl.adult'));
		adult.click();

		element(by.partialButtonText('Register')).click();

		expect(mock.requestsMade()).to.eventually.deep.equal([
			{
				url : 'api/volunteers',
				method : 'POST',
				data: {
					address: {
						zipCode: attributes['zipCode']
					},
					adult: true,
					givenName: attributes['givenName'],
					surname: attributes['surname'],
					phone: attributes['phone']
				}
			}
		]);
		expect(element(by.id('error')).isDisplayed()).to.eventually.equal(false);

	});

	it('register with adult=false', function() {
		mock(['volunteers']);

		browser.getPart('register');

		var zipCode = browser.findElement(by.model('ctrl.zipCode'));
		zipCode.sendKeys(attributes['zipCode']);
		var givenName = browser.findElement(by.model('ctrl.givenName'));
		givenName.sendKeys(attributes['givenName']);
		var surname = browser.findElement(by.model('ctrl.surname'));
		surname.sendKeys(attributes['surname']);
		var phone = browser.findElement(by.model('ctrl.phone'));
		phone.sendKeys(attributes['phone']);

		element(by.partialButtonText('Register')).click();

		expect(mock.requestsMade()).to.eventually.deep.equal([
			{
				url : 'api/volunteers',
				method : 'POST',
				data: {
					address: {
						zipCode: attributes['zipCode']
					},
					adult: false,
					givenName: attributes['givenName'],
					surname: attributes['surname'],
					phone: attributes['phone']
				}
			}
		]);
		expect(element(by.id('error')).isDisplayed()).to.eventually.equal(true);

	});
});