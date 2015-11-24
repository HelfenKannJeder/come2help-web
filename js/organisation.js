angular.module('Come2HelpController').factory('Volunteers', ['$resource', function ($resource) {
	return $resource('api/volunteers/:id');
}]);

angular.module('Come2HelpController').controller('VolunteerListController', ['Volunteers', function (Volunteers) {
	var vm = this;

	Volunteers.query({
		latitude: 49,
		longitude: 8,
		distance: 1000000000
	}, function (data) {
		vm.volunteers = data;
	});
}]);
