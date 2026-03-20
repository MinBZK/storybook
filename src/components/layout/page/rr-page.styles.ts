import { css } from 'lit';


/* # rr-page styles */

export const pageStyles = css`
	:host {
		--_bg: var(--semantics-surfaces-background-color);

		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: var(--_bg);
		container-type: inline-size;
		container-name: layout-area;
	}

	:host([tinted]) {
		--_bg: var(--semantics-surfaces-tinted-background-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Header */

	.page__header {
		flex-shrink: 0;
		position: relative;
	}

	:host([sticky-header]) .page__header {
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: color-mix(in srgb, var(--_bg) 95%, transparent);
	}

	:host([sticky-header]) .page__header::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		height: 32px;
		background: linear-gradient(to bottom, color-mix(in srgb, var(--_bg) 95%, transparent), transparent);
		pointer-events: none;
		opacity: 0;
		transition: opacity 200ms ease;
	}

	:host([sticky-header]) .page__header--scrolled::after {
		opacity: 1;
	}


	/* # Main */

	.page__main {
		display: flex;
		flex-direction: column;
		flex: 1;
	}


	/* # Footer */

	.page__footer {
		flex-shrink: 0;
		position: relative;
	}

	:host([sticky-footer]) .page__footer {
		position: sticky;
		bottom: 0;
		z-index: 10;
		background-color: color-mix(in srgb, var(--_bg) 95%, transparent);
	}

	:host([sticky-footer]) .page__footer::before {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		height: 32px;
		background: linear-gradient(to top, color-mix(in srgb, var(--_bg) 95%, transparent), transparent);
		pointer-events: none;
	}


	/* # High contrast */

	@media (forced-colors: active) {
		:host {
			background-color: Canvas;
		}

		:host([sticky-header]) .page__header,
		:host([sticky-footer]) .page__footer {
			background-color: Canvas;
		}

		:host([sticky-header]) .page__header::after,
		:host([sticky-footer]) .page__footer::before {
			display: none;
		}
	}
`;
