import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const progressStyles = css`


	/* # Host */

	:host {
		--_fade-duration: var(--primitives-transition-duration-slow);
		--_indicator-max-width: var(--primitives-area-240);

		${inheritedTextReset}
		box-sizing: border-box;
		display: flex;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Indicator
	   Wrapper around the slot so we can fade the indicator in once the delay
	   has passed. The host itself stays visible from mount to take up its
	   layout space; only the indicator inside fades.
	   width:100% + max-width gives the bar a concrete width to fill (without
	   this it has no containing block reference and collapses to 0). The
	   inner flex centring keeps a small circle aligned in the middle of that
	   width. */

	.progress__indicator {
		display: flex;
		justify-content: center;
		width: 100%;
		max-width: var(--_indicator-max-width);
		animation: progress-fade-in var(--_fade-duration) ease-out;
	}

	@keyframes progress-fade-in {
		from { opacity: 0; }
	}


	/* # Accessibility */

	@media (prefers-reduced-motion: reduce) {
		.progress__indicator {
			animation: none;
		}
	}
`;
