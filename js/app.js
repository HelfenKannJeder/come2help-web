angular.module('Come2HelpApp', [
	'ngRoute',
	'Come2HelpController',
	'uiGmapgoogle-maps',
	'pascalprecht.translate'
])
	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.
				when('/list', {
					templateUrl: 'partials/list.html',
					controller: 'ListController',
					controllerAs: 'ctrl'
				}).
				otherwise({
					redirectTo: '/list'
				});
		}]);