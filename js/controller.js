angular.module('Come2HelpController', ['ngResource']);

angular.module('Come2HelpController').factory('Abilities', ['$resource', function ($resource) {
	return $resource('api/abilities/:id');
}]);

angular.module('Come2HelpController').factory('Volunteers', ['$resource', function ($resource) {
	return $resource('api/volunteers/:id');
}]);

angular.module('Come2HelpController').service('geocoder', [function () {
	this.geocode = function (address, outerCallback) {
		var geocoder = new google.maps.Geocoder();

		geocoder.geocode({'address': address}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				outerCallback({success: true, err: null, results: results});
			} else {
				outerCallback({
					success: false,
					err: new Error('Geocode was not successful for the following reason: ' + status),
					results: null
				});
			}
		});
	};
}]);

angular.module('Come2HelpController').controller('RegisterController', ['Abilities', 'Volunteers', '$routeParams', function (Abilities, Volunteers, $routeParams) {
	var vm = this;

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

		});
	};
}]);