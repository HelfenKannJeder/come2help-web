module.exports = [{
	request: {
		path: '/volunteers',
		method: 'GET'
	},
	response: {
		data: [{
			id: 1,
			givenName: 'Max 1',
			surname: 'Mustermann 1',
			address: {zipCode: '76133'},
			phone: '01234 567890',
			adult: true,
			abilities: []
		}, {
			id: 1,
			givenName: 'Max 2',
			surname: 'Mustermann 2',
			address: {zipCode: '76133'},
			phone: '01234 567890',
			adult: true,
			abilities: []
		}]
	}
}];