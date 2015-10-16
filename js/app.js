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
				controller: 'MapController',
				controllerAs: 'ctrl'

			}).
			when('/list', {
				templateUrl: 'partials/list.html',
				controller: 'ListController',
				controllerAs: 'ctrl'
			}).
			when('/detail/:locationId', {
				templateUrl: 'partials/detail.html',
				controller: 'DetailController',
				controllerAs: 'ctrl'

			}).
			when('/new', {
				templateUrl: 'partials/new.html',
				controller: 'NewController',
				controllerAs: 'ctrl'

			}).
			otherwise({
				redirectTo: '/map'
			});
	}]);