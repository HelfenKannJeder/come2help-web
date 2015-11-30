angular.module('Come2HelpController')
	.controller('RegisterController', ['Abilities', '$routeParams', '$location', '$auth', function(Abilities, $routeParams, $location, $auth) {
		var vm = this;

		vm.errors = null;
		vm.user = {};

		Abilities.query(function(data) {
			vm.abilities = data;
		});

		vm.signup = function() {

			// abilities transport array
			var transAbilities = [];
			for (var abilityId in vm.user.abilities) {
				if (vm.user.abilities.hasOwnProperty(abilityId) && vm.user.abilities[abilityId] === true) {
					transAbilities.push({id:parseInt(abilityId)});
				}
			}

			// user transport object
			var transUser = {
				abilities: transAbilities,
				address: {
					zipCode: vm.user.zipCode || ''
				},
				adult: vm.user.adult === true,
				email: vm.user.email || '',
				givenName: vm.user.givenName || '',
				phone: vm.user.phone || '',
				surname: vm.user.surname || ''
			};

			$auth.signup(transUser)
				.then(function(response) {;
					if (!response.status === 200) {
						return handleError(response);
					}

					// the response doesn’t contain a token yet. Continue here.
					$auth.setToken(response);

					$location.path('/register/done');
				}, handleError);

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
		};
	}]);