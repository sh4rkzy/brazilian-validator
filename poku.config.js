const { defineConfig } = require('poku');

module.exports = defineConfig({
	include: ['.'],
	sequential: true,
	debug: false,
	filter: /\.(test.|.spec)\./,
	exclude: [],
	failFast: false,
	concurrency: 0,
	quiet: false,
	kill: {
		port: [3000],
		range: [
			[3000, 3003],
			[4000, 4002],
		],
		pid: [612],
	},
	beforeEach: () => true,
	afterEach: () => true,
});
