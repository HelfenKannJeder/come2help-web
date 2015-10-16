require('./loadAsserters')();

before('Set up selenium with phantom js', function() {
	var phantomjs = require('selenium-webdriver/phantomjs');
	global.browser = new phantomjs.Driver();

	browser.waitForTitle = function() {
		return browser.wait(function() {
			return browser.getTitle().then(function(title) {
				return title.length > 0;
			});
		}, 10000);
	};
});

after('Tear down selenium', function() {
	browser.quit();
});