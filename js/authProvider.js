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

angular.module('Come2HelpApp').provider('authService', [function() {
	var token = null;
	var tokenObservers = [];

	this.setToken = function(token) {
		this.token = token;

		tokenObservers.forEach(function (tokenObserver) {
			tokenObserver(token);
		});

	};

	this.$get = function() {
		return {
			addTokenObserver: function(tokenObserver) {
				tokenObservers.push(tokenObserver);
			}
		};
	};

}]);

angular.module('Come2HelpApp').service('jwtService', ['authService', '$window', '$auth', '$route', function (authService, $window, $auth, $route) {
	var jwt = null;

	this.parseJWT = function(token) {
		$auth.setToken(token);

		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		jwt = angular.fromJson($window.atob(base64));

		$route.reload();
	};

	this.getJWT = function() {
		return jwt;
	}

	authService.addTokenObserver(this.parseJWT);
}]);

angular.module('Come2HelpApp').config(['$httpProvider', 'authServiceProvider', function ($httpProvider, authServiceProvider) {
	$httpProvider.interceptors.push(function ($q, $log) {
		var readTokenInterceptor = {
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
		return readTokenInterceptor;
	});
}]);