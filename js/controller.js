angular.module('geoTodoController', ['ngResource']);

angular.module('geoTodoController').factory('Locations', function ($resource) {
	return $resource('api/locations/:id');
});

angular.module('geoTodoController').factory('Tasks', function ($resource) {
	return $resource('api/tasks/:id');
});

angular.module('geoTodoController').service('geocoder', function () {
	this.geocode = function (address, outerCallback) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': address}, function (results, status) {
			$log(results);
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
});

angular.module('geoTodoController').controller('MapController', ['$scope', 'Locations', function ($scope, Locations) {
	var vm = $scope; // TODO: Should be this

	vm.map = {center: {latitude: 51.163333, longitude: 10.447778}, zoom: 6};

	Locations.query(function (data) {
		vm.locations = data;
	});

	vm.openDetails = function (id) {
		location.href = '#/detail/' + id;
	};
}]);

angular.module('geoTodoController').controller('ListController', ['$scope', 'Locations', function ($scope, Locations) {
	var vm = $scope; // TODO: Should be this

	Locations.query(function (data) {
		vm.locations = data;
	});
}]);

angular.module('geoTodoController').controller('DetailController', ['$scope', 'Locations', '$routeParams', function ($scope, Locations, $routeParams) {
	var vm = $scope; // TODO: Should be this

	vm.locationId = $routeParams.locationId;
}]);

angular.module('geoTodoController').controller('NewController', ['$scope', 'Locations', 'Tasks', 'geocoder', function ($scope, Locations, Tasks, geocoder) {
	var vm = $scope; // TODO: Should be this

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

			$log(results); //{success: true, err: undefined, results: {...} or {success:false, err: Error object, results: undefined}
		});
	};
}]);