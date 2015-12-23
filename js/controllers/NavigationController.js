angular.module('Come2HelpApp')
.controller('NavigationController', ['jwtService', function(jwtService) {
	var vm = this;

	vm.authenticated = jwtService.isAuthenticated.bind(jwtService);
	vm.logout = jwtService.logout;
}]);