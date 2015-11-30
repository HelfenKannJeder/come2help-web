angular.module('Come2HelpApp')
.controller('NavigationController', ['$auth', '$location', function($auth, $location) {
	var vm = this;

	vm.authenticated = $auth.isAuthenticated.bind($auth);
	vm.logout = function() {
		$auth.removeToken();
		$location.path('/');
	};
}]);