/* eslint-disable lit-a11y/accessible-name -- text content provides the accessible name */
import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { NDDTooltip } from './ndd-tooltip.ts';

export function tooltipTemplate(component: NDDTooltip): TemplateResult {
	return html`
		<slot
			@mouseenter=${component._handleTriggerEnter}
			@mouseleave=${component._handleTriggerLeave}
			@focusin=${component._handleTriggerEnter}
			@focusout=${component._handleTriggerLeave}
		></slot>
		<div class=${classMap({ tooltip: true, 'is-visible': component._visible })}
			role="tooltip"
			aria-hidden=${!component._visible ? 'true' : nothing}
			@mouseenter=${component._handleTooltipEnter}
			@mouseleave=${component._handleTooltipLeave}
		>
			<div class="tooltip__body">${component.text}</div>
		</div>
	`;
}
