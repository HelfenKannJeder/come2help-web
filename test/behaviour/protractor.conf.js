exports.config = {
	capabilities: {
		browserName: 'phantomjs',
		'phantomjs.binary.path': require('phantomjs').path
	},

	framework: 'mocha',
	specs: ['**/*.js'],
	exclude: ['**/*.conf.js']
};