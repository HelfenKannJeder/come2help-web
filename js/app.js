angular.module('Come2HelpApp', [
	'ngRoute',
	'Come2HelpController',
	'uiGmapgoogle-maps',
	'pascalprecht.translate'
])
	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.
				when('/register', {
					templateUrl: 'partials/register.html',
					controller: 'RegisterController',
					controllerAs: 'ctrl'
				}).
				when('/register/done', {
					templateUrl: 'partials/registerDone.html',
					controller: 'RegisterDoneController',
					controllerAs: 'ctrl'
				}).
				otherwise({
					redirectTo: '/register'
				});
		}]);