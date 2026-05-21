#!/usr/bin/env node
/**
 * Draft changelog generator — prints a markdown list of every relevant
 * commit since the last v* tag, linked to its GitHub SHA, so a human can
 * curate the next release's CHANGELOG entry (pick highlights, trim noise,
 * group into Keep a Changelog sections).
 *
 * The actual sectioned grouping ("Added"/"Fixed"/…) lands at release
 * time via @semantic-release/release-notes-generator + the presetConfig
 * in .releaserc.json. This draft tool intentionally stays unopinionated:
 * one flat list is the easiest starting point for editing.
 */
import { ConventionalChangelog } from 'conventional-changelog';
import { execSync } from 'node:child_process';

const lastTag = execSync('git tag -l "v*" --sort=-v:refname', { encoding: 'utf8' })
	.split('\n')
	.filter(Boolean)[0];

if (!lastTag) {
	console.error('No version tag found (looking for v*). Aborting.');
	process.exit(1);
}

const generator = new ConventionalChangelog()
	.readPackage()
	.readRepository()
	.loadPreset('conventionalcommits')
	.commits({ from: lastTag, to: 'HEAD' })
	.context({ version: 'NEXT' });

generator.writeStream().pipe(process.stdout);
