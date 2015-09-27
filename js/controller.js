var geoTodoController = angular.module('geoTodoController', ['ngResource']);

geoTodoController.factory('Locations', function ($resource) {
    return $resource("api/locations/:id");
});

geoTodoController.service('geocoder', function () {
    this.geocode = function (address, outerCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            console.log(results);
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

geoTodoController.controller('MapCtrl', ['$scope', 'Locations', function ($scope, Locations) {
    $scope.map = {center: {latitude: 48.1232, longitude: 8}, zoom: 8};

    Locations.query(function(data) {
        $scope.locations = data;
    });

    $scope.openDetails = function (id) {
        location.href = '#/detail/' + id;
    };
}]);

geoTodoController.controller('ListCtrl', ['$scope', 'Locations', function ($scope, Locations) {
    Locations.query(function(data) {
        $scope.locations = data;
    });
}]);

geoTodoController.controller('DetailCtrl', ['$scope', 'Locations', '$routeParams', function ($scope, Locations, $routeParams) {
    $scope.locationId = $routeParams.locationId;
}]);

geoTodoController.controller('NewCtrl', ['$scope', 'Locations', 'geocoder', function ($scope, Locations, geocoder) {
    $scope.addNew = function () {
        var result = geocoder.geocode($scope.inputLocation, function (results) {
            Locations.save({
                'id': Locations.length,
                'name': $scope.inputName,
                'location': $scope.inputLocation,
                'latitude': results.results[0].geometry.location.G,
                'longitude': results.results[0].geometry.location.K
            });

            $scope.inputName = "";
            $scope.inputLocation = "";

            console.log(results); //{success: true, err: undefined, results: {...} or {success:false, err: Error object, results: undefined}
        });


    }
}]);