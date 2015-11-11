/**
 * Handles SCSS rendering.
 */


var sass = require('node-sass');
var path = require('path');
var fs = require('fs');
var q = require('q');

var basePath = path.resolve(__dirname, '..');
var resolve = path.resolve.bind(path, basePath);

function returnQ(argument) {
	return q.bind(q, argument);
}

/**
 * Renders the given scss file.
 *
 * @param {string} filePath The path to .scss file out of the css folder.
 * @return {promise<string>} A promise that will be fulfilled with the path to the rendered file when it was rendered.
 */
function renderFile(filePath) {
	var outFilePath = getOutputFilePath(filePath);
	return q.nfcall(sass.render, {
		file: filePath,
		outFile: outFilePath
	}).then(function(result) {
		return mkdirs(path.dirname(outFilePath))
			.then(q.nbind(fs.writeFile, fs, outFilePath, result.css));
	}).then(returnQ(outFilePath));
}

function getOutputFilePath(filePath) {
	filePath = filePath.replace(/.scss$/, '.css');
	return resolve('build', path.relative(resolve(''), filePath));
}

/**
 * Remove the rendered equivalent of the provided scss file.
 *
 * @param {string} filePath The path of a scss file that was present in the css folder, but was deleted.
 * @return {promise<string>} A promise that will be fulfilled with the path of the rendered file when it was deleted.
 */
function clean(filePath) {
	var rendered = getOutputFilePath(filePath);
	return q.nfcall(fs.unlink, rendered).then(returnQ(rendered));
}

module.exports = {
	render: renderFile,
	clean: clean
};

/**
 * @param {string} dir A directory
 * @return {promise<void>} A promise that will be fulfilled when all directories on the way to dir (including dir itself) exist.
 */
function mkdirs(dir) {
	return q.nfcall(fs.stat, dir).catch(function(error) {
		if (error.code === 'ENOENT') {
			return mkdirs(path.dirname(dir))
				.then(q.nbind(fs.mkdir, fs, dir))
				.catch(function(error) {
					if (error.code !== 'EEXIST') {
						throw error;
					}
				});
		} else {
			throw error;
		}
	});
}

/**
 * @param {string} dir A directory
 * @return {promise<Array<string>>} A promise for all files in that directory, including nested files.
 */
function walk(dir) {
	var results = [];
	return q.nfcall(fs.readdir, dir).then(function(list) {

		if (list.length === 0) {
			return list;
		}

		var promises = list.map(function(file) {
			file = path.resolve(dir, file);

			return q.nfcall(fs.stat, file).then(function(stat) {
				if (stat.isDirectory()) {
					return walk(file).then(function(res) {
						results = results.concat(res);
					});
				} else {
					results.push(file);
					return q();
				}
			});
		});
		return q.all(promises).then(function() {
			return results;
		});
	});
}

if (require.main === module) {
	walk(resolve('css')).then(function(list) {
		var promises = list.map(function(file) {
			if (path.extname(file) === '.scss') {
				return renderFile(file);
			}
			return q();
		});
		return q.all(promises);
	}).done(process.exit.bind(process, 0));
}