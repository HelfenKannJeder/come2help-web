angular.module('Come2HelpApp').config(['$routeProvider', function ($routeProvider) {

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
	when('/organisation/volunteerList', {
		templateUrl: 'partials/organisation/volunteerList.html',
		controller: 'VolunteerListController',
		controllerAs: 'ctrl',
		//resolve: {
		//	loginRequired: loginRequired,
		//	organisationAdminRequired: organisationAdminRequired
		//}
	}).
	when('/imprint', {
		templateUrl: 'partials/imprint.html'
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
			$location.path('/register');
		}
		return deferred.promise;
	}

	function organisationAdminRequired($q, $location, jwtService) {
		var deferred = $q.defer();
		if (jwtService.isOrganisation()) {
			deferred.resolve();
		} else {
			$location.path('/');
		}
		return deferred.promise;
	};
}]);