angular.module('Come2HelpApp', [
	'ngRoute',
	'Come2HelpController',
	'uiGmapgoogle-maps',
	'pascalprecht.translate'
])
	.config(['$routeProvider',
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
				when('/organisation/volunteerList', {
					templateUrl: 'partials/organisation/volunteerList.html',
					controller: 'VolunteerListController',
					controllerAs: 'ctrl'
				}).
				otherwise({
					redirectTo: '/map'
				});
		}]);