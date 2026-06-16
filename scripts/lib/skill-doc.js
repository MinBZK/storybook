/**
 * Shared helpers for the generators that emit bundled docs into the nldd skill
 * (reference.md, changelog.md, design-guidelines.md). They all read a source,
 * prepend an identical "GEGENEREERD BESTAND" comment header, write the result
 * and log it. Only the body transform differs per generator, so that stays in
 * each script; everything else lives here.
 */

import { readFileSync, writeFileSync } from 'node:fs';

/**
 * Build the standard generated-file comment header.
 *
 * @param {string|string[]} source - one or more lines describing the source of
 *   truth (the "Bron"/"Kopie van" line(s)).
 * @param {string} [regen] - the npm command to regenerate, default
 *   `npm run generate:skill-docs`.
 * @returns {string} the `<!-- ... -->` block, terminated by a blank line.
 */
export function generatedHeader(source, regen = 'npm run generate:skill-docs') {
	const sourceLines = (Array.isArray(source) ? source : [source]).map((line) => `  ${line}`);
	return [
		'<!--',
		'  GEGENEREERD BESTAND — niet handmatig bewerken.',
		...sourceLines,
		`  Hergenereren: ${regen}`,
		'-->',
		'',
		'',
	].join('\n');
}

/**
 * Read a source file, exiting with a clear message if it is missing.
 *
 * @param {string} path - absolute path to the source.
 * @param {string} [missingHint] - extra line printed when the file is absent.
 * @returns {string} the file contents.
 */
export function readSource(path, missingHint) {
	try {
		return readFileSync(path, 'utf-8');
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.error(`Source not found at ${path}.`);
			if (missingHint) console.error(missingHint);
			process.exit(1);
		}
		throw err;
	}
}

/**
 * Write a generated doc and log where it went.
 *
 * @param {string} path - absolute output path.
 * @param {string} contents - the full file contents (header + body).
 */
export function writeGenerated(path, contents) {
	writeFileSync(path, contents);
	console.log(`Wrote ${path} (${contents.split('\n').length} lines)`);
}
