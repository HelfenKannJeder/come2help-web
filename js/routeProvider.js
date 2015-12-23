angular.module('Come2HelpApp').config(['$routeProvider', function($routeProvider) {

	$routeProvider.
	when('/register/done', {
		templateUrl: 'partials/registerDone.html',
		resolve: {
			loginRequired: loginRequired
		}
	}).
	when('/register', {
		templateUrl: 'partials/register.html',
		controller: 'RegisterController',
		controllerAs: 'ctrl',
		resolve: {
			skipIfLoggedIn: skipIfLoggedIn
		}
	}).
	otherwise('/register');

	function skipIfLoggedIn($q, $location, $auth, jwtService) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated() && !jwtService.isGuest()) {
			$location.path('/register/done');
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}

	function loginRequired($q, $location, $auth, jwtService) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated() && !jwtService.isGuest()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	}
}]);