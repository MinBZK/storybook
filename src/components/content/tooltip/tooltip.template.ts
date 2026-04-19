import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { NLDDTooltip } from './tooltip.js';

export function tooltipTemplate(component: NLDDTooltip): TemplateResult {
	return html`
		<slot
			@mouseenter=${component._handleTriggerEnter}
			@mouseleave=${component._handleTriggerLeave}
			@focusin=${component._handleFocusIn}
			@focusout=${component._handleFocusOut}
		></slot>
		<div class=${classMap({ tooltip: true, 'is-visible': component._visible && !component._focusVisible, 'is-focus-visible': component._visible && component._focusVisible })}
			aria-hidden="true"
			@mouseenter=${component._handleTooltipEnter}
			@mouseleave=${component._handleTooltipLeave}
		>
			<div class="tooltip__body">${component.text}</div>
		</div>
	`;
}
