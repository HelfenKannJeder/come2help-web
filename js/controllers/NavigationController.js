angular.module('Come2HelpApp')
.controller('NavigationController', ['jwtService', '$location', function(jwtService, $location) {
	var vm = this;

	vm.authenticated = jwtService.isAuthenticated.bind(jwtService);
	vm.isGuest = jwtService.isGuest.bind(jwtService);
	vm.isOrganisation = jwtService.isOrganisation.bind(jwtService);
	vm.logout = jwtService.logout;

	vm.getClass = function (path) {
		if ($location.path().substr(0, path.length) === path) {
			return 'active';
		} else {
			return '';
		}
	};
}]);