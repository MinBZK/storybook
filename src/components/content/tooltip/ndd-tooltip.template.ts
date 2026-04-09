/* eslint-disable lit-a11y/accessible-name -- text content provides the accessible name */
import { html, TemplateResult } from 'lit';
import type { NDDTooltip } from './ndd-tooltip.ts';

export function tooltipTemplate(component: NDDTooltip): TemplateResult {
	return html`
		<slot
			@mouseenter=${component._handleTriggerEnter}
			@mouseleave=${component._handleTriggerLeave}
			@focusin=${component._handleTriggerEnter}
			@focusout=${component._handleTriggerLeave}
		></slot>
		<div class="tooltip ${component._visible ? 'is-visible' : ''}"
			role="tooltip"
			id=${component._tooltipId}
		>
			<div class="tooltip__body">${component.text}</div>
		</div>
	`;
}
