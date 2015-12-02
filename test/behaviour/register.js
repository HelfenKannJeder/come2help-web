require('./asserters')();

var extend = require('extend');

var mock = require('./http-mock');

var attributes = {
	email: 'max@mustermann.de',
	address: {
		zipCode: '76187'
	},
	givenName: 'Max',
	surname: 'Mustermann',
	phone: '0157812312335'
};

/**
 * Enters the data provided into the browser registration form. Provide data in the API format!
 *
 * @param {Object} data The input data, in the API format.
 * @return {void}
 */
function signupWith(data) {
	// Enter Text
	['givenName', 'surname', 'phone', 'email'].forEach(function(prop) {
		if (data[prop]) {
			var input = browser.findElement(by.model('ctrl.user.' + prop));
			input.sendKeys(data[prop]);
		}
	});

	['city', 'street', 'streetNumber', 'zipCode'].forEach(function(prop) {
		if (data.address[prop]) {
			var addressInput = browser.findElement(by.model('ctrl.user.' + prop));
			addressInput.sendKeys(data.address[prop]);
		}
	});

	// Check adult
	if (data['adult']) {
		var adult = browser.findElement(by.model('ctrl.user.adult'));
		adult.click();
	}

	// Submit
	$('button[type="submit"]').click();
}

/**
 * Asserts that the provided request contained all data. The request is allowed to contain more, but not less data.
 *
 * @param {Object} request The request Object
 * @param {Object} data    The data the request must contain, in the API format.
 * @return {void}
 */
function assert(request, data) {
	var dataWithoutAddress = extend({}, data);
	delete dataWithoutAddress.address;

	expect(request).to.contain.all.keys({
		method: 'POST',
		url: '/api/volunteers'
	});
	expect(request).to.have.property('data');
	expect(request.data).to.have.properties(dataWithoutAddress);
	if (data.address && data.address !== {}) {
		expect(request.data).to.have.property('address');
		expect(request.data.address).to.have.properties(data.address);
	}
}

afterEach(function() {
	mock.teardown();
});


describe('Registration Form', function() {
	this.timeout(2 * 60 * 1000);

	var abilitylist = by.repeater('ability in ctrl.abilities');

	it('has two entries: "Mocked Ability 1" and "Mocked Ability 2"', function() {
		mock(['abilities']);

		browser.getPart('register');

		expect(element.all(abilitylist).count()).to.eventually.equal(2);
		expect(element(abilitylist.column('ability.name').row(0)).getInnerHtml()).to.eventually.contain('Mocked Ability');
		expect(element(abilitylist.column('ability.name').row(1)).getInnerHtml()).to.eventually.contain('Mocked Ability');
	});

	it('allows to register with correct data', function() {
		var data = extend({
			adult: true
		}, attributes);

		mock([{
			request: {
				path: '/api/volunteers',
				method: 'POST'
			},
			response: {
				data: {
					token: 'abc'
				}
			}
		}]);

		browser.getPart('register');

		signupWith(data);

		mock.requestsMade().then(function(requests) {
			expect(requests).to.have.length(1);
			assert(requests[0], data);
		});

		browser.getPart('register');

		expect(element(by.tagName('h1')).getInnerHtml()).to.eventually.contain('Thank');

	});
});