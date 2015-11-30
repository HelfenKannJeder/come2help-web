angular.module('Come2HelpApp', [
	'ngRoute',
	'Come2HelpController',
	'uiGmapgoogle-maps',
	'pascalprecht.translate',
	'satellizer'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/register', {
		templateUrl: 'partials/register.html',
		controller: 'RegisterController',
		controllerAs: 'ctrl',
		resolve: {
			skipIfLoggedIn: skipIfLoggedIn
		}
	}).
	when('/register/done', {
		templateUrl: 'partials/registerDone.html'
	}).
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController',
		controllerAs: 'ctrl',
		resolve: {
			skipIfLoggedIn: skipIfLoggedIn
		}
	}).
	otherwise({
		redirectTo: '/register'
	});

	function skipIfLoggedIn($q, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}

	function loginRequired($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	}
}])
.config(['$authProvider', function($authProvider) {

	$authProvider.signupUrl = '/api/volunteers';

	$authProvider.facebook({
		clientId: '417693555105063',
		url: '/api/login/facebook'
	});

	$authProvider.google({
		clientId: '924036387059-anhuh3kr3b6cnopsjs5gfk2t7sq2u43o.apps.googleusercontent.com',
		url: '/api/login/google'
	});
}]);