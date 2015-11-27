angular.module('Come2HelpController').factory('Abilities', ['$resource', function ($resource) {
	return $resource('api/abilities/:id');
}]);

angular.module('Come2HelpController').factory('Volunteers', ['$resource', function ($resource) {
	return $resource('api/volunteers/:id');
}]);