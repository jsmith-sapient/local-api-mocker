const yargs = require('yargs')
	.defaults({
		proxyTarget: 'http://localhost:3001',
	}).argv;

module.exports = {
	devServer: {
		proxy: {
			'**': {
				bypass: ({ headers, url }) => !headers.accept.includes('application/json') && url,
				target: yargs.proxyTarget,
			},
		},
	},
}