/**
 * RegelRecht Toolbar Component (Lit + TypeScript)
 *
 * A horizontal toolbar container with three areas: start, center, and end.
 * Automatically renders rr-toolbar-item, rr-toolbar-divider and rr-toolbar-title-group
 * elements — no separate component files needed for these.
 *
 * @element rr-toolbar
 * @attr {string} size - Toolbar size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} show-labels - Show labels below toolbar items
 *
 * @slot start-area - Left-aligned content area
 * @slot - Center-aligned content area (default slot)
 * @slot end-area - Right-aligned content area
 *
 * @csspart toolbar - The toolbar container
 * @csspart start - The start area
 * @csspart center - The center area
 * @csspart end - The end area
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-toolbar.styles.js';
import { template, type ToolbarChild } from './rr-toolbar.template.js';

// # Marker elements

if (!customElements.get('rr-toolbar-item')) {
	customElements.define('rr-toolbar-item', class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' }).innerHTML = '<slot></slot>';
		}
	});
}

if (!customElements.get('rr-toolbar-divider')) {
	customElements.define('rr-toolbar-divider', class extends HTMLElement {});
}

if (!customElements.get('rr-toolbar-title-group')) {
	customElements.define('rr-toolbar-title-group', class extends HTMLElement {});
}

// # Types

type Size = 'sm' | 'md';

// # Component

@customElement('rr-toolbar')
export class RRToolbar extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true, attribute: 'show-labels' })
	showLabels = false;

	@state()
	private _startChildren: ToolbarChild[] = [];

	@state()
	private _centerChildren: ToolbarChild[] = [];

	@state()
	private _endChildren: ToolbarChild[] = [];

	private _idCounter = 0;
	private _observer: MutationObserver | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._buildChildren());
		this._observer.observe(this, { childList: true, attributes: true, subtree: true });
		this._buildChildren();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('size')) {
			this._propagateSize();
		}
	}

	private _propagateSize(): void {
		Array.from(this.children)
			.filter(el => el.tagName.toLowerCase() === 'rr-toolbar-item')
			.forEach(item => {
				Array.from(item.children).forEach(el => {
					el.setAttribute('size', this.size);
				});
			});
	}

	private _buildChildrenForSlot(slotName: string | null): ToolbarChild[] {
		const elements = Array.from(this.children).filter(el => {
			const originalSlot = el.getAttribute('data-toolbar-slot') ?? el.getAttribute('slot') ?? '';
			if (slotName === null) return !originalSlot || originalSlot.startsWith('child-');
			return originalSlot === slotName;
		});

		return elements.map(el => {
			const tag = el.tagName.toLowerCase();

			// Store original slot value on first encounter
			if (!el.hasAttribute('data-toolbar-slot')) {
				const slot = el.getAttribute('slot') ?? '';
				el.setAttribute('data-toolbar-slot', slot);
			}

			if (tag === 'rr-toolbar-divider') {
				return { type: 'divider', id: this._idCounter++ } as ToolbarChild;
			}

			if (tag === 'rr-toolbar-title-group') {
				return {
					type: 'title-group',
					title: el.getAttribute('title') ?? '',
					subtitle: el.getAttribute('subtitle') ?? '',
					align: el.getAttribute('align') ?? 'left',
					id: this._idCounter++,
				} as ToolbarChild;
			}

			if (tag === 'rr-toolbar-item') {
				const id = this._idCounter++;
				const label = el.getAttribute('label') ?? '';

				// Propagate size to all children
				Array.from(el.children).forEach(child => {
					child.setAttribute('size', this.size);
				});

				el.setAttribute('slot', `child-${id}`);

				return { type: 'item', element: el, label, id } as ToolbarChild;
			}

			// Other elements — re-project directly
			const id = this._idCounter++;
			el.setAttribute('slot', `child-${id}`);
			return { type: 'other', element: el, id } as ToolbarChild;
		});
	}

	private _buildChildren(): void {
		this._observer?.disconnect();

		this._startChildren = this._buildChildrenForSlot('start-area');
		this._centerChildren = this._buildChildrenForSlot(null);
		this._endChildren = this._buildChildrenForSlot('end-area');

		this._observer?.observe(this, { childList: true, attributes: true, subtree: true });
	}

	override render() {
		return template(this._startChildren, this._centerChildren, this._endChildren);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-toolbar': RRToolbar;
		'rr-toolbar-item': HTMLElement;
		'rr-toolbar-divider': HTMLElement;
		'rr-toolbar-title-group': HTMLElement;
	}
}
