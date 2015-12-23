angular.module('Come2HelpController')
	.controller('RegisterController', ['Abilities', '$route', '$auth', 'jwtService', function (Abilities, $route, $auth, jwtService) {
		var vm = this;

		vm.errors = null;
		vm.user = {};
		vm.isSignup = jwtService.isAuthenticated.bind(jwtService);

		Abilities.query(function (data) {
			vm.abilities = data;
		});

		vm.signup = signup;
		vm.authenticate = authenticate;

		function authenticate(provider) {
			$auth.authenticate(provider)
				.then(handleResponse)
				.catch(handleError);
		};

		function login() {
			// user transport object
			var transUser = {
				email: vm.user.email || '',
				password: vm.user.password || ''
			};

			$auth.login(transUser)
				.then(handleResponse)
				.catch(handleError);
		};

		function signup() {
			// abilities transport array
			var transAbilities = [];
			for (var abilityId in vm.user.abilities) {
				if (vm.user.abilities.hasOwnProperty(abilityId) && vm.user.abilities[abilityId] === true) {
					transAbilities.push({
						id: parseInt(abilityId)
					});
				}
			}

			// user transport object
			var volunteer = {
				abilities: transAbilities,
				user: {
					address: {
						zipCode: vm.user.zipCode || ''
					},
					adult: vm.user.adult === true,
					email: vm.user.email || '',
					givenName: vm.user.givenName || '',
					phone: vm.user.phone || '',
					surname: vm.user.surname || ''
				}
			};

			$auth.signup(volunteer)
				.then(handleResponse)
				.catch(handleError);
		};

		function handleResponse(response) {
			fillForm();
		};

		function fillForm() {
			var jwt = jwtService.getJWT();

			if (jwt) {
				vm.user.email = jwt.email;
				vm.user.givenName = jwt.name;
				vm.user.surname = jwt.surname;
			}
		};

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
		};

		fillForm();
	}]);