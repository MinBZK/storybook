import { html, nothing } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import type { NDDTitleCell } from './ndd-title-cell.js';

// SAFETY: whitelist of allowed heading tags for unsafeStatic.
// This map is the sole guard against XSS — never derive a tag name
// from unvalidated input. Any heading-level value not in this map
// falls back to <p>.
const HEADING_TAGS: Record<number, ReturnType<typeof unsafeStatic>> = {
	1: unsafeStatic('h1'),
	2: unsafeStatic('h2'),
	3: unsafeStatic('h3'),
	4: unsafeStatic('h4'),
	5: unsafeStatic('h5'),
	6: unsafeStatic('h6'),
};

function renderTitle(component: NDDTitleCell) {
	if (!component.text) return nothing;

	const tag = HEADING_TAGS[component.headingLevel as number];
	if (tag) {
		return staticHtml`<${tag} class="title-cell__title">${component.text}</${tag}>`;
	}

	return html`<p class="title-cell__title">${component.text}</p>`;
}

export const template = function (this: NDDTitleCell) {
	return html`
		${this.overline ? html`<p class="title-cell__overline">${this.overline}</p>` : nothing}
		${renderTitle(this)}
		${this.supportingText
			? html`<p class="title-cell__supporting-text">${this.supportingText}</p>`
			: nothing}
	`;
};
