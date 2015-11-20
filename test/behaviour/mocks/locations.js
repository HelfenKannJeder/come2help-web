module.exports = {
	request: {
		path: '/locations',
		method: 'GET'
	},
	response: {
		data: [{
			id: 1,
			name: 'Sandsäcke füllen',
			latitude: 49.1232,
			longitude: 8,
			location: 'Schlossplatz'
		}, {
			id: 2,
			name: 'Transport',
			latitude: 48.1232,
			longitude: 8,
			location: 'Rheinbad',
			options: {
				title: 'Transport im Rheinbad'
			}
		}, {
			id: 2,
			name: 'Test 3',
			latitude: 48.1232,
			longitude: 8,
			location: 'Rheinbad',
			options: {
				title: 'Transport im Rheinbad'
			}
		}]
	}
};