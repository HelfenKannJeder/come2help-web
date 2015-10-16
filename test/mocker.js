/**
 * Simple mocker to mock the REST API
 */

var path = require('path');
var mocks = {};
var extend = require('extend');

module.exports = {

	/**
	 * A middleware for connect.
	 */
	middleware: function(req, res, next) {
		var uri = path.normalize(req.url);
		var verb = req.method;

		if (mocks[uri] && mocks[uri][verb]) {
			var data = mocks[uri][verb];
			res.end(data.content);
			res.statusCode = data.status;
			if (!mocks[uri][verb].persist) {
				delete mocks[uri][verb];
			}
		} else {
			next();
		}
	},
	/**
	 * Mocks the response for a request to the API at the specified endpoint. Unless options.persist is set to true, the mocked value will only be responded once.
	 *
	 * @param {string} endpoint The endpoint to mock.
	 * @param {object|string} object   The object to return at the endpoint. If a string is passed, it will be responded unchanged, anything else will be given to JSON#stringify.
	 * @param {object} options  Options. Possible values and defaults:
	 * {
	 *	 verb: 'GET',		// The http verb that is mocked and this endpoint.
	 *	 status: 200,		// The response's http status
	 *	 persist: false		// If true, this mock is persistent.
	 * }
	 * @return {[type]} [description]
	 */
	mockAPI: function(endpoint, object, options) {
		var uri = path.normalize(path.join('/api', endpoint));
		var defaultOptions = {
			verb: 'GET',
			status: 200,
			persist: false
		};
		mocks[uri] = mocks[uri] || {};
		var data = extend({}, defaultOptions, options, {
			content: typeof object === 'string' ? object : JSON.stringify(object)
		});
		mocks[uri][data.verb] = data;
	}
};