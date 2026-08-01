/**
 * Sync the release metadata in publiccode.yml to the package.
 *
 * `softwareVersion` and `releaseDate` are the only fields in that file that
 * change on every release, and they are the ones a catalogue shows first. Left
 * to a human they rot within a month, so they are derived: the version from
 * package.json, the date from the newest block in CHANGELOG.md.
 *
 * Runs from semantic-release's prepareCmd, after @semantic-release/npm has
 * bumped package.json and @semantic-release/changelog has written the new
 * version block, so both sources are already the ones being released.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8')).version;
if (!version) {
	console.error('No version found in package.json.');
	process.exit(1);
}

// The changelog header semantic-release writes: ## <small>0.8.73 (2026-07-30)</small>
const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf-8');
const dateMatch = changelog.match(/^## <small>[\d.]+ \((\d{4}-\d{2}-\d{2})\)<\/small>/m);
if (!dateMatch) {
	console.error('No dated version block found in CHANGELOG.md.');
	process.exit(1);
}
const releaseDate = dateMatch[1];

const path = join(root, 'publiccode.yml');
const before = readFileSync(path, 'utf-8');
const after = before
	.replace(/^softwareVersion: .*$/m, `softwareVersion: "${version}"`)
	.replace(/^releaseDate: .*$/m, `releaseDate: "${releaseDate}"`);

if (!/^softwareVersion: "/m.test(after) || !/^releaseDate: "/m.test(after)) {
	console.error('publiccode.yml has no softwareVersion or releaseDate to fill.');
	process.exit(1);
}

if (after === before) {
	console.log(`publiccode.yml already at ${version} (${releaseDate})`);
} else {
	writeFileSync(path, after);
	console.log(`publiccode.yml -> ${version} (${releaseDate})`);
}
