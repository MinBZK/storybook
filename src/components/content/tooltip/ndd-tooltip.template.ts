import { html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { NDDTooltip } from './ndd-tooltip.ts';

export function tooltipTemplate(component: NDDTooltip): TemplateResult {
	return html`
		<slot
			@mouseenter=${component._handleTriggerEnter}
			@mouseleave=${component._handleTriggerLeave}
			@focusin=${component._handleTriggerEnter}
			@focusout=${component._handleFocusOut}
		></slot>
		<div class=${classMap({ tooltip: true, 'is-visible': component._visible })}
			aria-hidden="true"
			@mouseenter=${component._handleTooltipEnter}
			@mouseleave=${component._handleTooltipLeave}
		>
			<div class="tooltip__body">${component.text}</div>
		</div>
	`;
}
