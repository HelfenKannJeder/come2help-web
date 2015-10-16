angular.module('geoTodoApp').config(['$translateProvider', function ($translateProvider) {
	$translateProvider.translations('en', {
		'Map': 'Map',
		'List': 'List',
		'Add': 'Add',
		'Name': 'Name',
		'Location': 'Location',
		'Show': 'Show',
		'New Operation Request': 'New Operation Request',
		'Project': 'Project',
		'Tasks': 'Tasks'
	});

	$translateProvider.translations('de', {
		'Map': 'Karte',
		'List': 'Liste',
		'Add': 'Hinzufügen',
		'Name': 'Name',
		'Location': 'Ort',
		'Show': 'Anzeigen',
		'New Operation Request': 'Neue Einsatzanfrage',
		'Project': 'Projekt',
		'Tasks': 'Aufgaben'
	});

	$translateProvider.fallbackLanguage('en')
		.registerAvailableLanguageKeys(['en', 'de'], {
			'en_US': 'en',
			'en_UK': 'en',
			'de_DE': 'de',
			'de_CH': 'de'
		})
		.determinePreferredLanguage();
}]);