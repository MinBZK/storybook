/**
 * Sync the Claude Code plugin version to the package version.
 *
 * The plugin (`.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`)
 * ships the nldd consumer skill via `source: "./"`. Claude Code caches a plugin
 * by the version in `plugin.json`: if that version does not change, consumers
 * never re-fetch the skill, no matter how much its content changed. So the
 * plugin version has to move whenever a release changes the bundled skill docs.
 *
 * Rather than maintain a second, hand-bumped version, the plugin simply follows
 * the package version. `package.json` is the single source of truth (bumped by
 * semantic-release); this script writes that version into both plugin manifests.
 * semantic-release runs it in `prepareCmd` (via `generate:skill-docs`) so the
 * bump lands in the same release commit as the regenerated docs.
 *
 * Idempotent: running it twice produces no diff.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const packageVersion = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8')).version;
if (!packageVersion) {
	console.error('No version found in package.json.');
	process.exit(1);
}

/**
 * Read a JSON file, apply a mutation, and write it back only if the version
 * actually changed. Preserves 2-space indentation and the trailing newline so
 * the output stays byte-stable across runs.
 *
 * @param {string} relPath - path relative to the repo root.
 * @param {(data: any) => string} currentVersionOf - returns the version the
 *   file currently holds, used to short-circuit no-op writes.
 * @param {(data: any) => void} setVersion - mutates the parsed data in place.
 */
function syncVersion(relPath, currentVersionOf, setVersion) {
	const path = join(root, relPath);
	const data = JSON.parse(readFileSync(path, 'utf-8'));
	const before = currentVersionOf(data);
	if (before === packageVersion) {
		console.log(`${relPath} already at ${packageVersion}`);
		return;
	}
	setVersion(data);
	writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
	console.log(`${relPath}: ${before} -> ${packageVersion}`);
}

syncVersion(
	'.claude-plugin/plugin.json',
	(d) => d.version,
	(d) => {
		d.version = packageVersion;
	},
);

syncVersion(
	'.claude-plugin/marketplace.json',
	(d) => d.plugins?.map((p) => p.version).join(','),
	(d) => {
		for (const plugin of d.plugins ?? []) plugin.version = packageVersion;
	},
);
