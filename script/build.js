#!/usr/bin/env node
import fs from 'fs-extra';
import util from 'util';
import path from 'path';
import parcel from 'parcel-bundler';
import process from 'child_process';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let exec = util.promisify(process.exec);
let resolve = path.resolve.bind(path, __dirname, '..');

let run = async () => {
	await fs.emptyDir(resolve('build'));

	let bundler = new parcel('src/index.html', {
		hmr: false,
		cache: false,
		watch: false,
		target: 'browser',
		outDir: resolve('build/box-maker'),
		outFile: 'index.html',
		publicUrl: './',
		sourceMaps: false,
		autoinstall: false,
		detailedReport: true,
	});

	bundler.on('buildEnd', async () => {
		await fs.copyFile(resolve('src/plugin/main.rb'), resolve('build/box-maker/main.rb'));
		await fs.copyFile(resolve('src/plugin/box-maker.rb'), resolve('build/box-maker.rb'));
		await exec(`cd ${resolve('build')} && zip -r -X ./box-maker.rbz *`);
	});

	await bundler.bundle();
};

run();
