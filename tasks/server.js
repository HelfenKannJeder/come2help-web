/**
 * Very simple webserver for development purposes.
 */

 var connect = require('connect');
 var serveStatic = require('serve-static');
 var path = require('path');

 var baseDir = path.resolve(__dirname, '..');

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
		 server.use(serveStatic(baseDir));
		 server.listen(port);
	 };
 }

 module.exports = Server;