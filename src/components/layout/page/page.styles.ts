import { css } from 'lit';

export const pageStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		flex-direction: column;
		/* New stacking context so descendant z-index (e.g. list-item
		 * sticky/elevated layers) can't paint over the page's scrollbar. */
		isolation: isolate;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="base"]) {
		--context-parent-background-color: var(--semantics-surfaces-base-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	/* Overflow hidden prevents content from escaping the scroll wrapper.
	   Overlays inside slotted content should use popover, dialog, or
	   position: fixed to render in the top layer. */
	:host([sticky-header]) {
		position: relative;
		overflow: hidden;
	}

	/* Root-scroll mode: the DOCUMENT scrolls (see nldd-app-view), not the page.
	   The page stops owning an inner scroll container and its sticky-header/footer
	   become real position:sticky layers against the document, offset by the
	   cumulative layer heights above/below (--context-layer-top/bottom, published
	   by any bars sitting outside the page). The mode is derived upstream and
	   delivered as --context-scroll-mode; nldd-page reflects it to [data-scroll]
	   so these (higher-specificity, later) rules win over the nested ones. */
	:host([data-scroll="root"]) {
		height: auto;
		overflow: visible;
		overscroll-behavior: auto;
	}

	/* Undo the nested-mode clip — the document is the scroller now. */
	:host([data-scroll="root"][sticky-header]) {
		overflow: visible;
	}


	/* # Block */

	.page {
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
	}

	/* Root-scroll mode: no inner scroller; content-sized (flex-shrink:0) so the
	   sticky header/footer's containing block spans the whole document rather
	   than being squeezed to a definite ancestor height.

	   Content-sized costs the page its floor, though: nested mode inherits one
	   from the pane it stretches inside, and here there is nothing to stretch in.
	   A short page would end where its content ends and leave anything after it
	   (an nldd-page-footer, say) stranded mid-viewport. The minimum restores that
	   floor without pinning: longer content still pushes past it. */
	:host([data-scroll="root"]) .page {
		overflow: visible;
		flex-shrink: 0;
		min-height: calc(100dvh - var(--context-layer-top, 0px) - var(--context-layer-bottom, 0px));
	}


	/* # Elements */

	.page__header {
		position: relative;
		flex-shrink: 0;
	}

	:host([sticky-header]) .page__header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		background-color: color-mix(in srgb, var(--_background-color) 95%, transparent);
	}

	:host([sticky-header]) .page__header::after {
		content: '';
		position: absolute;
		/* Behind the header's own content, not over it: the header has z-index 1
		   and so its own stacking context, which keeps this inside it — above the
		   header's background, below whatever is slotted in. Without it the fade
		   paints last and covers anything that reaches past the header's bottom
		   edge, such as the focus ring of a field sitting flush against it. */
		z-index: -1;
		top: 100%;
		left: 0;
		right: 0;
		opacity: 0;
		background: linear-gradient(to bottom, color-mix(in srgb, var(--_background-color) 95%, transparent), transparent);
		pointer-events: none;
		height: var(--primitives-space-32);
		transition: opacity var(--primitives-transition-duration-medium) var(--primitives-transition-easing-default);
	}

	:host([sticky-header]) .page__header.is-scrolled::after {
		opacity: 1;
	}

	/* Root-scroll mode: sticky against the document instead of absolute-over-a-
	   nested-scroller. Being in normal flow it reserves its own space, so no
	   ResizeObserver padding is needed. left/right revert to auto: those insets
	   only mattered for the absolute overlay. */
	:host([data-scroll="root"][sticky-header]) .page__header {
		position: sticky;
		top: var(--context-layer-top, 0px);
		left: auto;
		right: auto;
	}

	.page__scroll {
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
	}

	:host([sticky-header]) .page__scroll {
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
	}

	/* Root-scroll mode: content-sized, no inner scroller (see the .page rule). */
	:host([data-scroll="root"]) .page__scroll {
		overflow: visible;
		flex-shrink: 0;
	}

	.page__main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.page__footer {
		position: relative;
		flex-shrink: 0;
	}

	:host([sticky-footer]) .page__footer {
		position: sticky;
		bottom: 0;
		z-index: 1;
		background-color: color-mix(in srgb, var(--_background-color) 95%, transparent);
	}

	:host([sticky-footer]) .page__footer::before {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		background: linear-gradient(to top, color-mix(in srgb, var(--_background-color) 95%, transparent), transparent);
		pointer-events: none;
		height: var(--primitives-space-32);
	}

	/* Root-scroll mode: footer sticks to the document bottom, above any bottom bars. */
	:host([data-scroll="root"][sticky-footer]) .page__footer {
		bottom: var(--context-layer-bottom, 0px);
	}
`;
