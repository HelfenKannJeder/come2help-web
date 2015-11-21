angular.module('Come2HelpApp').config(['$translateProvider', function ($translateProvider) {
	$translateProvider.translations('en', {
		'Map': 'Map',
		'List': 'List',
		'Add': 'Add',
		'Name': 'Name',
		'Location': 'Location',
		'Show': 'Show',
		'New Operation Request': 'New Operation Request',
		'Project': 'Project',
		'Tasks': 'Tasks',
		'Name': 'Name',
		'Givenname': 'Givenname',
		'Surname': 'Surname',
		'Zip Code': 'Zip Code',
		'E-Mail-Address': 'E-Mail-Address',
		'Phone': 'Phone',
		'Is Adult': 'Is Adult',
		'Abilities': 'Abilities',
		'Please correct the highlighted fields.': 'Please correct the highlighted fields.',
		'Thank you for register!': 'Thank you for register!'
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
		'Tasks': 'Aufgaben',
		'Name': 'Name',
		'Givenname': 'Vorname',
		'Surname': 'Nachname',
		'Zip Code': 'PLZ',
		'E-Mail-Address': 'E-Mail-Adresse',
		'Phone': 'Telefonnummer',
		'Is Adult': 'Volljährig?',
		'Abilities': 'Fähigkeiten',
		'Please correct the highlighted fields.': 'Bitte korrigiere die hervorgebenen Felder.',
		'Thank you for register!': 'Danke für die Registrierung!'
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