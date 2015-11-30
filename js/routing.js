angular.module('Come2HelpApp')
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
}]);