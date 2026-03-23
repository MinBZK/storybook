import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const lgMin = unsafeCSS(breakpoints.lgMin);


/* # rr-sheet styles */

export const styles = css`

	/* # Host */

	:host {
		display: block;
	}


	/* # Keyframes — right */

	@keyframes sheet-slide-in-right {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@keyframes sheet-slide-out-right {
		from { transform: translateX(0); }
		to { transform: translateX(100%); }
	}


	/* # Keyframes — left */

	@keyframes sheet-slide-in-left {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}

	@keyframes sheet-slide-out-left {
		from { transform: translateX(0); }
		to { transform: translateX(-100%); }
	}


	/* # Keyframes — bottom */

	@keyframes sheet-slide-in-bottom {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}

	@keyframes sheet-slide-out-bottom {
		from { transform: translateY(0); }
		to { transform: translateY(100%); }
	}


	/* # Sheet base */

	.sheet {
		border: none;
		padding: 0;
		margin: 0;
		background: var(--semantics-surfaces-overlay-background-color);
		box-shadow: var(--components-sheet-box-shadow);
		overflow: hidden;
		position: fixed;
	}

	.sheet:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color), var(--components-sheet-box-shadow);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	.sheet:not([open]) {
		display: none;
	}

	.sheet::backdrop {
		background: rgba(0, 0, 0, 0.2);
	}

	:host(:not([modal])) .sheet::backdrop {
		background: transparent;
	}


	/* # Placement: right (default) */

	:host([placement='right']) .sheet,
	:host(:not([placement])) .sheet {
		inset: 16px 16px 16px auto;
		width: 360px;
		height: calc(100vh - 32px);
		border-radius: var(--semantics-overlays-corner-radius);

		@media (min-width: ${lgMin}) {
			width: 480px;
		}

		&[open] {
			animation: sheet-slide-in-right 0.3s ease both;
		}

		&.is-closing {
			animation: sheet-slide-out-right 0.3s ease both;
		}
	}


	/* # Placement: left */

	:host([placement='left']) .sheet {
		inset: 16px auto 16px 16px;
		width: 360px;
		height: calc(100vh - 32px);
		border-radius: var(--semantics-overlays-corner-radius);

		@media (min-width: ${lgMin}) {
			width: 480px;
		}

		&[open] {
			animation: sheet-slide-in-left 0.3s ease both;
		}

		&.is-closing {
			animation: sheet-slide-out-left 0.3s ease both;
		}
	}


	/* # Placement: bottom */

	:host([placement='bottom']) .sheet {
		inset: auto 0 0 0;
		width: calc(100% - 80px);
		max-width: var(--semantics-page-sections-body-max-width);
		max-height: calc(100vh - 48px);
		height: calc(100vh - 48px);
		margin-inline: auto;
		border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;

		@media (max-width: ${smMax}) {
			width: 100%;
			max-width: 100%;
			inset-inline: 0;
		}

		@media (min-width: ${mdMin}) {
			width: calc(100% - 48px);
		}

		@media (min-width: ${lgMin}) {
			width: calc(100% - 80px);
		}

		&[open] {
			animation: sheet-slide-in-bottom 0.3s ease both;
		}

		&.is-closing {
			animation: sheet-slide-out-bottom 0.3s ease both;
		}
	}


	/* # Responsive: sm viewport — all placements become bottom sheet */

	@media (max-width: ${smMax}) {
		:host([placement='right']) .sheet,
		:host(:not([placement])) .sheet,
		:host([placement='left']) .sheet {
			inset: auto 0 0 0;
			width: 100%;
			height: auto;
			max-height: calc(100vh - 48px);
			border-radius: var(--semantics-overlays-corner-radius) var(--semantics-overlays-corner-radius) 0 0;

			&[open] {
				animation: sheet-slide-in-bottom 0.3s ease both;
			}

			&.is-closing {
				animation: sheet-slide-out-bottom 0.3s ease both;
			}
		}
	}


	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.sheet[open],
		.sheet.is-closing {
			animation: none;
		}
	}


	/* # Sheet body */

	.sheet__body {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;
