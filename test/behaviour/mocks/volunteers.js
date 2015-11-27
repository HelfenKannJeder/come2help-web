module.exports = [
	{
		request: {
			path: '/volunteers',
			method: 'POST',
			data: {
				givenName: 'Max',
				surname: 'Mustermann',
				address: {
					zipCode: '76187'
				},
				phone: '0157812312335',
				adult: true
			}
		},
		response: {
			status: 200,
			data: [{
				id: 42,
				givenName: 'Max',
				surname: 'Mustermann',
				address: {
					zipCode: '76187'
				},
				phone: '0157812312335',
				adult: true
			}]
		}
	},
	{
		request: {
			path: '/volunteers',
			method: 'POST',
			data: {
				givenName: 'Max',
				surname: 'Mustermann',
				address: {
					zipCode: '76187'
				},
				phone: '0157812312335',
				adult: false
			}
		},
		response: {
			status: 400,
			data: {
				incidentId: '2a980d8c-4e98-49b4-aac7-a4faa7606a21',
				clientErrors: [{
					path: 'adult',
					code: 'has to be true',
					value: false
				}]
			}
		}
	}
];