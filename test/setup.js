/**
 * Sets up the test environment
 */

var path = require('path');
var mocker = require('./mocker');
var fs = require('fs');
var q = require('q');

var port = 8086;
var baseName = 'localhost';
global.baseUrl = 'http://' + baseName + ':' + port;


var browserstack = process.env.BROWSER === 'TRUE';
var webdriver, browser;

if (!browserstack) {
	/*
	 * Selenium requires their special before and after, while browserstack breaks with them.
	 */
	require('./loadAsserters')();
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
	var browserstackconfig = getBrowserStackConfig();
	var localtest;

	before('Launch browserstack local testing', function(done) {
		this.timeout(60000);
		var spawn = require('child_process').execFile;

		var localtestfolder = getBrowsertackLocalTestingFolder();
		downloadBrowserstackLocalTesting(localtestfolder)

		.then(function(execPath) {
			localtest = spawn(execPath, [browserstackconfig.key]);
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
			'browserstack.user': browserstackconfig.user,
			'browserstack.key': browserstackconfig.key,
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

	/*
	 * Browserstack apparently uses an old version of selenium, no containing until. This is a fillin for it.
	 */
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

/**
 * @return {string} The path to a folder to put the browser stack local testing executable into (or to retrieve it from)
 */
function getBrowsertackLocalTestingFolder() {
	var ospart;
	switch (process.platform) {
		case 'darwin':
			ospart = 'mac';
			break;
		case 'linux':
			if (process.arch === 'x64') {
				ospart = 'linux64';
			} else {
				ospart = 'linux32';
			}
			break;
		case 'win32':
			ospart = 'win';
			break;
		default:
			throw new Error('Unsuported operating system!');
	}
	return path.resolve(path.join(__dirname, 'browserstacklocal', ospart));
}

/**
 * Puts the browserstack local testing executable into the provided folder.
 *
 * @param {string} folder The folder to put the executable in.
 * @return {promise<string>} A promise for the path of the executable.
 */
function downloadBrowserstackLocalTesting(folder) {
	var deferred = q.defer();
	var fileName = process.platform.indexOf('win') > -1 ? 'BrowserStackLocal.exe' : 'BrowserStackLocal';
	var target = path.join(folder, fileName);

	fs.stat(target, function(err, stat) {
		if (err === null && stat.isFile()) {
			return deferred.resolve(target);
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

		console.log('Downloading the local testing executable…'); // eslint-disable-line no-console

		download.on('error', function(error) {
			deferred.reject('Unable to download local testing: ' + error);
		});

		download.on('end', function() {
			var zipLocation = path.join(dir, path.basename(url));
			var extractor = unzip.Extract({
				path: path.dirname(target)
			});
			fs.createReadStream(zipLocation).pipe(extractor);
			extractor.on('close', function() {
				fs.chmod(target, '755', function() {
					deferred.resolve(target);
				});
				fs.unlink(zipLocation);
			});
		});
	});
	return deferred.promise;
}

/**
 * Get's the browser stack access configuration.
 *
 * @return {{user: string, key: string}} The browser stack access configuration.
 */
function getBrowserStackConfig() {
	var configFile = path.join(__dirname, '.browserstackrc');
	var config;
	try {
		fs.statSync(configFile);
	} catch (e) {
		config = {
			user: process.env.BROWSERSTACK_USER,
			key: process.env.BROWSERSTACK_KEY
		};
		if (!config.user || !config.key) {
			throw new Error('Please define your browserstack credentials, either in test/.browserstackrc or through the ENVs BROWSERSTACK_USER and BROWSERSTACK_KEY!');
		}
		return config;
	}
	config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
	return config;
}