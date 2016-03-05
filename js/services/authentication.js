angular.module('Come2HelpApp')
	.factory('authentication', ['$route', '$auth', function($route, $auth) {

		function login(email, password) {
			var trans = {
				email: email || '',
				password: pasword || ''
			};
			$auth.login(trans)
				.then(handleResponse)
				.catch(handleError);
		};

		function signup() {
			$auth.signup(transUser)
				.then(handleResponse)
				.catch(handleError);
		};

		function handleResponse(response) {
			var token = response.data.token;
			if (!token) {
				throw new Error('The server sent an unintelligible response!');
			}
			$auth.setToken(response.data.token);
			$route.reload();
		}

		function handleError(response) {
			vm.errors = {};

			if (response.data.clientErrors) {
				vm.errors.badData = true;
				for (var i = 0; i < response.data.clientErrors.length; i++) {
					var errorData = response.data.clientErrors[i];
					vm.errors[errorData.path] = true;
				}
			} else {
				vm.errors.message = response.data;
			}
		}

		return {
			login: login,
			signup: signup,
			authenticate: $auth.authenticate.bind($auth)
		};
	}]);