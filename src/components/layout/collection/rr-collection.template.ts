import { html, nothing, TemplateResult } from 'lit';
import type { RRCollection } from './rr-collection.js';

export function collectionTemplate(component: RRCollection): TemplateResult {
	const isHorizontal = component.layout === 'horizontal-scroll';
	const showLoadMore = !isHorizontal && component.showLoadMore && component._hasMore;

	return html`
		<div class="collection__items">
			<slot @slotchange=${(e: Event) => component._onSlotChange(e)}></slot>
		</div>
		<footer class="collection__footer">
			<slot name="footer">
				${isHorizontal ? html`
					<rr-button-bar>
						<rr-icon-button
							icon="chevron-left"
							text="Vorige"
							?disabled=${component._atStart}
							@click=${() => component._scrollBy(-1)}
						></rr-icon-button>
						<rr-button-bar-divider></rr-button-bar-divider>
						<rr-icon-button
							icon="chevron-right"
							text="Volgende"
							?disabled=${component._atEnd}
							@click=${() => component._scrollBy(1)}
						></rr-icon-button>
					</rr-button-bar>
				` : nothing}
				${showLoadMore ? html`
					<rr-button class="load-more" variant="neutral-tinted" text=${component.loadMoreLabel} @click=${() => component._loadMore()}></rr-button>
				` : nothing}
			</slot>
		</footer>
	`;
}
