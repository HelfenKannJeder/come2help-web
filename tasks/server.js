/**
 * Very simple webserver for development purposes.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var baseDir = path.resolve(__dirname, '..');

/**
 * Returns a middleware that serves all static files
 *
 * @return {function} Express middleware
 */
function getWebserver() {
	var setHeaders = function(res) {
		res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
		res.setHeader('Pragma', 'no-cache');
		res.setHeader('Expires', '0');
	};
	return express.static(baseDir, {
		setHeaders: setHeaders,
		etag: false
	});
}

/**
 * Serves the static API files as json
 *
 * @param {Object}   req    the request object
 * @param {Object}   res    the response object
 * @param {Function} next   next callback
 * @return {void}
 */
function apiServer(req, res, next) {
	var file = req.url.indexOf('/') === 0 ? req.url.substr(1) : req.url;
	fs.readFile(path.resolve(baseDir, file), function(err, contents) {
		if (err) {
			return next(err);
		}
		contents = contents.toString('utf8');
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(contents);
	});
}

/**
 * Error Handler middleware.
 *
 * @param {Error}    err    the error
 * @param {Object}   req    the request object
 * @param {Object}   res    the response object
 * @param {Function} next   next callback
 * @return {void}
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
	process.stderr.write(err.stack + '\n');
	res.status(500).send('Something broke!');
}

/**
 * A simple web server that will default to deliver the base directory of this repository. It can be extended through #use.
 */
function Server() {

	var server = express();
	server.use(bodyParser.urlencoded({
		extended: false
	}));

	/**
	 * Use the provided middleware. The order of the calls defines the order in which middlewares will be queried.
	 *
	 * @param {Object} server A node js server middleware.
	 * @return {void}
	 */
	this.use = server.use.bind(server);

	/**
	 * Launch the server and listen on the provided port. Installs fallback servers for static files.
	 *
	 * @param {number} port The port to listen on.
	 * @return {void}
	 */
	this.listen = function(port) {
		server.use(getWebserver());
		// Serve the API on post requests, too
		server.post('/api/*', apiServer);
		// Write errors to the log and return 500
		server.use(errorHandler);
		server.listen(port);
	};
}

module.exports = Server;