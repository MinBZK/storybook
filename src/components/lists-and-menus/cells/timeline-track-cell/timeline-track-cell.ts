/**
 * Nederlandse Digitale Dienst Timeline Track Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying timeline track indicators in lists.
 * Shows a vertical line with a dot indicating timeline position and state.
 *
 * @element nldd-timeline-track-cell
 * @attr {string} step - Timeline step state: 'past' | 'future' | 'none' (default: 'past')
 * @attr {string} child - Position in timeline: 'first' | 'between' | 'last' (default: 'between')
 *
 * @csspart track - The timeline track container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Step = 'past' | 'future' | 'none';
type Child = 'first' | 'between' | 'last';

@customElement('nldd-timeline-track-cell')
export class NLDDTimelineTrackCell extends LitElement {
	static override styles = css`
		:host {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 18px;
		}

		:host([hidden]) {
			display: none;
		}

		.timeline-track {
			position: relative;
			width: 18px;
			height: 100%;
			min-height: 50px;
		}

		/* Vertical lines */
		.timeline-track__line-top,
		.timeline-track__line-bottom {
			position: absolute;
			left: 50%;
			width: 2px;
			margin-left: -1px;
			background-color: var(--semantics-buttons-accent-filled-background-color);
		}

		.timeline-track__line-top {
			bottom: 50%;
			height: 59px;
		}

		.timeline-track__line-bottom {
			top: 50%;
			height: 59px;
		}

		/* Dot indicator */
		.timeline-track__dot {
			position: absolute;
			top: 50%;
			left: 0;
			width: 18px;
			height: 18px;
			margin-top: -9px;
			border-radius: 50%;
			box-sizing: border-box;
			border: 2px solid var(--semantics-buttons-accent-filled-background-color);
		}

		/* Step: past (filled dot) */
		:host([step="past"]) .timeline-track__dot,
		:host(:not([step])) .timeline-track__dot {
			background-color: var(--semantics-buttons-accent-filled-background-color);
		}

		/* Step: future (hollow dot with white fill) */
		:host([step="future"]) .timeline-track__dot {
			background-color: var(--semantics-surfaces-background-color);
		}

		/* Step: none - continuous line, no dot */
		.timeline-track__line-full {
			position: absolute;
			left: 50%;
			width: 2px;
			margin-left: -1px;
			top: -34px;
			bottom: -34px;
			background-color: var(--semantics-buttons-accent-filled-background-color);
		}

		/* Accessibility: High Contrast Mode */
		@media (forced-colors: active) {
			.timeline-track__dot,
			.timeline-track__line-top,
			.timeline-track__line-bottom,
			.timeline-track__line-full {
				forced-color-adjust: none;
			}
		}
	`;

	@property({ type: String, reflect: true })
	step: Step = 'past';

	@property({ type: String, reflect: true })
	child: Child = 'between';

	override render() {
		if (this.step === 'none') {
			return html`
				<div class="timeline-track" part="track">
					<div class="timeline-track__line-full"></div>
				</div>
			`;
		}

		const showTopLine = this.child === 'between' || this.child === 'last';
		const showBottomLine = this.child === 'between' || this.child === 'first';

		return html`
			<div class="timeline-track" part="track">
				${showTopLine ? html`<div class="timeline-track__line-top"></div>` : ''}
				<div class="timeline-track__dot"></div>
				${showBottomLine ? html`<div class="timeline-track__line-bottom"></div>` : ''}
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-timeline-track-cell': NLDDTimelineTrackCell;
	}
}
