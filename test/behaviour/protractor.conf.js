exports.config = {
	capabilities: {
		browserName: 'firefox'
	},

	framework: 'mocha',
	mochaOpts: {
		reporter: 'spec',
		slow: 3000
	},
	specs: ['**/*.js'],
	exclude: ['**/*.conf.js'],
	mocks: {
		dir: 'mocks',
		default: ['default']
	}
};