angular.module('Come2HelpApp')
.controller('LoginController', ['$auth', '$location', function($auth, $location) {
	var vm = this;

	vm.credentials = {};

	vm.login = function() {
		// User transport object
		var transUser = {
			email: vm.user.email || '',
			password: vm.user.password || ''
		};
		$auth.login(transUser);
	};

	vm.authenticated = $auth.isAuthenticated.bind($auth);

	vm.logout = function() {
		$auth.removeToken();
		$location.path('/');
	};
}]);