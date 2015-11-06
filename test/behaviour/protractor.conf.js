exports.config = {
	capabilities: {
		browserName: 'phantomjs',
		'phantomjs.binary.path': require('phantomjs').path
	},

	framework: 'mocha',
	mochaOpts: {
		reporter: 'spec'
	},
	specs: ['**/*.js'],
	exclude: ['**/*.conf.js']
};