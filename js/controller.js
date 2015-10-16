angular.module('geoTodoController', ['ngResource']);

angular.module('geoTodoController').factory('Locations', ['$resource', function ($resource) {
	return $resource('api/locations/:id');
}]);

angular.module('geoTodoController').factory('Tasks', ['$resource', function ($resource) {
	return $resource('api/tasks/:id');
}]);

angular.module('geoTodoController').service('geocoder', [function () {
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

angular.module('geoTodoController').controller('MapController', ['Locations', function (Locations) {
	var vm = this;

	vm.map = {center: {latitude: 51.163333, longitude: 10.447778}, zoom: 6};

	Locations.query(function (data) {
		vm.locations = data;
	});

	vm.openDetails = function (id) {
		location.href = '#/detail/' + id;
	};
}]);

angular.module('geoTodoController').controller('ListController', ['Locations', function (Locations) {
	var vm = this;

	Locations.query(function (data) {
		vm.locations = data;
	});
}]);

angular.module('geoTodoController').controller('DetailController', ['Locations', '$routeParams', function (Locations, $routeParams) {
	var vm = this;

	vm.locationId = $routeParams.locationId;
}]);

angular.module('geoTodoController').controller('NewController', ['Locations', 'Tasks', 'geocoder', function (Locations, Tasks, geocoder) {
	var vm = this;

	Tasks.query(function (data) {
		vm.tasks = data;
	});

	vm.addNew = function () {
		var result = geocoder.geocode(vm.inputLocation, function (results) {
			Locations.save({
				'name': vm.inputName,
				'location': vm.inputLocation,
				'latitude': results.results[0].geometry.location.G,
				'longitude': results.results[0].geometry.location.K
			});

			vm.inputName = '';
			vm.inputLocation = '';
		});
	};
}]);