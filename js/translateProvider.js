angular.module('Come2HelpApp').config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useSanitizeValueStrategy('escapeParameters');

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
		'Given Name': 'Givenname',
		'Surname': 'Surname',
		'Zip Code': 'Zip Code',
		'E-Mail-Address': 'E-Mail-Address',
		'Password': 'Password',
		'Phone': 'Phone',
		'I’m an adult': 'I’m an adult',
		'Abilities': 'Abilities',
		'Please correct the highlighted fields.': 'Please correct the highlighted fields.',
		'A fatal error occured': 'A fatal error occurred',
		'Thank you for register!': 'Thank you for register!',
		'Welcome to come2help!': 'Welcome to come2help!',
		'or': 'or',
		'Log in': 'Log in',
		'Sign up': 'Sign up',
		'Register': 'Register',
		'Volunteers': 'Volunteers',
		'Imprint': 'Imprint',
		'Logout': 'Logout',
		'Search': 'Search',
		'Distance': 'Distance'
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
		'Given Name': 'Vorname',
		'Surname': 'Nachname',
		'Zip Code': 'PLZ',
		'E-Mail-Address': 'E-Mail-Adresse',
		'Password': 'Passwort',
		'Phone': 'Telefonnummer',
		'I’m an adult': 'Ich bin volljährig',
		'Abilities': 'Fähigkeiten',
		'Please correct the highlighted fields.': 'Bitte korrigiere die hervorgebenen Felder.',
		'A fatal error occured': 'Es ist ein unerwarteter Fehler aufgetreten',
		'Thank you for register!': 'Danke für die Registrierung!',
		'Welcome to come2help!': 'Willkommen bei come2help!',
		'or': 'oder',
		'Log in': 'Einloggen',
		'Sign up': 'Registrieren',
		'Register': 'Registrierung',
		'Volunteers': 'Helferliste',
		'Imprint': 'Impressum',
		'Logout': 'Abmelden',
		'Search': 'Suche',
		'Distance': 'Entfernung'
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