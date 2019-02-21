const yargs = require('yargs')
	.defaults({
		proxyPort: 3001,
	}).argv;

module.exports = {
	devServer: {
		proxy: {
			'**': {
				bypass(req) {
					if (!req.headers.accept.includes('application/json')) {
						console.log('do NOT proxy');
						return req.url;
					}
					console.log('do proxy');
				},
				target: `http://localhost:${yargs.proxyPort}`,
			},
		},
	},
	entry: './app',
}