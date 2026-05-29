import { css } from 'lit';

export const boxStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.box {
		box-sizing: border-box;
		border-radius: var(--components-box-corner-radius);
		/* Inner box-shadow paints a 1px highlight ring inside the radius
		   without taking layout space. The colour is one palette step above
		   the surface bg, giving the box a defined edge that reads as
		   "subtle dimensional lift" rather than a hard border. */
		box-shadow: inset 0 0 0 1px var(--components-box-highlight-color);
		background-color: var(--components-box-background-color);
		padding: var(--components-box-padding);
	}


	/* # Accessibility
	   box-shadow is dropped by Windows High Contrast / forced-colors mode,
	   so the highlight ring would disappear and the box would lose its
	   defined edge against the system background. Restore the edge with a
	   real border in that mode. CanvasText is the system foreground colour
	   so the border always meets contrast. */

	@media (forced-colors: active) {
		.box {
			border: 1px solid CanvasText;
		}
	}
`;
