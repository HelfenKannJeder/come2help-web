angular.module('Come2HelpController')
	.controller('LoginController', ['$scope', '$location', '$auth', function($scope, $location, $auth) {
		var vm = this;

		vm.error = null;
		vm.login = function() {
			$auth.login(vm.user)
				.then(function() {
					$location.path('/');
				})
				.catch(function(error) {
					vm.error = error;
				});
		};
		vm.authenticate = function(provider) {
			$auth.authenticate(provider)
				.then(function(response) {
					var token = response.data.token;
					if (!token) {
						throw new Error('The server sent an unintelligible response!');
					}
					$auth.setToken(response.data.token);
				})
				.catch(function(error) {
					if (error.error) {
						// Popup error - invalid redirect_uri, pressed cancel button, etc.
						vm.error = error.error;
					} else if (error.data) {
						// HTTP response error from server
						vm.error = error.data.message;
					} else {
						vm.error = error(error);
					}
				});
		};
	}]);