angular.module('Come2HelpApp').config(['$authProvider', function ($authProvider) {

	$authProvider.signupUrl = '/api/volunteers';
	$authProvider.loginUrl = '/api/login/volunteer';

	$authProvider.facebook({
		clientId: '417693555105063',
		url: '/api/login/facebook'
	});

	$authProvider.google({
		clientId: '924036387059-anhuh3kr3b6cnopsjs5gfk2t7sq2u43o.apps.googleusercontent.com',
		url: '/api/login/google'
	});
}]);

angular.module('Come2HelpApp')
	.constant('roles', {
		USER: 'ROLE_USER',
		GUEST: 'ROLE_GUEST',
		VOLUNTEER: 'ROLE_VOLUNTEER',
		ORGANISATION_ADMIN: 'ROLE_ORGANISATION_ADMIN',
		C2H_ADMIN: 'ROLE_C2H_ADMIN'
	});

angular.module('Come2HelpApp').provider('authService', [function () {
	var tokenObservers = [];

	this.setToken = function (token) {
		tokenObservers.forEach(function (tokenObserver) {
			tokenObserver(token);
		});

	};

	this.$get = function () {
		return {
			addTokenObserver: function (tokenObserver) {
				tokenObservers.push(tokenObserver);
			}
		};
	};

}]);

angular.module('Come2HelpApp').service('jwtService', ['authService', '$window', '$auth', 'roles', '$route', function (authService, $window, $auth, roles, $route) {
	var jwt = null;

	this.isAuthenticated = function() {
		return jwt != null;
	};

	this.parseJWT = function (token) {
		$auth.setToken(token);
		jwt = $auth.getPayload();
		$route.reload();
	};

	this.logout = function() {
		jwt = null;

		$auth.removeToken();
		$route.reload();
	};

	this.getJWT = function () {
		return jwt;
	};

	this.hasAuthority = function (authority) {
		if (jwt == null || jwt.authorities == undefined) {
			return false;
		}
		return jwt.authorities.indexOf(authority) != -1;
	};

	this.isGuest = function () {
		return jwt == null || jwt.authorities.length == 0 || this.hasAuthority(roles.GUEST);
	};

	this.isOrganisation = function () {
		return this.hasAuthority(roles.ORGANISATION_ADMIN);
	};

	if ($auth.getToken()) {
		this.parseJWT($auth.getToken());
	}
	authService.addTokenObserver(this.parseJWT);
}]);

angular.module('Come2HelpApp').config(['$httpProvider', 'authServiceProvider', function ($httpProvider, authServiceProvider) {
	$httpProvider.interceptors.push(function ($q) {
		return {
			response: function (config) {
				var deferred = $q.defer();

				var token = config.headers('authorization');
				if (token != null) {
					authServiceProvider.setToken(token);
				}

				deferred.resolve(config);
				return deferred.promise;
			}
		};
	});
}]);