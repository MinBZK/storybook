import { html, nothing, TemplateResult } from 'lit';
import type { NDDPagination } from './ndd-pagination.ts';
import '../../actions/icon-button/ndd-icon-button.ts';

export function paginationTemplate(component: NDDPagination): TemplateResult {
	const pages = component._getVisiblePages();
	const atFirst = component.current <= 1;
	const atLast = component.current >= component.total;
	const t = component._t.bind(component);

	return html`
		<nav class="pagination"
			aria-label=${t('components.pagination.label-text')}
		>
			<ndd-icon-button
				icon="chevron-left-small"
				text=${t('components.pagination.previous-action')}
				variant="neutral-tinted"
				?disabled=${atFirst}
				@click=${() => component._goToPage(component.current - 1)}
			></ndd-icon-button>
			<div class="pagination__divider" aria-hidden="true">
				<div class="pagination__divider-line"></div>
			</div>
			<div class="pagination__page-buttons">
				${pages.map((page) =>
					page === 'ellipsis'
						? html`<div class="pagination__ellipsis" aria-hidden="true">&hellip;</div>`
						: html`
							<button class="pagination__page-button ${page === component.current ? 'is-current' : ''}"
								type="button"
								aria-label=${t('components.pagination.page-number-text', { page })}
								aria-current=${page === component.current ? 'page' : nothing}
								@click=${() => component._goToPage(page as number)}
							>
								<div class="pagination__page-button-indicator"></div>
								<div class="pagination__page-button-text">${page}</div>
							</button>
						`
				)}
			</div>
			<div class="pagination__compact">
				<div class="pagination__select-wrapper">
					<select class="pagination__select"
						aria-label=${t('components.pagination.page-of-total-text', { page: component.current, total: component.total })}
						@change=${(e: Event) => component._goToPage(Number((e.target as HTMLSelectElement).value))}
					>
						${Array.from({ length: component.total }, (_, i) => i + 1).map((page) => html`
							<option value=${page} ?selected=${page === component.current}>${page}</option>
						`)}
					</select>
					<div class="pagination__select-picker-icon">
						<ndd-icon name="chevron-up-down"></ndd-icon>
					</div>
				</div>
			</div>
			<div class="pagination__divider" aria-hidden="true">
				<div class="pagination__divider-line"></div>
			</div>
			<ndd-icon-button
				icon="chevron-right-small"
				text=${t('components.pagination.next-action')}
				variant="neutral-tinted"
				?disabled=${atLast}
				@click=${() => component._goToPage(component.current + 1)}
			></ndd-icon-button>
		</nav>
	`;
}
