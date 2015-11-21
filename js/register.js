angular.module('Come2HelpController').controller('RegisterController', ['Abilities', 'Volunteers', '$routeParams', function (Abilities, Volunteers, $routeParams) {
	var vm = this;

	vm.errors = null;

	Abilities.query(function (data) {
		vm.abilities = data;
	});

	vm.doRegister = function () {
		Volunteers.save({
			'givenName': vm.givenName,
			'surname': vm.surname,
			'address': {
				'zipCode': vm.zipCode
			},
			'phone': vm.phone,
			'adult': vm.adult == true

		}, function() {
			vm.errors = null;


			// TODO: Clear form and send to ``thank you''-page
		}, function (response) {
			vm.errors = {};

			for (var i = 0; i < response.data.clientErrors.length; i++) {
				var errorData = response.data.clientErrors[i];
				vm.errors[errorData.path] = true;
			}
		});
	};
}]);