angular.module('Come2HelpApp').config(['$authProvider', function($authProvider) {

	$authProvider.signupUrl = '/api/volunteers';
	$authProvider.loginUrl = '/api/login/volunteer';

	$authProvider.facebook({
		clientId: '417693555105063',
		url: '/api/login/facebook'
	});

	$authProvider.google({
		clientId: '924036387059-anhuh3kr3b6cnopsjs5gfk2t7sq2u43o.apps.googleusercontent.com',
		url: '/api/login/google'
	});
}]);