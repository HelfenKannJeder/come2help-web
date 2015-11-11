/**
 * Very simple webserver for development purposes.
 */

var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');

var baseDir = path.resolve(__dirname, '..');

function getWebserver() {
	var setHeaders = function(res) {
		res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
		res.setHeader('Pragma', 'no-cache');
		res.setHeader('Expires', '0');
	};
	return serveStatic(baseDir, {
		setHeaders: setHeaders,
		etag: false
	});
}

/**
 * A simple web server that will default to deliver the base directory of this repository. It can be extended through #use.
 */
function Server() {

	var server = connect();

	/**
	 * Use the provided middleware. The order of the calls defines the order in which middlewares will be queried.
	 *
	 * @param {Object} server A node js server middleware.
	 * @return {void}
	 */
	this.use = server.use.bind(server);

	/**
	 * Launch the server and listen on the provided port.
	 *
	 * @param {number} port The port to listen on.
	 * @return {void}
	 */
	this.listen = function(port) {
		server.use(getWebserver());
		server.listen(port);
	};
}

module.exports = Server;