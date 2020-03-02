require('source-map-support').install();

const fs = require('fs');
const path = require('path');
const glob = require('tiny-glob/sync');
const rimraf = require('rimraf').sync;
const assert = require('assert');
const child_process = require('child_process');

const degit = require('../dist/index.js');

const timeout = 30000;

function exec(cmd) {
	return new Promise((fulfil, reject) => {
		child_process.exec(cmd, (err, stdout, stderr) => {
			if (err) return reject(err);
			console.log(stdout);
			console.error(stderr);
			fulfil();
		});
	});
}

describe('degit', function() {
	this.timeout(timeout);

	beforeEach(async () => await rimraf('.tmp'));
	afterEach(async () => await rimraf('.tmp'));

	describe('gitlab.alibaba-inc', () => {
		[
			'https://gitlab.alibaba-inc.com/bigfish-blocks/risk-templates/config'
		].forEach(src => {
			it(src, async () => {
				await degit(src, {
					cache: false
				}).clone(`.tmp/test-repo`);
				const configPath = path.join(
					__dirname,
					`../.tmp/test-repo/config.js`
				);
				assert.equal(fs.existsSync(configPath), true);
			});
		});
	});
});

function read(file) {
	return fs.readFileSync(file, 'utf-8');
}
