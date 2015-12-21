angular.module('Come2HelpApp')
.controller('NavigationController', ['$auth', '$location', 'jwtService', function($auth, $location, jwtService) {
	var vm = this;

	vm.authenticated = $auth.isAuthenticated.bind($auth);
	vm.logout = function() {
		$auth.removeToken();
		$location.path('/');
	};
}]);