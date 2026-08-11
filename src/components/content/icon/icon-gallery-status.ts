// Icons added or redrawn in the most recent icon batch. The IconGallery story
// renders a "New" or "Updated" tag on these tiles, so consumers browsing the
// gallery spot what changed without reading the changelog.
//
// Both sets are derived from git history rather than kept by hand, and they are
// recomputed (not extended) with every batch, so the gallery marks a moving
// window of the last three weeks. Three weeks rather than the batch you are
// adding right now, because a release usually carries one batch: wipe the sets
// on every batch and the previous one loses its tag the day it reaches anyone.
//
//   git log --since=3.weeks --reverse --find-renames --name-status --format= \
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
	'antenna-radio-waves',
	'apartment-building-2',
	'arrow-clockwise',
	'arrow-down-left-arrow-up-right',
	'arrow-up-right-arrow-down-left',
	'book-badge-plus',
	'brackets-ellipsis-badge-plus',
	'bug',
	'circle-grid-2x2-top-left-check-mark',
	'clipboard-pencil',
	'display',
	'exclamation-2-circle',
	'exclamation-2-circle-filled',
	'exclamation-3-circle',
	'exclamation-3-circle-filled',
	'file-badge-arrow-down',
	'file-badge-arrow-up',
	'file-badge-minus',
	'file-badge-plus',
	'file-on-file',
	'file-text-on-file-text',
	'folder-badge-plus',
	'folder-open',
	'git-branch',
	'git-commit',
	'git-compare',
	'git-fork',
	'git-merge',
	'git-pull-request',
	'git-pull-request-closed',
	'git-pull-request-draft',
	'hand-thumbs-down',
	'hand-thumbs-up',
	'house-apartment-building',
	'link-badge-lock',
	'map',
	'map-pin',
	'map-pin-badge-minus',
	'map-pin-badge-plus',
	'map-pin-oval',
	'media-backward',
	'media-backward-end',
	'media-backward-end-filled',
	'media-backward-filled',
	'media-backward-frame',
	'media-backward-frame-filled',
	'media-forward',
	'media-forward-end',
	'media-forward-end-filled',
	'media-forward-filled',
	'media-forward-frame',
	'media-forward-frame-filled',
	'media-pause',
	'media-pause-filled',
	'media-play',
	'media-play-filled',
	'media-play-pause',
	'media-play-pause-filled',
	'media-stop',
	'media-stop-filled',
	'megaphone',
	'microphone',
	'microphone-slash',
	'paintbrush',
	'person-badge-minus',
	'person-badge-plus',
	'person-text-rectangle',
	'photo-camera',
	'photo-on-photo-angled',
	'photo-stack',
	'puzzle-piece-badge-plus',
	'rectangle-stack-chevron-left-forward-slash-chevron-right',
	'rectangle-stack-text',
	'seal-star',
	'ship-wheel-badge-plus',
	'signpost',
	'slider-horizontal-3',
	'speaker',
	'speaker-slash',
	'speaker-volume-high',
	'speaker-volume-low',
	'speaker-volume-medium',
	'square',
	'square-1',
	'square-grid-2x2',
	'square-grid-2x2-pencil',
	'tag-on-tag',
	'text-format-size',
	'triangle-square-circle',
	'video-camera',
	'viewfinder',
	'viewfinder-line',
]);

export const UPDATED_ICONS = new Set([
	'book-badge-play',
	'chevron-left-forward-slash-chevron-right-rectangle',
	'exclamation-circle-filled',
	'file',
	'file-text',
	'file-text-badge-check-mark',
	'file-text-badge-check-plus',
	'file-text-pencil',
	'folder',
	'folder-on-folder',
	'lightbulb',
	'point-bottom-left-to-point-top-right-s-curve-path',
	'rectangle-stack',
	'seal-check-mark',
	'square-arrow-down',
]);
