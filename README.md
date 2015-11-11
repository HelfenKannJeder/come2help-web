# come2help Web-App [![Build Status](https://travis-ci.org/HelfenKannJeder/come2help-web.svg?branch=master)](https://travis-ci.org/HelfenKannJeder/come2help-web)

<a href="http://come2.help">come2.help</a> is a project for recruiting and coordinating volunteer people.
Possible scenarios are flooding or coordinating support for political refugees.

## Content and Usage

This is only a Web-App. The REST API is not part of this repository. For usage please care about the
LICENSE file.

## Used Software and Tools

<a href="http://browserstack.com/"><img src="http://helfenkannjeder.de/fileadmin/_processed_/csm_logo_072d30a442.png" alt="Browserstack" border="0" /></a>

## Setup

1. Fork the repository for development. Implementations can be submitted by a Pull-Request.

2. Clone the repository to a local directory.

3. Import it to a IDE (e.g. IntelliJ) of your choice (or use vim).

4. If you want to use the backend, also install come2help-server. See the tutorial in come2help-server.

5. Install all dependencies:
 <pre>npm install</pre>

6. Start the development services:
 <pre>npm start</pre> This will start:
 * A watch to build all files that need to be built.
 * A webserver
 * A LiveReload server

7. Run `localhost:8000` in a browser of your choice. Install [LiveReload](http://livereload.com/) to have it automatically updated.

8. Start coding!

## Testing
Tests are run through `npm`:

 * `npm test`

  Runs the behaviour test in Firefox. Requires firefox to be installed.

 * `npm run chrometest -s`

 Runs the behaviour test in Chrome. Requires chrome to be installed.

 * `npm run browsertest -s`

 Runs the behaviour test in multiple browsers on BrowserStack. You'll need to provide BrowserStack credentials, either in the environment variables `BROWSERSTACK_USER` and `BROWSERSTACK_KEY`, or in `test/behaviour/.browserstackrc` in the form of `module.exports = {key: YOUR_KEY, user: YOUR_USERNAME}`.

 * `npm run lint -s`

 Lints the code.
