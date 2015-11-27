angular.module('Come2HelpController')
	.controller('LoginCtrl', ['$scope', '$location', '$auth', function($scope, $location, $auth) {
		$scope.error = null;
		$scope.login = function() {
			$auth.login($scope.user)
				.then(function() {
					$location.path('/');
				})
				.catch(function(error) {
					$scope.error = error;
				});
		};
		$scope.authenticate = function(provider) {
			$auth.authenticate(provider)
				.then(function() {
					$location.path('/');
				})
				.catch(function(error) {
					if (error.error) {
						// Popup error - invalid redirect_uri, pressed cancel button, etc.
						$scope.error = error.error;
					} else if (error.data) {
						// HTTP response error from server
						$scope.error = error.data.message;
					} else {
						$scope.error = error(error);
					}
				});
		};
	}]);