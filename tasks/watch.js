/**
 * Starts the development environment.
 */

var livereload = require('livereload');
var path = require('path');
var Server = require('./server');
var watch = require('watch');
var sass = require('./sass');
var util = require('util');
require('colors');

var basePath = path.resolve(__dirname, '..');

/**
 * Resolve part relative to the repository base path.
 *
 * @param {string} part     A relative path in this repository.
 * @return {string} An absolute path to part.
 */
var resolve = path.resolve.bind(path, basePath);

/**
 * Make path relative to the repository base path.
 *
 * @param {string} path     An absolute path pointing into this repository.
 * @return {string} The relative path in this repository.
 */
var relative = path.relative.bind(path, basePath);

/**
 * Short for process.stdout.write
 */
var write = process.stdout.write.bind(process.stdout);

/**
 * Creates a success report handler.
 *
 * @param {string} input The message to print on success. If it contains format strings, these will be filled with the result passed to the handler.
 * @param {boolean=} path If true, the result is an absolute path in this repository and will be made relative by calling relative.
 * @return {void}
 */
var success = function(input, path) {
	return function(result) {
		var output = util.format.bind(util, input).call(util, path ? relative(result) : result);
		writeln(output.green);
		writeln('');
	};
};

/**
 * Calls write and appends '\n'
 */
var writeln = function(input) {
	write(input + '\n');
};

/**
 * Prints 'OK\n' in green
 */
var ok = function() {
	writeln('OK'.green);
};



// Watch
write('Initializing file watch... ');
watch.createMonitor(resolve('css'), handleCss);
ok();

// Live reload
write('Launching the live reload server... ');
var liverloadserver = livereload.createServer();
liverloadserver.watch([resolve('build'), resolve('js'), resolve('partials'), resolve('index.html')]);
ok();


// Web server
write('Launching the webserver... ');
var webserver = new Server();
webserver.listen(8000);
ok();

writeln('');

function reportChange(monitor) {
	monitor.on('created', defaultHandler('CREATE'));
	monitor.on('changed', defaultHandler('CHANGE'));
	monitor.on('removed', defaultHandler('REMOVE'));
}

function defaultHandler(action) {
	return function(file) {
		writeln((action + ': ' + relative(file)).grey);
	};
}


function handleCss(monitor) {
	reportChange(monitor);

	monitor.on('created', renderSassFile);
	monitor.on('changed', renderSassFile);

	monitor.on('removed', function(file) {
		if (path.extname(file) === '.scss') {
			sass.clean(file).then(success('Cleaned %s', true)).catch(reportError);
		}
	});
}

function renderSassFile(file) {
	if (path.extname(file) === '.scss') {
		sass.render(file).then(success('Rendered to %s', true)).catch(reportError);
	}
}


function reportError(error) {
	write('Error: '.red);
	if (error.message) {
		writeln(error.message.red);
		writeln('');
		writeln(error.stack.gray);
	} else if (typeof error === 'string') {
		writeln(error.red);
	} else {
		writeln(util.inspect(error).red);
	}
	writeln('');
}