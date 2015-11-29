angular.module('Come2HelpApp', [
	'ngRoute',
	'Come2HelpController',
	'uiGmapgoogle-maps',
	'pascalprecht.translate',
	'smart-table'
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
					templateUrl: 'partials/registerDone.html'
				}).
				when('/organisation/volunteerList', {
					templateUrl: 'partials/organisation/volunteerList.html',
					controller: 'VolunteerListController',
					controllerAs: 'ctrl'
				}).
				otherwise({
					redirectTo: '/register'
				});
		}]);