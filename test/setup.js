/**
 * Sets up the test environment
 */

require('./loadAsserters')();
var path = require('path');
var mocker = require('./mocker');
var fs = require('fs');

var port = 8086;
var baseName = 'localhost';
global.baseUrl = 'http://' + baseName + ':' + port;


var browserstack = process.env.BROWSER === 'TRUE';
var webdriver, browser;

if (!browserstack) {
	/*
	 * Easy setup: Run tests in phantom js.
	 */
	before('Set up selenium with phantom js', function() {
		webdriver = require('selenium-webdriver');
		var phantomjs = require('selenium-webdriver/phantomjs');
		browser = new phantomjs.Driver();
	});
} else {
	/*
	 * Significant more complicated setup: Run tests with browserstack.
	 */
	var browserstackconfig = fs.readFileSync(path.join(__dirname, '.browserstackrc'));
	browserstackconfig = JSON.parse(browserstackconfig);
	var localtest;

	before('Launch browserstack local testing', function(done) {
		var spawn = require('child_process').execFile;

		var localtestpath = getBrowsertackLocalTestingPath();
		downloadBrowserstackLocalTesting(localtestpath, function() {
			localtest = spawn(localtestpath, [browserstackconfig.key]);
			localtest.stdout.on('data', function(data) {
				var output = data.toString();
				var teststring = 'You can now access your local server(s) in our remote browser.';
				if (output.indexOf(teststring) > -1) {
					done();
				}
			});
		});
	});

	after('Shut down browserstack local testing', function() {
		localtest.kill();
	});

	before('Set up connection to browserstack', function() {
		var browserstack = require('browserstack-webdriver');
		webdriver = browserstack;
		var capabilities = {
			'browser': 'Chrome',
			'browser_version': '45.0',
			'os': 'Windows',
			'os_version': '10',
			'browserstack.user': 'joshuagleitze3',
			'browserstack.key': 'ynYf5s2zedTxKzpRJWth',
			'browserstack.local': 'true'
		};
		browser = new browserstack.Builder()
			.usingServer('http://hub.browserstack.com/wd/hub')
			.withCapabilities(capabilities)
			.build();
	});

	beforeEach('Increase timeout for browserstack', function() {
		this.timeout(20000);
	});
}

before('Expose globals', function() {
	browser.getPart = function(part) {
		return browser.get(baseUrl + '/#/' + part);
	};
	global.browser = browser;
	global.by = webdriver.By;
	global.until = {
		elementLocated: function(locator) {
			return function() {
				return browser.isElementPresent(locator).then(function(result) {
					return result;
				});
			};
		},

		titleMatches: function(regex) {
			return function() {
				return browser.getTitle().then(function(title) {
					return regex.test(title);
				});
			};
		}
	};
});

before('Set up the JSON server and mocker', function() {
	var connect = require('connect');
	var serveStatic = require('serve-static');
	var server = connect();
	server.use(mocker.middleware);
	server.use(serveStatic(path.dirname(__dirname)));
	server.listen(port);
});

after('Stop the browser', function() {
	browser.quit();
});


function getBrowsertackLocalTestingPath() {
	var ospart;
	switch (process.platform) {
		case 'darwin':
			ospart = 'mac/BrowserStackLocal';
			break;
		case 'linux':
			if (process.arch === 'x64') {
				ospart = 'linux64/BrowserStackLocal';
			} else {
				ospart = 'linux32/BrowserStackLocal';
			}
			break;
		case 'win32':
			ospart = 'win/BrowserStackLocal.exe';
			break;
		default:
			throw new Error('Unsuported operating system!');
	}
	return path.resolve(path.join(__dirname, 'browserstacklocal', ospart));
}

function downloadBrowserstackLocalTesting(target, callback) {
	fs.stat(target, function(err) {
		if (!err) {
			return callback();
		}

		var url;
		switch (process.platform) {
			case 'darwin':
				url = 'https://www.browserstack.com/browserstack-local/BrowserStackLocal-darwin-x64.zip';
				break;
			case 'linux':
				if (process.arch === 'x64') {
					url = 'https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip';
				} else {
					url = 'https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-ia32.zip';
				}
				break;
			case 'win32':
				url = 'https://www.browserstack.com/browserstack-local/BrowserStackLocal-win32.zip';
				break;
			default:
				throw new Error('Unsuported operating system!');
		}
		var transfer = require('transfer');
		var dir = path.dirname(target);
		var download = transfer.get(url, dir);
		var unzip = require('unzip');

		console.log('Downloading the local testing executable!'); // eslint-disable-line no-console

		download.on('error', function(error) {
			throw new Error('Unable to download local testing: ' + error);
		});
		download.on('end', function() {
			var zipLocation = path.join(dir, path.basename(url));
			fs.createReadStream(zipLocation).pipe(unzip.Extract({
				path: path.dirname(target)
			}));
			fs.unlink(zipLocation, callback);
		});
	});
}