require('date-format-lite');

/*
 * This file is first imported by the outer protractor process. Setting the env
 * here results in it being set in all its child processes.
 */
if (!process.env.BUILDNAME) {
	process.env.BUILDNAME = new Date().format('D.M.YY h:mm');
}

if (process.env.TRAVIS === 'true' && process.env.TRAVIS_PULL_REQUEST !== 'false') {
	console.log('This is a pull request on Travis. For security reasons, browsertack tests will be skipped.'); // eslint-disable-line no-console
	process.exit(0);
}

exports.config = {
	// Run more error prone browsers first!
	multiCapabilities: [
		/* beautify preserve:start beautify preserve:end */ // force newline for ESLint
		{
			'browser': 'IE',
			'browser_version': '10.0',
			'os': 'Windows',
			'os_version': '7'
		}, {
			'browser': 'IE',
			'browser_version': '11.0',
			'os': 'Windows',
			'os_version': '7'
		},
		/* "Error: not implemented"
			{
				'browser': 'Edge',
				'browser_version': '12.0',
				'os': 'Windows',
				'os_version': '10'
			},*/

		{
			'browserName': 'android',
			'platform': 'ANDROID',
			'device': 'Samsung Galaxy S5'
		},
		/* "This feature will be implemented soon"
		{
			'browserName' : 'android',
			'platform' : 'ANDROID',
			'device' : 'Google Nexus 4'
		},*/
		/* Times out
		 {
			'browserName': 'android',
			'platform': 'ANDROID',
			'device': 'Google Nexus 5'
		}, */
		{
			'browserName': 'iPhone',
			'platform': 'MAC',
			'device': 'iPhone 6'
		}, {
			'browserName': 'iPad',
			'platform': 'MAC',
			'device': 'iPad Air'
		}, // Older iOS versions don’t work yet, too
		{
			'browser': 'Safari',
			'browser_version': '9.0',
			'os': 'OS X',
			'os_version': 'El Capitan'
		}, {
			'browser': 'Firefox',
			'browser_version': '42.0',
			'os': 'Windows',
			'os_version': '10'
		}, {
			'browser': 'Chrome',
			'browser_version': '46.0',
			'os': 'Windows',
			'os_version': '10'
		}
	].map(renameBrowser),
	maxSessions: 1,

	beforeLaunch: require('protractor/lib/driverProviders/browserstack').launchLocal(key()),
	afterLaunch: require('protractor/lib/driverProviders/browserstack').stopLocal(),

	browserstack: {
		local: true,
		debug: true,
		key: key(),
		user: user(),
		reportResults: false,
		build: process.env.BUILDNAME,
		project: process.env.TRAVIS === 'true' ? 'Travis tests for ' + process.env.TRAVIS_REPO_SLUG : 'Local tests of ' + user(),
		name: 'behaviour test'
	},

	framework: 'mocha',
	mochaOpts: {
		reporter: 'min'
	},
	specs: ['**/*.js'],
	exclude: ['**/*.conf.js'],
	mocks: {
		dir: 'mocks',
		default: ['default']
	}
};

function key() {
	return process.env.BROWSERSTACK_KEY || require('./.browserstackrc').key;
}

function user() {
	return process.env.BROWSERSTACK_USER || require('./.browserstackrc').user;
}

function renameBrowser(capability) {
	if (capability.browser && !capability.browserName) {
		capability.browserName = capability.browser;
		delete capability.browser;
	}
	if (capability.device) {
		capability.logName = capability.device;
	} else {
		capability.logName = (capability.browserName || '') + ' ' + (capability.browser_version || '');
		if (capability.os) {
			capability.logName += ' on ' + capability.os + ' ' + (capability.os_version || '');
		}
	}
	return capability;
}