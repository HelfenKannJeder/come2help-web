angular.module('Come2HelpController').controller('RegisterController', ['Abilities', 'Volunteers', '$routeParams', '$location', function (Abilities, Volunteers, $routeParams, $location) {
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

			vm.givenName = '';
			vm.surname = '';
			vm.zipCode = '';
			vm.phone = '';
			vm.adult = null;

			$location.path('/register/done');
		}, function (response) {
			vm.errors = {};

			for (var i = 0; i < response.data.clientErrors.length; i++) {
				var errorData = response.data.clientErrors[i];
				vm.errors[errorData.path] = true;
			}
		});
	};
}]);

angular.module('Come2HelpController').controller('RegisterDoneController', function () {

});