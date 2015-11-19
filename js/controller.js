angular.module('Come2HelpController', ['ngResource']);

angular.module('Come2HelpController').factory('Locations', ['$resource', function ($resource) {
	return $resource('api/locations/:id');
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

angular.module('Come2HelpController').controller('ListController', ['Locations', function (Locations) {
	var vm = this;

	Locations.query(function (data) {
		vm.locations = data;
	});
}]);