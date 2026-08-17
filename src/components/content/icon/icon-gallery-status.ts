// Icons added or redrawn in the most recent icon batch. The IconGallery story
// renders a "New" or "Updated" tag on these tiles, so consumers browsing the
// gallery spot what changed without reading the changelog.
//
// Both sets are derived from git history rather than kept by hand, and they are
// recomputed (not extended) with every batch, from a date you pick: the day of
// the oldest batch that should still read as new. Everything still uncommitted
// counts as new too, being by definition the batch you are adding right now.
//
// Three to four weeks back is the measure, not a number of batches. How much
// arrives in those weeks varies, and a busy fortnight that fills the gallery
// with "new" is the honest answer: that much of it is new. Shortening the
// window because a batch was large takes the label away from icons that are
// days old, which is what the label is for. A date rather than a rolling window
// so the sets only move when someone recomputes them.
//
//   git log --since=2026-08-01 --reverse --find-renames --name-status --format= \
//     -- src/components/content/icon/icons
//
// Read those events oldest first and chain renames forward to today's filename.
// An icon born inside the window is new, under whatever name it ended up with;
// an icon that was only changed or renamed inside the window is updated; a name
// that no longer exists drops out of both sets. New wins when both apply.
//
// Do not use `git log --follow` for this: on files this small its rename
// detection links unrelated icons (it reads pause-filled as a descendant of
// caret-down), which quietly moves new icons into the updated set.

export const NEW_ICONS = new Set([
	'boxes-3',
	'brackets-ellipsis-badge-plus',
	'check-mark-circle-light',
	'circle',
	'circle-circle',
	'circle-circle-light',
	'circle-light',
	'clipboard-bullet-list',
	'clock-light',
	'cpu',
	'display',
	'external-hard-drive',
	'git-branch',
	'git-commit',
	'git-compare',
	'git-fork',
	'git-merge',
	'git-pull-request',
	'git-pull-request-closed',
	'git-pull-request-draft',
	'gpu',
	'kanban-columns',
	'kvm-switch',
	'lightning',
	'memory-chip',
	'minus-circle',
	'network-patch-mapping',
	'network-switch',
	'paintbrush',
	'pci-card',
	'power-plug',
	'printer',
	'psu',
	'puzzle-piece-badge-plus',
	'rack-server',
	'rack-servers',
	'seal-star',
	'shield-arrow-right-arrow-left',
	'ship-wheel-badge-plus',
	'slash-circle-light',
	'snowflake',
	'ssd-hard-drive',
	'storage',
	'transceiver-module',
	'viewfinder-line',
]);

export const UPDATED_ICONS = new Set([
	'exclamation-2-circle',
	'flag',
	'media-pause',
	'media-pause-filled',
	'media-play',
	'media-play-filled',
	'media-play-pause',
	'media-play-pause-filled',
	'media-stop',
	'media-stop-filled',
	'point-bottom-left-to-point-top-right-s-curve-path',
	'seal-check-mark',
	'shield',
	'shield-check-mark',
	'shield-lock',
	'trash',
	'viewfinder',
]);
