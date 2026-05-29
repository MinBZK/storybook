import { css } from 'lit';

export const boxStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--components-box-background-color);
		--_border-color: var(--components-box-border-color);

		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* ## Background variants
	   Default is tinted (matches :host above). base = card-on-tinted, the
	   border ring picks the +2-step semantic so the frame still reads
	   against an already-tinted parent. */

	:host([background="tinted"]) {
		--_background-color: var(--components-box-background-color);
		--_border-color: var(--components-box-border-color);
	}

	:host([background="base"]) {
		--_background-color: var(--components-box-base-background-color);
		--_border-color: var(--components-box-base-border-color);
	}


	/* # Block */

	.box {
		box-sizing: border-box;
		border-radius: var(--components-box-corner-radius);
		/* Inner box-shadow paints a 1px border ring inside the radius
		   without taking layout space. The colour is one to two palette
		   steps above the surface bg depending on the variant, giving the
		   box a defined edge that reads as "subtle dimensional lift"
		   rather than a hard border. */
		box-shadow: inset 0 0 0 1px var(--_border-color);
		background-color: var(--_background-color);
		padding: var(--components-box-padding);
	}


	/* # Accessibility
	   box-shadow is dropped by Windows High Contrast / forced-colors mode,
	   so the border ring would disappear and the box would lose its
	   defined edge against the system background. Restore the edge with a
	   real border in that mode. CanvasText is the system foreground colour
	   so the border always meets contrast. */

	@media (forced-colors: active) {
		.box {
			border: 1px solid CanvasText;
		}
	}
`;
