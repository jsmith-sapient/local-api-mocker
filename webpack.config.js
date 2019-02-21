const yargs = require('yargs')
	.defaults({
		proxyTarget: 'http://localhost:3001',
	}).argv;

module.exports = {
	devServer: {
		proxy: {
			'**': {
				bypass({ headers, url }) {
					if (!headers.accept.includes('application/json')) return url;
				},
				target: yargs.proxyTarget,
			},
		},
	},
}