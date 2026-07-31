import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { NLDDTooltip } from './tooltip.js';

export function tooltipTemplate(component: NLDDTooltip): TemplateResult {
	return html`
		<slot
			@mouseenter=${component._handleTriggerEnter}
			@mouseleave=${component._handleTriggerLeave}
			@focusin=${component._handleFocusIn}
			@focusout=${component._handleFocusOut}
			@click=${component._handleTriggerActivate}
		></slot>
		<div class="tooltip"
			popover="manual"
			aria-hidden="true"
			@mouseenter=${component._handleTooltipEnter}
			@mouseleave=${component._handleTooltipLeave}
		>
			<div class="tooltip__body">${component.text}</div>
		</div>
	`;
}
