exports.config = {
	capabilities: {
		browserName: 'firefox'
	},

	framework: 'mocha',
	mochaOpts: {
		reporter: 'spec'
	},
	specs: ['**/*.js'],
	exclude: ['**/*.conf.js']
};