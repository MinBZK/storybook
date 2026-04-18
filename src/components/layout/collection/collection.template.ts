import { html, nothing, TemplateResult } from 'lit';
import type { NDDCollection } from './ndd-collection.js';

export function collectionTemplate(component: NDDCollection): TemplateResult {
	const isHorizontal = component.layout === 'horizontal-scroll';
	const showLoadMore = !isHorizontal && component.showLoadMore && component._hasMore;

	return html`
		<div class="collection__items">
			<slot @slotchange=${(e: Event) => component._onSlotChange(e)}></slot>
		</div>
		<footer class="collection__footer">
			<slot name="footer">
				${isHorizontal ? html`
					<ndd-button-bar>
						<ndd-icon-button
							icon="chevron-left"
							text=${component._t('components.collection.previous-action')}
							?disabled=${component._atStart}
							@click=${() => component._scrollBy(-1)}
						></ndd-icon-button>
						<ndd-button-bar-divider></ndd-button-bar-divider>
						<ndd-icon-button
							icon="chevron-right"
							text=${component._t('components.collection.next-action')}
							?disabled=${component._atEnd}
							@click=${() => component._scrollBy(1)}
						></ndd-icon-button>
					</ndd-button-bar>
				` : nothing}
				${showLoadMore ? html`
					<ndd-button
						variant="neutral-tinted"
						text=${component._t('components.collection.load-more-action')}
						@click=${() => component._loadMore()}
					></ndd-button>
				` : nothing}
			</slot>
		</footer>
	`;
}
