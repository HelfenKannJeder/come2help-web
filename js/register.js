angular.module('Come2HelpController')
	.controller('RegisterController', ['Abilities', '$routeParams', '$location', '$auth', '$http', function(Abilities, $routeParams, $location, $auth, $http) {
		var vm = this;

		vm.errors = null;
		vm.user = {};

		Abilities.query(function(data) {
			vm.abilities = data;
		});

		vm.signup = function() {
			var transUser = {
				'abilities': [],
				'address': {
					'zipCode': vm.user.zipCode
				},
				'adult': vm.user.adult,
				'email': vm.user.email,
				'givenName': vm.user.givenName,
				'id': 0,
				'phone': vm.user.phone,
				'surname': vm.user.surname
			};

			$http({
				method: 'GET',
				url: '/someUrl'
			});

			$auth.signup(transUser)
				.then(function(response) {
					$auth.setToken(response);

					$location.path('/register/done');
				})
				.catch(function(response) {
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
				});
		};
	}]);