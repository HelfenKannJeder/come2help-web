angular.module('geoTodoApp', [
	'ngRoute',
	'geoTodoController',
	'uiGmapgoogle-maps',
	'pascalprecht.translate'
]);

angular.module('geoTodoApp').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/map', {
				templateUrl: 'partials/map.html',
				controller: 'MapController'
			}).
			when('/list', {
				templateUrl: 'partials/list.html',
				controller: 'ListController'
			}).
			when('/detail/:locationId', {
				templateUrl: 'partials/detail.html',
				controller: 'DetailController'
			}).
			when('/new', {
				templateUrl: 'partials/new.html',
				controller: 'NewController'
			}).
			otherwise({
				redirectTo: '/map'
			});
	}]);