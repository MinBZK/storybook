import { html, nothing, TemplateResult } from 'lit';
import type { NLDDCollection } from './collection.js';

export function collectionTemplate(component: NLDDCollection): TemplateResult {
	const isHorizontal = component.layout === 'horizontal-scroll';
	const showLoadMore = !isHorizontal && component.showLoadMore && component._hasMore;
	const showFooter = isHorizontal || showLoadMore || component._hasFooterSlot;

	return html`
		<div class="collection__items">
			<slot @slotchange=${(e: Event) => component._onSlotChange(e)}></slot>
		</div>
		<footer class="collection__footer" ?hidden=${!showFooter}>
			<slot name="footer" @slotchange=${component._onFooterSlotChange}>
				${isHorizontal ? html`
					<nldd-button-bar>
						<nldd-icon-button
							icon="chevron-left"
							text=${component._t('components.collection.previous-action')}
							?disabled=${component._atStart}
							@click=${() => component._scrollBy(-1)}
						></nldd-icon-button>
						<nldd-button-bar-divider></nldd-button-bar-divider>
						<nldd-icon-button
							icon="chevron-right"
							text=${component._t('components.collection.next-action')}
							?disabled=${component._atEnd}
							@click=${() => component._scrollBy(1)}
						></nldd-icon-button>
					</nldd-button-bar>
				` : nothing}
				${showLoadMore ? html`
					<nldd-button
						variant="neutral-tinted"
						text=${component._t('components.collection.load-more-action')}
						width="full"
						@click=${() => component._loadMore()}
					></nldd-button>
				` : nothing}
			</slot>
		</footer>
	`;
}
