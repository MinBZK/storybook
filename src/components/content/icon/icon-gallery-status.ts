// Icons added or redrawn in the most recent icon batch. The IconGallery story
// renders a "New" or "Updated" tag on these tiles, so consumers browsing the
// gallery spot what changed without reading the changelog.
//
// Both sets are derived from git history rather than kept by hand, and they are
// replaced (not extended) with every batch, so the gallery marks the latest
// batch only. A batch is everything that happened to the icons since the last
// one shipped:
//
//   git log --since=<date> --reverse --find-renames --name-status --format= \
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
	'megaphone',
	'microphone',
	'microphone-slash',
	'paintbrush',
	'paper-roll-horizontal',
	'media-pause',
	'media-pause-filled',
	'person-badge-minus',
	'person-badge-plus',
	'person-text-rectangle',
	'photo-camera',
	'photo-on-photo-angled',
	'photo-stack',
	'media-play',
	'media-play-filled',
	'media-play-pause',
	'media-play-pause-filled',
	'rectangle-stack-chevron-left-forward-slash-chevron-right',
	'rectangle-stack-text',
	'seal-star',
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
	'media-stop',
	'media-stop-filled',
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
	'rectangle-stack',
	'seal-check-mark',
	'square-arrow-down',
]);
